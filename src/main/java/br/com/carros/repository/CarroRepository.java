package br.com.carros.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.carros.model.entity.Carro;

@Repository
public interface CarroRepository extends JpaRepository<Carro, Long> {

	List<Carro> findByTipo(String tipo);
	
	List<Carro> findByNomeContaining(String query);

}
