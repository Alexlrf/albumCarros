package br.com.carros.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import javax.persistence.AssociationOverride;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import br.com.carros.model.dto.CarroDTO;
import br.com.carros.model.entity.Carro;
import br.com.carros.repository.CarroRepository;

@Service
public class CarroService {

	@Autowired
	private CarroRepository carroRepository;

	public List<CarroDTO> buscaCarros() {
		return carroRepository.findAll().stream().map(CarroDTO::criaCarroDTO).collect(Collectors.toList());
		
		/**
		 * Jeito sem lambdas (está correto também)		
		 */
//		List<Carro> carros = carroRepository.findAll();		
//		List<CarroDTO> listaDeDto = new ArrayList<>();
//		List<CarroDTO> listaDeDto = new ArrayList<>();		
//		for (Carro c: carros) {
//			listaDeDto.add(new CarroDTO(c));
//		}		
//		return listaDeDto;		
	}

	public Optional<CarroDTO> buscaCarroPorId(Long id) {
		return carroRepository.findById(id).map(CarroDTO::criaCarroDTO);
	}

	public List<CarroDTO> buscaCarroPorTipo(String tipo) {
		return carroRepository.findByTipo(tipo).stream().map(CarroDTO::criaCarroDTO).collect(Collectors.toList());
	}

	
	public List<CarroDTO> findByNomeContaining(String nomeCarro){		
		return carroRepository.findByNomeContaining(nomeCarro).stream().map(CarroDTO::criaCarroDTO).collect(Collectors.toList());
		
	}
	
	public CarroDTO insere(Carro carro) {
		Assert.isNull(carro.getIdCarro(), "Não foi possível cadastrar carro!");
		return CarroDTO.criaCarroDTO(carroRepository.save(carro));

	}

	public CarroDTO alteraCarro(Carro carro, Long id) {
		Assert.notNull(id, "Não foi possível atualizar o registro");

		// Busca carro no DB
		Optional<Carro> carroSalvo = carroRepository.findById(id);

		if (carroSalvo.isPresent()) {
			Carro carroParaAlterar = carroSalvo.get();
			// Copia as alterações que vieram da requisição
			carroParaAlterar.setNome(carro.getNome());
			carroParaAlterar.setTipo(carro.getTipo());

			// Atualiza o carro
			carroRepository.save(carroParaAlterar);

			return CarroDTO.criaCarroDTO(carroParaAlterar);
		} else {
			return null;
		}
	}

	public boolean deletaCarro(Long id) {

		if (buscaCarroPorId(id).isPresent()) {
			carroRepository.deleteById(id);
			return true;
		}
		return false;
	}
	

}
