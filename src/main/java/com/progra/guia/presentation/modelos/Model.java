/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.progra.guia.presentation.modelos;

import com.progra.guia.logic.Marca;
import com.progra.guia.logic.Modelo;
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
    List<Modelo> modelos;
    Modelo seleccionado;

    public Model() {
        this.reset();
    }

    public void reset(){ 
        List<Modelo> rows = new ArrayList<>();        
        seleccionado=null;  
        this.setModelos(rows);
    }

    public List<Modelo> getModelos() {
        return modelos;
    }

    public void setModelos(List<Modelo> modelos) {
        this.modelos = modelos;
    }

    public Modelo getSeleccionado() {
        return seleccionado;
    }

    public void setSeleccionado(Modelo seleccionado) {
        this.seleccionado = seleccionado;
    }

}
