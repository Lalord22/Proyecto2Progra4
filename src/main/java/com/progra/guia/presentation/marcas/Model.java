/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.progra.guia.presentation.marcas;

import com.progra.guia.logic.Marca;
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
    List<Marca> marca;
    Marca seleccionado;

    public Model() {
        this.reset();
    }

    public void reset(){ 
        List<Marca> rows = new ArrayList<>();        
        seleccionado=null;  
        this.setMarcas(rows);
    }

    public List<Marca> getMarcas() {
        return marca;
    }

    public void setMarcas(List<Marca> marca) {
        this.marca = marca;
    }

    public Marca getSeleccionado() {
        return seleccionado;
    }

    public void setSeleccionado(Marca seleccionado) {
        this.seleccionado = seleccionado;
    }
    
    
}
