package com.azagros2.prod.produtor.DTO;

import com.azagros2.prod.produtor.Estado;
import com.azagros2.prod.produtor.Produtor;

import jakarta.validation.constraints.NotNull;

public record ProdutorAtualizaDTO(
    @NotNull
    Long id,
    String nome,
    String telefone,
    String municipio,
    String comunidade,
    boolean familiar,
    Estado estado   
) {

}
