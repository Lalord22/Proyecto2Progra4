package com.progra.countries.resources;

import com.progra.countries.logic.Cobertura;
import com.progra.countries.logic.Service;

import jakarta.annotation.security.PermitAll;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/coberturas")
@PermitAll
public class Coberturas {


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Cobertura> getCoberturas() {
        return Service.instance().cargarCoberturas();
    }
    
    
    @POST
    @Path("/register")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response registerCobertura(Cobertura cobertura) {
        try {
            Service.instance().agregaCobertura(cobertura);
            return Response.ok().build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }

    
}
