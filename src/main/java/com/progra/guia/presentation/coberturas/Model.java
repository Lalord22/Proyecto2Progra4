/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.progra.guia.presentation.coberturas;
import com.progra.guia.logic.Cobertura;
import java.util.ArrayList;
import java.util.List;



/*
 *Proyecto I Programacion 4
 * 
 *Jennifer Lobo Vasquez
 *Daniela Madrigal Morales
 *Gerardo Salzar Vargas
 * 
 */


public class Model {
    List<Cobertura> cobertura;
    Cobertura seleccionado;

    public Model() {
        this.reset();
    }

    public void reset(){ 
        List<Cobertura> rows = new ArrayList<>();        
        seleccionado=null;  
        this.setCoberturas(rows);
    }
    
    public void setCoberturas(List<Cobertura> polizas){
        this.cobertura =polizas;    
    }

     public List<Cobertura> getCoberturas() {
        return cobertura;
    }

    public Cobertura getSeleccionado() {
        return seleccionado;
    }

    public void setSeleccionado(Cobertura seleccionado) {
        this.seleccionado = seleccionado;
    }
}
