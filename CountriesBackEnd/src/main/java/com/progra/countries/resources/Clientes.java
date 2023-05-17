package com.progra.countries.resources;

import com.progra.countries.logic.Cliente;
import com.progra.countries.logic.Service;
import com.progra.countries.logic.Poliza;
import com.progra.countries.logic.Usuario;
import jakarta.annotation.security.PermitAll;
import jakarta.json.bind.annotation.JsonbTransient;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import java.util.List;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.core.Response;

@Path("/clientes")
@PermitAll
public class Clientes {

    @GET
    @Path("/{cedula}/{clave}")
    @Produces(MediaType.APPLICATION_JSON)
    public Cliente clienteFind(@PathParam("cedula") String cedula, @PathParam("clave") String clave) throws Exception {
        Usuario usuario = new Usuario(cedula, clave);
        Cliente cliente = Service.instance().clienteFind(usuario);
        return cliente;
    }

    @POST
    @Path("/update")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateCliente(Cliente cliente) {
        try {
            Service.instance().clienteUpdate(cliente);
            return Response.ok().build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }

    @POST
@Path("/register")
@Consumes(MediaType.APPLICATION_JSON)                        
public Response registerCliente(Cliente cliente) {             //no esta registrando, pero retorna OK
    try {
        Service.instance().registerCliente(cliente);
        return Response.ok().build();
    } catch (Exception e) {
        return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
    }
}


}
