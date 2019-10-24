$(document).ready(function(){

	$("#cerca").on('click', function(e){
		carregarDades('https://swapi.co/api/people/', {search:"", format:"json"});
 
		function carregarDades(url, parametres) {
			parametres.search = document.getElementById('nom').value;
            console.log(parametres.search);
			if(parametres.search){		
				$.ajax({
                    url: url,
                    dataType: 'json',
                    data: parametres,
                    success: processarResposta,
				});               
			}			
		}
		 
		
	}); 
	
	
});

/**
 * @function processarResposta
 * @description 
 * @param {dades} objecte retornat per la crida a swapi
*/
function processarResposta(dades) {
    console.log($("tr:first"));
    $("tr:first").find("td")[1].innerHTML = dades.results[0].name;
    $("tr:first").next().find("td")[1].innerHTML = dades.results[0].gender;
    $("tr:first").next().next().find("td")[1].innerHTML = dades.results[0].hair_color;
    $("tr:first").next().next().next().find("td")[1].innerHTML = dades.results[0].eye_color;
    setDataHomeWorld(dades.results[0].homeworld);
    setDataSpecies(dades.results[0].species);    
}
        
/**
 * @function carregarDades
 * @description petició ajax
 * @param {url} url de l'api de gencat
 * @param {parametres} parametres adicionals de la crida
*/
function carregarDades(url, parametres) {
    parametres.search = document.getElementById('nom').value;
    if(parametres.search){		
        $.ajax({
            url: url,
            dataType: 'json',
            data: parametres,
            success: processarResposta,
        });               
    }			
}

/**
 * @function setDataHomeWorld
 * @description petició ajax
 * @param {url} 
 * @param {element} 
*/
function setDataHomeWorld(url, element) {
    $.ajax({
        url: url,
        dataType: 'json',
        success: processarRespostaHomeWorld,
    });               
}

/**
 * @function setDataSpecies
 * @description petició ajax
 * @param {url} 
 * @param {element} 
*/
function setDataSpecies(url, element) {
    $.ajax({
        url: url,
        dataType: 'json',
        success: processarRespostaSpecies,
    });               
}

/**
 * @function processarRespostaHomeWorld
 * @description petició ajax
 * @param {dades}  
*/
function processarRespostaHomeWorld(dades) {
    $("tr:first").next().next().next().next().find("td")[1].innerHTML = dades.name;
}

/**
 * @function processarRespostaSpecies
 * @description petició ajax
 * @param {dades}  
*/
function processarRespostaSpecies(dades) {
    $("tr:first").next().next().next().next().next().find("td")[1].innerHTML = dades.name;
}




