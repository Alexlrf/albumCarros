let btnPesquisa = document.querySelector('#btnBusca');
var imagemRetorno = document.querySelector('.erroBusca');

btnPesquisa.onclick = function(event){
  event.preventDefault();
  let campoBusca = document.querySelector('#inputBusca');
    
  ajax.open('GET', `http://localhost:8080/api/v1/carros/nomeCarro?nomeCarro=${campoBusca.value}`);
  ajax.send(null);

  ajax.onreadystatechange = function(){

    if(ajax.readyState === 4){        
      listaCarrosNome = JSON.parse(ajax.responseText); 

       /* Limpa a tela */

      var elemento = document.querySelector("#container");
      while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
      }
      
      /* Preenche a tela com carros buscados */

      for (let index = 0; index < listaCarrosNome.length; index++) {            
        criaCardCarro(listaCarrosNome[index]);        
      } 

    } else if(ajax.status === 204) {
      
      imagemRetorno.setAttribute('class', 'erroBusca mostrar');    

      /* Limpa a tela */  

      var elemento = document.querySelector("#container");
      while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
      }

      
    }
  }    
} 

function fecharRetorno(){
  imagemRetorno.setAttribute('class', 'erroBusca'); 

  /* Preenche a tela com todos carros */

  listaCarros.forEach(element => {
    criaCardCarro(element)
  });

}