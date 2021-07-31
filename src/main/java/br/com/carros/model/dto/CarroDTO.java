package br.com.carros.model.dto;

import org.modelmapper.ModelMapper;

import br.com.carros.model.entity.Carro;
import lombok.Data;

@Data
public class CarroDTO {
	
	private Long idCarro;
	private String nome;
	private String caminho;
	private String tipo;
	private String descricao;
	
	public static CarroDTO criaCarroDTO(Carro carro) {
		ModelMapper modelMapper = new ModelMapper();
		return modelMapper.map(carro, CarroDTO.class);
	}
	
	

}
