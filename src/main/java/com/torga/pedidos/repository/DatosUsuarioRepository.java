package com.torga.pedidos.repository;

import com.torga.pedidos.domain.DatosUsuario;
import com.torga.pedidos.domain.ProductosDormitorio;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

/**
 * Spring Data  repository for the DatosUsuario entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DatosUsuarioRepository extends JpaRepository<DatosUsuario, Long> {

    @Query("select datos_usuario from DatosUsuario datos_usuario where datos_usuario.user.login = ?#{principal.username}")
    List<DatosUsuario> findByUserIsCurrentUser();
    
    @Query("Select u.nombreFiscal,u.user from DatosUsuario u")
	Collection<DatosUsuario> busquing();
    
    @Query("Select u from DatosUsuario u where u.repreGCompra.id = ?1 order by u.nombreFiscal")
	Collection<DatosUsuario> busquing1(Long id);
    
    @Query("Select u from DatosUsuario u where u.user.id = ?1")
	Collection<DatosUsuario> busquing12(Long id);
    

}
