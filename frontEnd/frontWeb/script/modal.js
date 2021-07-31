
var audioMotor = document.querySelector('#startMotor');
var containerModal = document.querySelector('.painelContainer');
var imgModal = document.querySelector('.imagemDoModal');
var texto = document.querySelector('#texto');
var tituloModal = document.querySelector('#titulo_modal');
var textoModal = document.querySelector('#texto_modal');
var textoTitulo;
var textoCorpo;

/*  Cria botão de fechar o card */

var botaoFechar = document.querySelector('.btnCard');
botaoFechar.setAttribute('onclick', 'fechar_card(event)');

/*  Abre a DIV modal */

function abre_card(e){    
    audioMotor.currentTime = 1.5;
    audioMotor.play();
    
    let parent = e.target.parentNode;  
    let filhos = parent.childNodes; 
    
    textoTitulo = document.createTextNode(filhos[1].innerHTML);
    textoCorpo = document.createTextNode(filhos[0].innerHTML);     
  
    tituloModal.appendChild(textoTitulo);
    textoModal.appendChild(textoCorpo);
    texto.appendChild(tituloModal);
    texto.appendChild(textoModal);

    let imagemClicada = e.target.getAttribute('src');
    imgModal.setAttribute('src', imagemClicada);
    containerModal.setAttribute('class', 'painelContainer mostrar');    
}

/*  Fecha a DIV modal */

function fechar_card(e){ 
    audioMotor.pause();
    audioMotor.currentTime = 0;
    let stopMotor = document.querySelector('#paradaMotor');
    stopMotor.currentTime= 14;
    stopMotor.play();              
    containerModal.setAttribute('class', 'painelContainer');       
   
    tituloModal.removeChild(textoTitulo);
    textoModal.removeChild(textoCorpo);
    texto.removeChild(tituloModal);
    texto.removeChild(textoModal);
}

