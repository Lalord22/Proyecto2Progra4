package com.progra.countries.resources;

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

@Path("/usuarios")
@PermitAll
public class Usuarios {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Usuario> getAllUsuarios() {
        Service service = Service.instance();
        // Assuming the Service class has a method to retrieve all usuarios
        return service.getAllUsuarios();
    }
    
     @GET
    @Path("/{cedula}/{clave}")
    @Produces({MediaType.APPLICATION_JSON})
    public Usuario getUsuario(@PathParam("cedula") String cedula, @PathParam("clave") String clave) throws Exception {
       try {
            return Service.instance().usuarioFind(cedula,clave);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
       
    }
}
