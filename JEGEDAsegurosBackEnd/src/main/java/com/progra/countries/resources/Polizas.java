package com.progra.countries.resources;

import com.progra.countries.logic.Cliente;
import com.progra.countries.logic.Service;
import com.progra.countries.logic.Poliza;
import jakarta.annotation.security.PermitAll;
import jakarta.json.bind.annotation.JsonbTransient;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import java.util.List;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.Response;
import java.sql.SQLException;

@Path("/polizas")
@PermitAll
public class Polizas {

    @JsonbTransient
    private Cliente cliente;
    
    @GET
    @Path("/cliente/{cedula}")  // TODO: cambiar este metodo para que jale la cedula de la sesion
    @Produces(MediaType.APPLICATION_JSON)
    public List<Poliza> muestraPolizasCliente(@PathParam("cedula") String cedula) throws Exception {
        List<Poliza> polizas = Service.instance().cargarPolizasCliente(cedula);
        return polizas;
    }
    
    // TODO: cambiar este metodo para que jale la cedula de la sesion
    //No se si funciona porque aun no hay nadie registrado aun
    /*@GET
    @Path("/cliente")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Poliza> muestraPolizasCliente(@Context HttpServletRequest request) throws Exception {
        HttpSession session = request.getSession();
        String cedula = (String) session.getAttribute("cedula"); // Obtener la cédula de la sesión

        List<Poliza> polizas = Service.instance().cargarPolizasCliente(cedula);
        return polizas;
    }*/

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
