package com.progra.countries.resources;

import com.progra.countries.logic.Modelo;
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

@Path("/modelos")
@PermitAll
public class Modelos {


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Modelo> getModelos() {
        return Service.instance().cargarModelos();
    }
    
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response agregarModelo(Modelo modelo) {
        try {
            Service.instance().agregarModelo(modelo);
            return Response.status(Response.Status.CREATED).build();
        } catch (Exception e) {
            // Handle the exception appropriately (e.g., log the error, return an error response)
            // You can customize the error handling based on your application's requirements
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }

    
}
