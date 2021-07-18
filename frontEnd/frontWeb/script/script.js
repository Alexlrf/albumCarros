
var btnPesquisa = document.querySelector('#btnBusca');
var divContainer = document.querySelector('#container');
var ajax = new XMLHttpRequest();

ajax.open('GET', 'http://localhost:8080/api/v1/carros');
ajax.send(null);

ajax.onreadystatechange = function(){
  if(ajax.readyState === 4){
    listaCarros = JSON.parse(ajax.responseText);
    listaCarros.forEach(carro => {

      criaCardCarro(carro);
       
    });
  }   
}

function criaCardCarro(carro){

    var novoCard = document.createElement('div');
    novoCard.setAttribute('class', 'cardCarro');

    let nomeCarro = document.createElement('p');
    nomeCarro.setAttribute('class', 'tituloCard'); 
    
    criaEstiloCard(novoCard);

    let textoNomeCarro = document.createTextNode(carro.nome);
    nomeCarro.appendChild(textoNomeCarro);       

    let imagem = document.createElement('img');
    imagem.setAttribute('src', carro['caminho']);
    imagem.setAttribute('width', '100%');
    imagem.setAttribute('height', '100%');
          
    novoCard.appendChild(nomeCarro);
    novoCard.appendChild(imagem);

    divContainer.appendChild(novoCard); 

}

function criaEstiloCard(_card){

    _card.onmouseover = function() {
      this.style.backgroundColor = "white";
      this.style.color = "black";
    }
    _card.onmouseout = function() {
      this.style.backgroundColor = "#383838";
      this.style.color = "white";
    }
    _card.onclick = function(){
      _card.setAttribute('class', 'painel');
  }          
}

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
      }
    }    
} 

    