package com.torga.pedidos.repository;

import com.torga.pedidos.domain.PresupuestoPedido;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the PresupuestoPedido entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PresupuestoPedidoRepository extends JpaRepository<PresupuestoPedido, Long> {

    @Query("select presupuesto_pedido from PresupuestoPedido presupuesto_pedido where presupuesto_pedido.user.login = ?#{principal.username}")
    List<PresupuestoPedido> findByUserIsCurrentUser();

}
