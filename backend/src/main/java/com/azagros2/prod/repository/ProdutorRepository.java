package com.azagros2.prod.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.azagros2.prod.produtor.Produtor;

public interface ProdutorRepository extends JpaRepository<Produtor, Long>, JpaSpecificationExecutor<Produtor>{ 
    
} 