
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

  _card.onclick = function(){
    
    var audioMotor = document.querySelector('#startMotor');
    audioMotor.currentTime = 1.5;
    audioMotor.play();

    let painelContainer = document.querySelector('.painelContainer');
    painelContainer.setAttribute('class', 'painelContainer mostrar');

    let painelCard = document.createElement('div');
    painelCard.setAttribute('class', 'painel');
    let botaoFechar = document.createElement('button');
    botaoFechar.setAttribute('id', 'btnCard');
    botaoFechar.textContent = 'X';
    
    let copia = _card;

    painelCard.appendChild(copia);
    painelCard.appendChild(botaoFechar);
    painelContainer.appendChild(painelCard);


    botaoFechar.onclick = function(){ 
      audioMotor.pause();
      audioMotor.currentTime = 0;
      let stopMotor = document.querySelector('#paradaMotor');
      stopMotor.currentTime= 13;
      stopMotor.play();
      _card.setAttribute('class', 'cardCarro');         
      painelContainer.setAttribute('class', 'painelContainer');    
      var div = document.querySelector('.painelContainer');
        while(div.firstChild){
          div.removeChild(div.firstChild);
        }
    }       
  } 
}

    