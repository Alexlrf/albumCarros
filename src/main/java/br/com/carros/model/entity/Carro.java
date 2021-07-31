package br.com.carros.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity(name = "carro")
@Data
@EqualsAndHashCode
public class Carro {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long idCarro;
	private String nome;
	@Column(name="url_foto")
	private String caminho;
	private String tipo;
	private String descricao;
	

}
