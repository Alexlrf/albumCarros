
btnPesquisa.onclick = function(event){
    event.preventDefault();
    let campoBusca = document.querySelector('#inputBusca');
      
    ajax.open('GET', `http://localhost:8080/api/v1/carros/nomeCarro?nomeCarro=${campoBusca.value}`);
    ajax.send(null);
  
    ajax.onreadystatechange = function(){
  
      if(ajax.readyState === 4){        
        listaCarrosNome = JSON.parse(ajax.responseText);      
  
        var elemento = document.querySelector("#container");
        while (elemento.firstChild) {
          elemento.removeChild(elemento.firstChild);
        }
        
        for (let index = 0; index < listaCarrosNome.length; index++) {            
          criaCardCarro(listaCarrosNome[index]);          
          
        }                
      } else if(ajax.status === 204) {
          alert(`Não foram encontrados carros com o termo de busca${campoBusca.value}`);
      }
    }    
  } 