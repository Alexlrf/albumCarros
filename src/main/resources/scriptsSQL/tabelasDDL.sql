create database carro_rest;
use carro_rest;

create table carro
    (id bigint not null auto_increment,
    nome varchar(255),
    descricao varchar(255),
    url_foto varchar(255),    
    tipo varchar(255), primary key (id) );