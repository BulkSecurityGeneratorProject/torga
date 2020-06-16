package com.torga.pedidos.repository;

import com.torga.pedidos.domain.ProductosDormitorio;

import java.util.Collection;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ProductosDormitorio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductosDormitorioRepository extends JpaRepository<ProductosDormitorio, Long>, JpaSpecificationExecutor<ProductosDormitorio> {
	@Query("Select u from ProductosDormitorio u where u.categoriasDormi.id = ?1 order by u.id")
	Collection<ProductosDormitorio> findByCategoriaDormi(Long id);
	
	@Query("Select u from ProductosDormitorio u where u.categoriasDormi.id = ?1 order by length(u.nombre),u.nombre")
	Collection<ProductosDormitorio> findByCategoriaDormi1(Long id);

}
