var mapa;
var marcadors = [];

/**
 * @function iniciarAplicacio
 * @description inici app. Es crida amb el callback de l'api de googlemaps
*/
var iniciarAplicacio = function() {
	iniciarMapa();
	carregarDades('http://www.gencat.cat/transit/opendata/cameres.xml');
	addListener();
}

/**
 * @function iniciarMapa
 * @description inicia el mapa
*/
var iniciarMapa = function() {
	mapa = new google.maps.Map(document.getElementById('mapa'), {
		center: {
			lat: 41.390205,
			lng: 2.154007
		},
		zoom: 7
	});
}

/**
 * @function carregarDades
 * @description carrega l'objete httpRequest i fa la crida GET
 * @param {url} url de l'api de gencat 
*/
function carregarDades(url) {
     if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ 
      httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE 6 i anteriors
      httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    } else {
      console.error("Error: Aquest navegador no admet AJAX.");
    }

    httpRequest.open('GET', url, true);
    httpRequest.send(null);		
}

/**
 * @function addListener
 * @description afegeix el listener al botó de cerca
*/
function addListener(){
    $("#cerca").on("click", processarResposta);
}

/**
 * @function processarResposta
 * @description processa les dades
*/
function processarResposta() {
    var resposta = httpRequest.responseXML;
    var cameraData = resposta.querySelectorAll('featureMember');
    var cameresFound = [];
    var municipiCam;
    var dInput = $('#textCerca').val();
    
    if(!isEmpty(dInput)){
        for(var i = 0; i<cameraData.length; i++){
            municipiCam = cameraData[i].querySelector('municipi').textContent;
            if(municipiCam.toUpperCase() == dInput.toUpperCase()){
                cameresFound.push(cameraData[i]);
            }
        }    
        if(cameresFound.length > 0){                                
            crearMarcadors(cameresFound);
			afegirMarcadors();			            
        }       
    }
    
}


/**
 * @function crearMarcadors
 * @description afegeix marcadors a la llista per cada camera trobada
 * @param {cameresFound}  
*/
function crearMarcadors(cameresFound) {
	for(var i = 0; i<cameresFound.length; i++) {
		var latLng = cameresFound[i].querySelector('coordinates').textContent.split(',');
        var location = cameresFound[i].querySelector('municipi').textContent;
        var img = cameresFound[i].querySelector('link').textContent;
		marcadors.push(crearMarcador(location,latLng[1],latLng[0],img));
	}		
}
 
/**
 * @function crearMarcador
 * @description crea un marcador i associa una finestra informativa
 * @param {titol, latitud, longitud, img}  
 * @return {marcador}
*/
var crearMarcador = function(titol, latitud, longitud, img) {
	var coordinatesLat = parseFloat(latitud);
	var coordinatesLong = parseFloat(longitud);
	var marcador = new google.maps.Marker({
	position: {
        lat: coordinatesLat,
        lng: coordinatesLong,	
	},
	title: titol
	})
    
    var finestraInfo = new google.maps.InfoWindow({
        content: '<h3>' + titol + '</h3><img src="'+img+'" />'
    });
    
    marcador.addListener('click', function() {
        finestraInfo.open(mapa, this);
    });
	 
	return marcador;
}
 
/**
 * @function afegirMarcadors
 * @description 
*/
var afegirMarcadors = function() {
	for (var i = 0; i < marcadors.length; i++) {
        console.log("Afegir marcador: " + i);
        afegirMarcador(marcadors[i]);
	}
}
 
/**
 * @function afegirMarcador
 * @description seteja el mapa donat el marcador
 * @param {marcador}  
*/
var afegirMarcador = function(marcador) {
	marcador.setMap(mapa);
}

/**
 * @function isEmpty
 * @description examina si un string està buit
 * @param {str}  
 * @return {bool}
*/
function isEmpty(str) {
    return (!str || 0 === str.length);
}
 
