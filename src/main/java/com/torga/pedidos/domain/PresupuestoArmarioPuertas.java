package com.torga.pedidos.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A PresupuestoArmarioPuertas.
 */
@Entity
@Table(name = "presupuesto_armario_puertas")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PresupuestoArmarioPuertas implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "precio")
    private Float precio;
    
    @Column(name = "orden")
    private Float orden;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Acabados acabados;

    @ManyToOne
    @JsonIgnoreProperties("")
    private ProductosDormitorio productosDormitorio;

    @ManyToOne
    @JsonIgnoreProperties("")
    private PresupuestoArmario presupuestoArmario;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getPrecio() {
        return precio;
    }

    public PresupuestoArmarioPuertas precio(Float precio) {
        this.precio = precio;
        return this;
    }

    public void setPrecio(Float precio) {
        this.precio = precio;
    }
    
    public Float getOrden() {
        return orden;
    }

    public PresupuestoArmarioPuertas orden(Float orden) {
        this.orden = orden;
        return this;
    }

    public void setOrden(Float orden) {
        this.orden = orden;
    }

    public Acabados getAcabados() {
        return acabados;
    }

    public PresupuestoArmarioPuertas acabados(Acabados acabados) {
        this.acabados = acabados;
        return this;
    }

    public void setAcabados(Acabados acabados) {
        this.acabados = acabados;
    }

    public ProductosDormitorio getProductosDormitorio() {
        return productosDormitorio;
    }

    public PresupuestoArmarioPuertas productosDormitorio(ProductosDormitorio productosDormitorio) {
        this.productosDormitorio = productosDormitorio;
        return this;
    }

    public void setProductosDormitorio(ProductosDormitorio productosDormitorio) {
        this.productosDormitorio = productosDormitorio;
    }

    public PresupuestoArmario getPresupuestoArmario() {
        return presupuestoArmario;
    }

    public PresupuestoArmarioPuertas presupuestoArmario(PresupuestoArmario presupuestoArmario) {
        this.presupuestoArmario = presupuestoArmario;
        return this;
    }

    public void setPresupuestoArmario(PresupuestoArmario presupuestoArmario) {
        this.presupuestoArmario = presupuestoArmario;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        PresupuestoArmarioPuertas presupuestoArmarioPuertas = (PresupuestoArmarioPuertas) o;
        if (presupuestoArmarioPuertas.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), presupuestoArmarioPuertas.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PresupuestoArmarioPuertas{" +
            "id=" + getId() +
            ", precio=" + getPrecio() +
            "}";
    }
}
