package dw.editora.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import dw.editora.model.Artigo;

public interface ArtigoRepository extends JpaRepository<Artigo, Long>{
    
    List<Artigo> findByPublicado(boolean publicado);

    List<Artigo> findByTituloContainingIgnoreCase(String titulo);
}
