package com.azagros2.prod.repository;

import com.azagros2.prod.produtor.Estado;
import com.azagros2.prod.produtor.Produtor;
import com.azagros2.prod.produtor.Produtor_;

import java.time.LocalDate;
import java.util.Objects;

import org.springframework.data.jpa.domain.Specification;

public class ProdutorSpec {

    public static Specification<Produtor> byId(Long id) {
        return (root, query, builder) -> {
            if (Objects.nonNull(id)) {
                try {
                    ;
                    return builder.equal(root.get(Produtor_.id), id);
                } catch (NumberFormatException e) {
                    return null;
                }
            }
            return null;
        };
    }

    public static Specification<Produtor> byNome(String nome) {

        return (root, query, builder) -> {

            if (Objects.nonNull(nome)) {
                return builder.like(
                    builder.lower(root.get(Produtor_.nome)), 
                    "%" + nome.toLowerCase() + "%"
                );            
            }

            return null;
        };
    }

    public static Specification<Produtor> byMunicipio(String municipio) {

        return (root, query, builder) -> {

            if (Objects.nonNull(municipio)) {
                return builder.like(
                    builder.lower(root.get(Produtor_.municipio)), 
                    "%" + municipio.toLowerCase() + "%"
                );              
            }

            return null;
        };
    }

    public static Specification<Produtor> byEstado(Estado estado) {

        return (root, query, builder) -> {

            if (Objects.nonNull(estado)) {
                return builder.equal(root.get(Produtor_.ESTADO), estado);
            }

            return null;
        };
    }

    public static Specification<Produtor> isAtivo() {
        return (root, query, builder) -> builder.isTrue(root.get("ativo"));
    }

    public static Specification<Produtor> porFiltros(String nome, String municipio, Estado estado) {
        return byNome(nome).
                and(byMunicipio(municipio)).
                and(byEstado(estado)).
                and(isAtivo());
    }

}