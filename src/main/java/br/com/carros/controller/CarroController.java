package br.com.carros.controller;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import br.com.carros.model.dto.CarroDTO;
import br.com.carros.model.entity.Carro;
import br.com.carros.service.CarroService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/carros")
public class CarroController {

	@Autowired
	private CarroService carroService;

	
	@GetMapping
	public ResponseEntity<List<CarroDTO>> buscaCarros() {
		return ResponseEntity.ok(carroService.buscaCarros());
	}

	@GetMapping("/{id}")
	public ResponseEntity<CarroDTO> buscaCarroPorId(@PathVariable Long id) {

		Optional<CarroDTO> carro = carroService.buscaCarroPorId(id);

		return carro.isPresent() ? ResponseEntity.ok(carro.get()) : ResponseEntity.notFound().build();
	}

	@GetMapping("/tipo/{tipo}")
	public ResponseEntity<List<CarroDTO>> getCarroPorTipo(@PathVariable String tipo) {

		List<CarroDTO> carros = carroService.buscaCarroPorTipo(tipo);

		return carros.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(carros);
	}
	
	@GetMapping("/nomeCarro")
	public ResponseEntity<List<CarroDTO>> buscaCarroPorNome(@RequestParam("nomeCarro") String nomeCarro){
		List<CarroDTO> listaCarros = carroService.findByNomeContaining(nomeCarro);
		return !listaCarros.isEmpty()? ResponseEntity.ok().body(listaCarros) : ResponseEntity.noContent().build();
		
	}

	@PostMapping
	public ResponseEntity<List<CarroDTO>> insertCarro(@RequestBody Carro carro) {
		try {
			CarroDTO carroDTO = carroService.insere(carro);
			
			URI location = getUri(carroDTO.getIdCarro());
			return ResponseEntity.created(location).build();
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}

	private URI getUri(Long idCarro) {
		return ServletUriComponentsBuilder.fromCurrentRequest().path("/{idCarro}")
				.buildAndExpand(idCarro).toUri();

	}

	@PutMapping("/{id}")
	public ResponseEntity<CarroDTO> alteraCarro(@PathVariable("id") Long id, @RequestBody Carro carro) {
		CarroDTO carroAlterado = carroService.alteraCarro(carro, id);
		return carroAlterado != null ? ResponseEntity.ok(carroAlterado) : ResponseEntity.notFound().build();
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<CarroDTO> deletaCarro(@PathVariable("id") Long id) {
		boolean ok = carroService.deletaCarro(id);
		return ok ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
	}

}
