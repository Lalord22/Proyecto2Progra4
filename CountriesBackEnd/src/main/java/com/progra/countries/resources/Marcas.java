package com.progra.countries.resources;

import com.progra.countries.logic.Marca;
import com.progra.countries.logic.Service;
import jakarta.annotation.security.PermitAll;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("/marcas")
@PermitAll
public class Marcas {


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Marca> getModelos() {
        return Service.instance().cargarMarcas();
    }
    
    
        @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Marca marcaShowById(@PathParam("id") Integer id) {
        try {
            return Service.instance().cargarMarcaById(id);
        } catch (Exception e) {
            e.printStackTrace();
            // Handle the exception and return an error response
            // or throw a custom exception based on your application's requirements
            return null; // or throw a custom exception here
        }
    }

    
}
