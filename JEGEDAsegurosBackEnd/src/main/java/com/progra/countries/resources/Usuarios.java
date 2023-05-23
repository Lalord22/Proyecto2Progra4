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
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.Response;

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
            return Service.instance().usuarioFind(cedula, clave);
        } catch (Exception ex) {
            throw new NotFoundException();
        }

    }

    @PUT
    @Path("/update")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateUsuario(Usuario usuario) {             //Testeado, hk
        try {
            Service.instance().usuarioUpdate(usuario);
            return Response.ok().build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }

    @POST
    @Path("/register")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response registerUser(Usuario usuario) {
        try {
            Service.instance().registerUser(usuario);
            return Response.ok().build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }

    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(Usuario usuario) {
        try {
            // Check if the provided id and clave match a user in the database
            Usuario loggedInUser = Service.instance().usuarioFind(usuario.getCedula(), usuario.getClave());

            if (loggedInUser != null) {
                // User authentication successful, return the user object
                return Response.status(Response.Status.OK).entity(loggedInUser).build();
            } else {
                // User authentication failed
                return Response.status(Response.Status.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            // Handle the exception appropriately (e.g., log the error, return an error response)
            // You can customize the error handling based on your application's requirements
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }

}
