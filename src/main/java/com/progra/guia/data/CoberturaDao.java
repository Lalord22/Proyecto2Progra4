/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.progra.guia.data;

import com.progra.guia.logic.Categoria;
import com.progra.guia.logic.Cobertura;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
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


public class CoberturaDao {
    RelDatabase db;

    public CoberturaDao(RelDatabase db) {
        this.db = db;
    }
    public Cobertura read(Integer id) throws Exception {
        String sql = "select " +
                "* " +
                "from Cobertura e inner join Categoria u on e.categoria=u.id " +
                "where e.id=?";
        PreparedStatement stm = db.prepareStatement(sql);
        stm.setInt(1, id);
        ResultSet rs = db.executeQuery(stm);
        CategoriaDao categoriaDao = new CategoriaDao(db);
        Cobertura c;
        if (rs.next()) {
            c= from(rs, "e");
            c.setCategoria(categoriaDao.from(rs,"u"));
            return c;
        } else {
            throw new Exception("Cobertura no Existe");
        }
    }
    
    public Cobertura from(ResultSet rs, String alias) {
        try {
            Cobertura e = new Cobertura();
            e.setId(rs.getInt(alias + ".id"));
            e.setDescripcion(rs.getString(alias + ".descripcion"));
            e.setCostoMinimo(rs.getDouble(alias+".costoMinimo"));
            e.setCostoPorcentual(rs.getDouble(alias + ".costoPorcentual"));
            return e;
        } catch (SQLException ex) {
            return null;
        }
    }    
    
    public Cobertura from(ResultSet rs) {
        try {
            Categoria cate = new Categoria(0,"");
            Cobertura e = new Cobertura(0,"",0,0,cate);
            e.setCategoria(cate);
            e.setId(rs.getInt("id"));
            e.setDescripcion(rs.getString( "descripcion"));
            e.setCostoMinimo(rs.getDouble("costoMinimo"));
            e.setCostoPorcentual(rs.getDouble( "costoPorcentual"));
            return e;
        } catch (SQLException ex) {
            return null;
        }
    }  

    public void update(Cobertura e) throws Exception {
        String sql = "UPDATE Cobertura SET id=?, descripcion=?, costoMinimo=?, costoPorcentual=? WHERE id=?";
        PreparedStatement stm = db.prepareStatement(sql);
        stm.setInt(1, e.getId());
        stm.setString(2, e.getDescripcion());
        stm.setDouble(3, e.getCostoMinimo());
        stm.setDouble(4, e.getCostoPorcentual());
       
        int count = db.executeUpdate(stm);
        if (count == 0) {
            throw new Exception("Cobertura no existe");
        }
    }    

    public void addCobertura(Cobertura u) throws Exception {
        String query = "INSERT INTO Cobertura (descripcion, costoMinimo, costoPorcentual, categoria) VALUES (?, ?, ?, ?)";
        PreparedStatement statement = db.prepareStatement(query);
        statement.setString(1, u.getDescripcion());
        statement.setDouble(2, u.getCostoMinimo());
        statement.setDouble(3, u.getCostoPorcentual());
        statement.setInt(4, u.getCategoria().getId());
        db.executeUpdate(statement); 

      }

    public List<Cobertura> cargarTodo() {
        
    List<Cobertura> resultado = new ArrayList<>();
    try {
        String sql = "SELECT * FROM Cobertura";
        PreparedStatement stm = db.prepareStatement(sql);
        
        ResultSet rs = db.executeQuery(stm);
        while (rs.next()) {
            
            
            resultado.add(from(rs));
        }
    } catch (SQLException ex) {
        // Handle the exception
    }
    return resultado;

        
    }

    public void deleteById(String id) throws SQLException, Exception {
        String sql = "DELETE FROM Cobertura WHERE id=?";
    PreparedStatement stm = db.prepareStatement(sql);
    Integer idValue = Integer.parseInt(id);
    stm.setInt(1, idValue);
    
    int count = db.executeUpdate(stm);
    if (count == 0) {
        throw new Exception("Cobertura no existe");
    }
        
    }

    public Cobertura cargarCoberturaById(String coverageId) throws Exception {
    String sql = "select " +
            "* " +
            "from Cobertura e inner join Categoria u on e.categoria=u.id " +
            "where e.id=?";
    PreparedStatement stm = db.prepareStatement(sql);
    stm.setString(1, coverageId);
    ResultSet rs = db.executeQuery(stm);
    CategoriaDao categoriaDao = new CategoriaDao(db);
    Cobertura c;
    if (rs.next()) {
        c= from(rs, "e");
        c.setCategoria(categoriaDao.from(rs,"u"));
        return c;
    } else {
        throw new Exception("Cobertura no Existe");
    }
}

}
