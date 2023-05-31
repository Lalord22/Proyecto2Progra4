package com.progra.countries.resources;

import com.progra.countries.logic.Cliente;
import com.progra.countries.logic.Service;
import com.progra.countries.logic.Poliza;
import com.progra.countries.logic.PolizaDTO;
import com.progra.countries.logic.Usuario;
import jakarta.annotation.security.PermitAll;
import jakarta.json.bind.annotation.JsonbTransient;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.NotAuthorizedException;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import java.util.List;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;
import java.sql.SQLException;

@Path("/polizas")
@PermitAll
public class Polizas {

    @JsonbTransient
    private Cliente cliente;
    
     @GET
    @Path("/cliente")
    @Produces(MediaType.APPLICATION_JSON)
    public List<PolizaDTO> muestraPolizasCliente(@Context HttpServletRequest request) throws Exception {
        Usuario loggedUser = (Usuario) request.getSession().getAttribute("user");
        if (loggedUser == null) {
        throw new NotAuthorizedException("User not logged in");
    }
        
        String cedula = loggedUser.getCedula();
        List<Poliza> polizas = Service.instance().cargarPolizasCliente(cedula);
        return PolizaDTO.fromPolizas(polizas);
    }
    
    

    @GET
    @Path("/findByPlaca/{placa}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Poliza> polizaFindPlaca(@PathParam("placa") String numero) throws Exception {
        return Service.instance().polizaFindPlaca(numero);
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Poliza polizaShowById(@PathParam("id") Integer id) {
        try {
            return Service.instance().polizaShowById(id);
        } catch (Exception e) {
            e.printStackTrace();
            // Handle the exception and return an error response
            // or throw a custom exception based on your application's requirements
            return null; // or throw a custom exception here
        }
    }

    @POST
    @Path("/agregar")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response agregarPoliza(Poliza poliza) {
        try {
            Service.instance().agregarPoliza(poliza);
            return Response.status(Response.Status.OK).build();
        } catch (SQLException e) {
            // Handle the exception appropriately (e.g., log the error, return an error response)
            // You can customize the error handling based on your application's requirements
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @POST
    @Path("/calcular")
    @Consumes(MediaType.APPLICATION_JSON)
    public double calcularCostoTotalPoliza(Poliza poliza) {
        return Service.instance().calcularCostoTotalPoliza(poliza);
    }
}
