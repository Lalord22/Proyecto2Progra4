/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.progra.guia.presentation.clientes;

import com.progra.guia.logic.Cliente;
import com.progra.guia.logic.Poliza;
import java.util.ArrayList;
import java.util.List;


/*
 *Proyecto I Programacion4
 * 
 *Jennifer Lobo Vasquez
 *Daniela Madrigal Morales
 *Gerardo Salzar Vargas
 * 
 */


public class Model {
    
    List<Cliente> clientes;
    Cliente seleccionado;
    List<Poliza> polizas;
    
    public Model() {
        this.reset();
    }

    public void reset(){ 
        List<Cliente> rows = new ArrayList<>();        
        seleccionado=null;  
        this.setClientes(rows);
    }

    public List<Cliente> getClientes() {
        return clientes;
    }

    public void setClientes(List<Cliente> clientes) {
        this.clientes = clientes;
    }

    public Cliente getSeleccionado() {
        return seleccionado;
    }

    public void setSeleccionado(Cliente seleccionado) {
        this.seleccionado = seleccionado;
    }

    public List<Poliza> getPolizas() {
        return polizas;
    }

    public void setPolizas(List<Poliza> polizas) {
        this.polizas = polizas;
    }
    
    
    
    
}
