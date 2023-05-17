package com.progra.countries.resources;

import com.progra.countries.logic.Cliente;
import com.progra.countries.logic.Service;
import com.progra.countries.logic.Poliza;
import jakarta.annotation.security.PermitAll;
import jakarta.json.bind.annotation.JsonbTransient;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import java.util.List;
import jakarta.ws.rs.PathParam;

@Path("/polizas")
@PermitAll
public class Polizas {
    
    @JsonbTransient
    private Cliente cliente;
    
    @GET
    @Path("/cliente/{cedula}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Poliza> muestraPolizasCliente(@PathParam("cedula") String cedula) throws Exception {
        List<Poliza> polizas = Service.instance().cargarPolizasCliente(cedula);
        return polizas;
    }
    
     @GET
    @Path("/findByPlaca/{placa}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Poliza> polizaFindPlaca(@PathParam("placa") String numero) throws Exception {
        return Service.instance().polizaFindPlaca(numero);
    }
}
