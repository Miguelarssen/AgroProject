package com.azagros2.prod.produtor;

import java.time.LocalDate;

import com.azagros2.prod.produtor.DTO.ProdutorAtualizaDTO;
import com.azagros2.prod.produtor.DTO.ProdutorCadastroDTO;
import com.azagros2.prod.produtor.DTO.ProdutorInativaDTO;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.persistence.Id;

@Table(name = "Produtor")
@Entity(name = "produtores")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")

public class Produtor {

    public Produtor(ProdutorCadastroDTO dados) {
        this.nome = dados.nome();
        this.telefone = dados.telefone();
        this.municipio = dados.municipio();
        this.comunidade = dados.comunidade();
        this.familiar = dados.familiar();
        this.estado = dados.estado();
        this.dataCadastro = dados.dataCadastro();
        this.ativo = true;
    }
    
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String telefone;
    private String municipio;
    private String comunidade;
    private Boolean familiar;

    @Enumerated(EnumType.STRING)
    private Estado estado;
    private LocalDate dataCadastro;
    private Boolean ativo;


    public void atualizarInfo(@Valid ProdutorAtualizaDTO dados){
        if (dados.nome() != null) {
            this.nome = dados.nome();
        }
        if (dados.telefone() != null) {
            this.telefone = dados.telefone();
        }
        if (dados.municipio() != null) {
            this.municipio = dados.municipio();
        }
        if (dados.comunidade() != null) {
            this.comunidade = dados.comunidade();
        }
        if (dados.estado() != null) {
            this.estado = dados.estado();
        }
    }

    public void inativar(@Valid ProdutorInativaDTO dados){
        this.ativo = false;
    }
}