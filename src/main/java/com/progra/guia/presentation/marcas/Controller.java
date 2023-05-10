/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package com.progra.guia.presentation.marcas;

import com.progra.guia.logic.Marca;
import com.progra.guia.logic.Modelo;
import com.progra.guia.logic.Usuario;
import com.progra.guia.logic.Service;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@WebServlet(name = "ControllerMarca", urlPatterns = {
    "/admin/marcas",
    "/admin/addMarca",
    "/presentation/cliente/agregamodelo", "/ComprarPoliza","/iniciarCompra"})

public class Controller extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");

        request.setAttribute("model", new Model());
        String viewUrl = "";

        switch (request.getServletPath()) {
            case "/admin/marcas":
                viewUrl = this.show(request);
                break;
            case "/admin/addMarca":
                viewUrl = this.add(request);
                break;
            case  "/presentation/cliente/agregamodelo":
                viewUrl = this.addModelo(request);
                break;
            case "/ComprarPoliza":
                this.paso1(request, response);
                break;
            case "/iniciarCompra":
                this.muestraForma(request, response);
                break;
        }

        request.getRequestDispatcher(viewUrl).forward(request, response);
    }
    
   
    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
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
        try {
            model.setMarcas(service.cargarMarcas());
            return "/presentation/admin/marcas/View.jsp";
        } catch (Exception ex) {
            return "";
        }

    }

    private String add(HttpServletRequest request) {
        request.setAttribute("model", new Model());
        Service service = Service.instance();

        String descripcion = request.getParameter("descripcion");

        Marca marca = new Marca(0, "");
        marca.setDescripcion(descripcion);

        try {
            service.agregarMarca(marca);

            return "/admin/marcas";

        } catch (Exception ex) {

            System.out.println("Error, try again later");

            return null;
        }
    }

    private String addModelo(HttpServletRequest request) {
        Model model = (Model) request.getAttribute("model");
        Service service = Service.instance();
        HttpSession session = request.getSession(true);

        Usuario usuario = (Usuario) session.getAttribute("usuario");
        try {
            model.setMarcas(service.cargarMarcas() );
            return "/presentation/cliente/modelos/AgregarModelo.jsp";
        } catch (Exception ex) {
            return "";
        }
    }


    private void paso1(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
         // Retrieve form data
        String numeroPlaca = request.getParameter("numeroPlaca");
        String marca = request.getParameter("marca");
        String modelo = request.getParameter("modelo");
        int year = Integer.parseInt(request.getParameter("year"));
        double valorAsegurado = Double.parseDouble(request.getParameter("valorAsegurado"));
        String periodoPago = request.getParameter("periodoPago");
        LocalDate fechaInicio = LocalDate.parse(request.getParameter("fechaInicio"));

        // Do something with the data
        // ...

        // Forward to JSP
            request.getRequestDispatcher("CompraPaso2").forward(request, response);
        
    }

    private void muestraForma(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    Model model = (Model) request.getAttribute("model");
    Service service = Service.instance();
        
    List<Modelo> modelos = service.cargarModelos();
    List<Marca> marcas = service.cargarMarcas();
    
    List<Modelo> marcasYModelos = new ArrayList<>();
    for (Marca marca : marcas) {
        for (Modelo modelo : modelos) {
            if (modelo.getMarca().getDescripcion().equals(marca.getDescripcion())) {
                modelo.setMarca(marca);
                marcasYModelos.add(modelo);
            }
        }
    }

    request.setAttribute("opcionesModelo", marcasYModelos);
    request.setAttribute("opcionesMarca", marcas);
   
    request.getRequestDispatcher("/presentation/cliente/poliza/Compra.jsp").forward(request, response);
}

}
