/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.progra.guia.logic;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


/*
 *Proyecto I Programacion 4
 * 
 *Jennifer Lobo Vasquez
 *Daniela Madrigal Morales
 *Gerardo Salzar Vargas
 * 
 */


public class Poliza {

    public static List<Modelo> getTodosModelos() {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
    int id;
    String numeroPlaca;
    String anno;
    double valorAsegurado;
    String plazoPago;
    String fechaInicio;
    Modelo modelo;  
    Cliente cliente;
    List<Cobertura> coberturas;
    
    
      public Poliza(int id, String numeroPlaca, String anno, double valorAsegurado, String plazoPago, String fechaInicio, Modelo modelo, Cliente cliente) {
        this.id = id;
        this.numeroPlaca = numeroPlaca;
        this.anno = anno;
        this.valorAsegurado = valorAsegurado;
        this.plazoPago = plazoPago;
        this.fechaInicio = fechaInicio;
        this.modelo= modelo;
        this.cliente = cliente;
        this.coberturas = new ArrayList();
    }

     public Poliza() {
        this(0,"","",0,"","",new Modelo(0,"",new Marca(0,"")),new Cliente());
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNumeroPlaca() {
        return numeroPlaca;
    }

    public void setNumeroPlaca(String numeroPlaca) {
        this.numeroPlaca = numeroPlaca;
    }

    public String getAnno() {
        return anno;
    }

    public void setAnno(String anno) {
        this.anno = anno;
    }

    public double getValorAsegurado() {
        return valorAsegurado;
    }

    public void setValorAsegurado(double valorAsegurado) {
        this.valorAsegurado = valorAsegurado;
    }

    public String getPlazoPago() {
        return plazoPago;
    }

    public void setPlazoPago(String plazoPago) {
        this.plazoPago = plazoPago;
    }

    public String getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(String fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public Modelo getModelo() {
        return modelo;
    }

    public void setModelo(Modelo modelo) {
        this.modelo = modelo;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public List<Cobertura> getCoberturas() {
        return coberturas;
    }

    public void setCoberturas(List<Cobertura> coberturas) {
        this.coberturas = coberturas;
    }
    

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Poliza other = (Poliza) obj;
        if (!Objects.equals(this.numeroPlaca, other.numeroPlaca)) {
            return false;
        }
        return true;
    }
    
    
    
    
}
