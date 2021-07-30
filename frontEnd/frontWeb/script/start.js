var divContainer = document.querySelector('#container');
var ajax = new XMLHttpRequest();

/*  Busca e renderiza o resultado recebido da api */

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

/*  Cria os cards de acordo com o que vem da api */

function criaCardCarro(carro){

  var novoCard = document.createElement('div');
  novoCard.setAttribute('class', 'cardCarro');
  novoCard.setAttribute('onclick', 'abre_card(event)');

  let nomeCarro = document.createElement('p');

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

