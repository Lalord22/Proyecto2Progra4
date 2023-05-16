package com.progra.countries.resources;

import com.progra.countries.logic.Cliente;
import jakarta.annotation.security.PermitAll;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import java.util.List;
import com.progra.countries.logic.Country;
import com.progra.countries.logic.Service;
import com.progra.countries.logic.Usuario;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.QueryParam;

@Path("/categorias")
@PermitAll
public class Categorias {

  @GET
    @Path("/cliente/{cedula}/{clave}")
    @Produces(MediaType.APPLICATION_JSON)
    public Cliente clienteFind(@PathParam("cedula") String cedula, @PathParam("clave") String clave) throws Exception {
        Usuario usuario = new Usuario(cedula, clave);
        Cliente cliente = Service.instance().clienteFind(usuario);
        return cliente;
    }
    
     
}
