package com.progra.countries.resources;

import com.progra.countries.logic.Modelo;
import com.progra.countries.logic.Service;
import jakarta.annotation.security.PermitAll;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("/modelos")
@PermitAll
public class Modelos {


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Modelo> getModelos() {
        return Service.instance().cargarModelos();
    }

    
}
