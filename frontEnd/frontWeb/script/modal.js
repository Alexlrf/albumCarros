
var audioMotor = document.querySelector('#startMotor');
var containerModal = document.querySelector('.painelContainer');
var imgModal = document.querySelector('.imagemDoModal');

/*  Cria botão de fechar o card */

var botaoFechar = document.querySelector('.btnCard');
botaoFechar.setAttribute('onclick', 'fechar_card(event)');

/*  Abre a DIV modal */

function abre_card(e){    
    audioMotor.currentTime = 1.5;
    audioMotor.play();

    console.log(e.target);

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
             
}

