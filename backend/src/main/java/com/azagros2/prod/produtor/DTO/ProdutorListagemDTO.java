package com.azagros2.prod.produtor.DTO;

import java.time.LocalDate;

import com.azagros2.prod.produtor.Estado;
import com.azagros2.prod.produtor.Produtor;

public record ProdutorListagemDTO(

    Long id,
    String nome,
    String telefone,
    String municipio,
    String comunidade,
    Estado estado,
    LocalDate dataCadastro

) {
    public ProdutorListagemDTO(Produtor produtor){
        this(
            produtor.getId(),
            produtor.getNome(),
            produtor.getTelefone(),
            produtor.getMunicipio(),
            produtor.getComunidade(),
            produtor.getEstado(),
            produtor.getDataCadastro()

        );
    }
}
