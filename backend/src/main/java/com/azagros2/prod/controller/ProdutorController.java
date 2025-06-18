package com.azagros2.prod.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.azagros2.prod.produtor.Estado;
import com.azagros2.prod.produtor.Produtor;
import com.azagros2.prod.produtor.DTO.ProdutorListagemDTO;
import com.azagros2.prod.produtor.DTO.ProdutorResponseDTO;
import com.azagros2.prod.repository.ProdutorRepository;
import com.azagros2.prod.repository.ProdutorSpec;
import com.azagros2.prod.produtor.DTO.ProdutorAtualizaDTO;
import com.azagros2.prod.produtor.DTO.ProdutorCadastroDTO;
import com.azagros2.prod.produtor.DTO.ProdutorInativaDTO;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;


@RestController
@RequestMapping("/produtores")
public class ProdutorController {
    
    @Autowired
    private ProdutorRepository repository;

    @GetMapping
    @Transactional
    public ResponseEntity<List<ProdutorListagemDTO>> listar(   
        @RequestParam(required = false) String nome,
        @RequestParam(required = false) Estado estado,
        @RequestParam(required = false) String municipio,
        @RequestParam(required = false) Long id

    ){ 

        Specification<Produtor> spec = Specification.where(ProdutorSpec.isAtivo());

        if (nome != null && !nome.isEmpty()) {
            spec = spec.and(ProdutorSpec.byNome(nome));
        }
        if (estado != null) {
            spec = spec.and(ProdutorSpec.byEstado(estado));
        }
        if (municipio != null) {
            spec = spec.and(ProdutorSpec.byMunicipio(municipio));
        }
        if (id != null) {
            spec = spec.and(ProdutorSpec.byId(id));
        }
        
        var produtores = repository.findAll(spec).stream().map(ProdutorListagemDTO::new).toList();
        return ResponseEntity.ok(produtores);
    }

    @PostMapping
    @Transactional  
    public ResponseEntity<ProdutorResponseDTO> cadastrar(@RequestBody @Valid ProdutorCadastroDTO dados, UriComponentsBuilder uriBuilder){
        var produtor = new Produtor(dados); 
        repository.save(produtor);

        var uri = uriBuilder.path("/produtores/{id}").buildAndExpand(produtor.getId()).toUri();

        return ResponseEntity.created(uri).body(new ProdutorResponseDTO(produtor));        
    }
    
    @PutMapping
    @Transactional
    public ResponseEntity<ProdutorResponseDTO> atualizar(@RequestBody @Valid ProdutorAtualizaDTO dados){
        var produtor = repository.getReferenceById(dados.id());
        produtor.atualizarInfo(dados);
        
        return ResponseEntity.ok(new ProdutorResponseDTO(produtor));
    }

    @DeleteMapping
    @Transactional
    public ResponseEntity<ProdutorResponseDTO> deletar(@RequestBody @Valid ProdutorInativaDTO dados){
        var produtor = repository.getReferenceById(dados.id());
        produtor.inativar(dados);

        return ResponseEntity.ok(new ProdutorResponseDTO(produtor));
    }
}
