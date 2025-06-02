package com.azagros2.prod.produtor.DTO;

import java.time.LocalDate;

import com.azagros2.prod.produtor.Estado;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ProdutorCadastroDTO(

    @NotNull
    @NotBlank
    String nome,
    String telefone,
    String municipio,
    String comunidade,
    Boolean familiar,

    @Enumerated
    Estado estado,
    LocalDate dataCadastro

) {
}
