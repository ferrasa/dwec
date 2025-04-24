package dw.editora.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import dw.editora.model.Artigo;

public interface ArtigoRepository extends JpaRepository<Artigo, Long> {
    // Aqui você pode adicionar métodos personalizados, se necessário
    // Exemplo: List<Artigo> findByPublicado(boolean publicado);

    List<Artigo> findByPublicado(boolean publicado);

    List<Artigo> findByTituloContainingIgnoreCase(String titulo);

    
}
