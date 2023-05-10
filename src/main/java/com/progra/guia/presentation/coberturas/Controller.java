/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package com.progra.guia.presentation.coberturas;

import com.progra.guia.logic.Categoria;
import com.progra.guia.logic.Cliente;
import com.progra.guia.logic.Cobertura;
import com.progra.guia.logic.Modelo;
import com.progra.guia.logic.Poliza;
import com.progra.guia.logic.Service;
import com.progra.guia.logic.Usuario;
import jakarta.servlet.RequestDispatcher;
import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;


@WebServlet(name = "ControllerCobertura", urlPatterns = {
    "/presentation/cliente/coberturas",
    "/presentation/admin/agregaCobertura",
    "/deleteCobertura", "/CompraPaso2", "/CompraPolizaPaso3","/compraFinalizada"})
public class Controller extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, Exception {
        response.setContentType("text/html;charset=UTF-8");

        request.setAttribute("model", new Model());
        String viewUrl = "";

        switch (request.getServletPath()) {
            case "/presentation/cliente/coberturas":
                viewUrl = this.show(request);
                break;
            case "/presentation/admin/agregaCobertura":
                viewUrl = this.agregarCobertura(request);
                break;
            case "/deleteCobertura":
                viewUrl = this.delete(request);
                break;
            case "/CompraPaso2":
                this.paso2(request, response);
                break;
            case "/CompraPolizaPaso3":
                this.paso3(request, response);
                break;
                case "/compraFinalizada":
                viewUrl = this.insertPolizaInDatabase(request);
                break;

        }

        request.getRequestDispatcher(viewUrl).forward(request, response);

    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch (Exception ex) {
            Logger.getLogger(Controller.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch (Exception ex) {
            Logger.getLogger(Controller.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

    private String show(HttpServletRequest request) {
        return this.showAction(request);
    }

    private String showAction(HttpServletRequest request) {
        Model model = (Model) request.getAttribute("model");
        Service service = Service.instance();
        HttpSession session = request.getSession(true);

        Usuario usuario = (Usuario) session.getAttribute("usuario");

        model.setCoberturas(service.cargarCoberturas());
        return "/presentation/cliente/coberturas/View.jsp";

    }

    private String agregarCobertura(HttpServletRequest request) throws Exception {

        request.setAttribute("model", new Model());
        Service service = Service.instance();

        String descripcion = request.getParameter("descripcion");
        String minimo = request.getParameter("minimo");
        String porcentual = request.getParameter("porcentual");
        String id = request.getParameter("categoria");

        double min = Double.parseDouble(minimo);
        double prcnt = Double.parseDouble(porcentual);
        Integer idValue = Integer.parseInt(id);

        Categoria cat = service.cargarCategoriaById(idValue);

        Cobertura cobertura = new Cobertura(0, descripcion, min, prcnt, cat);

        try {

            service.agregaCobertura(cobertura);

            return "/presentation/cliente/coberturas";

        } catch (Exception ex) {

            System.out.println("Error, try again later");

            return null;
        }

    }

    private String delete(HttpServletRequest request) {
        request.setAttribute("model", new Model());
        Service service = Service.instance();
        String id = request.getParameter("id");

        try {

            service.deleteCobertura(id);

            return "/presentation/registration/registrationSuccess.jsp";

        } catch (Exception ex) {

            System.out.println("Error, try again later");

            return null;
        }
    }

    private void paso2(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Model model = (Model) request.getAttribute("model");
        Service service = Service.instance();
        HttpSession session = request.getSession(true);
        Usuario usuario = (Usuario) session.getAttribute("usuario");

        model.setCoberturas(service.cargarCoberturas());

        String numeroPlaca = request.getParameter("numeroPlaca");
        String marca = request.getParameter("marca");
        String modelo = request.getParameter("modelo");
        int year = Integer.parseInt(request.getParameter("year"));
        double valorAsegurado = Double.parseDouble(request.getParameter("valorAsegurado"));
        String periodoPago = request.getParameter("periodoPago");
        String fechaInicio = request.getParameter("fechaInicio");

        // Set parameters as attributes in the request object
        request.setAttribute("numeroPlaca", numeroPlaca);
        request.setAttribute("marca", marca);
        request.setAttribute("modelo", modelo);
        request.setAttribute("year", year);
        request.setAttribute("valorAsegurado", valorAsegurado);
        request.setAttribute("periodoPago", periodoPago);
        request.setAttribute("fechaInicio", fechaInicio);

        request.getRequestDispatcher("presentation/cliente/poliza/CompraPaso2.jsp").forward(request, response);
    }

    private void paso3(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException, Exception {
    Service service = Service.instance();
    HttpSession session = request.getSession();
    Usuario usuario = (Usuario) session.getAttribute("usuario");
    String numeroPlaca = request.getParameter("numeroPlaca");
    String marca = request.getParameter("marca");
    String modelo = request.getParameter("modelo");
    int modeloId = Integer.parseInt(modelo);
    String year = request.getParameter("year");
    double valorAsegurado = Double.parseDouble(request.getParameter("valorAsegurado"));
    String periodoPago = request.getParameter("periodoPago");
    String fechaInicio = request.getParameter("fechaInicio");
    String[] coverages = request.getParameterValues("coverage");
    
    Modelo modeloDePoliza = service.cargarModeloById(modeloId);
    Cliente cliente = service.clienteFind(usuario);
    
    Poliza poliza = new Poliza();
    poliza.setNumeroPlaca(numeroPlaca);
    poliza.setAnno(year);
    poliza.setValorAsegurado(valorAsegurado);
    poliza.setPlazoPago(periodoPago);
    poliza.setFechaInicio(fechaInicio);
    poliza.setModelo(modeloDePoliza);
    poliza.setCliente(cliente);
    
    // Create an instance of CoberturaDao
    // Retrieve the Cobertura objects by ID
    List<Cobertura> coberturas = new ArrayList<>();
    for (String coverageId : coverages) {
        Cobertura cobertura = null;
        try {
            cobertura = service.cargarCoberturaById(coverageId);
        } catch (Exception e) {
            // Handle the exception
        }
        if (cobertura != null) {
            coberturas.add(cobertura);
        }
    }
    poliza.setCoberturas(coberturas);
    
    double totalCosto = service.calcularCostoTotalPoliza(poliza);
    
    
    // Add the Poliza object to the request attributes
    request.setAttribute("poliza", poliza);
    request.setAttribute("coberturas", coberturas);
    request.setAttribute("totalCosto", totalCosto);

    RequestDispatcher dispatcher = request.getRequestDispatcher("presentation/cliente/poliza/CompraPaso3.jsp");
    dispatcher.forward(request, response);
}

    
    
    private String insertPolizaInDatabase(HttpServletRequest request) throws SQLException {
        HttpSession session = request.getSession();
        Poliza poliza = (Poliza) session.getAttribute("poliza");
        Service service = Service.instance();
        
        
    

            service.agregarPoliza(poliza);

            return "/presentation/cliente/polizas/blank";

       
        
    }


}
