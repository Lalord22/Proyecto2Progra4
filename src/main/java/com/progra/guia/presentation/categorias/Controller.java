/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package com.progra.guia.presentation.categorias;

import com.progra.guia.logic.Categoria;
import com.progra.guia.logic.Cliente;
import com.progra.guia.logic.Service;
import com.progra.guia.logic.Usuario;
import com.progra.guia.logic.Service;
import com.progra.guia.logic.Usuario;
import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.PrintWriter;


@WebServlet(name = "ControllerCategoria", urlPatterns = {
    "/admin/categorias",
    "/admin/addCategoria",
    "/presentation/cliente/agregacobertura"})
public class Controller extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");

        request.setAttribute("model", new Model());
        String viewUrl = "";

        switch (request.getServletPath()) {
            case "/admin/categorias":
                viewUrl = this.show(request);
                break;
            case "/admin/addCategoria":
                viewUrl = this.add(request);
                break;
            case  "/presentation/cliente/agregacobertura":
                viewUrl = this.addCobertura(request);
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
            model.setCategorias(service.cargarCategorias());
            return "/presentation/admin/categorias/View.jsp";
        } catch (Exception ex) {
            return "";
        }

    }

    private String add(HttpServletRequest request) {
        request.setAttribute("model", new Model());
        Service service = Service.instance();

        String descripcion = request.getParameter("descripcion");

        Categoria cate = new Categoria(0, "");
        cate.setDescripcion(descripcion);

        try {
            service.agregaCategoria(cate);

            return "/admin/categorias";

        } catch (Exception ex) {

            System.out.println("Error, try again later");

            return null;
        }
    }

    private String addCobertura(HttpServletRequest request) {
        Model model = (Model) request.getAttribute("model");
        Service service = Service.instance();
        HttpSession session = request.getSession(true);

        Usuario usuario = (Usuario) session.getAttribute("usuario");
        try {
            model.setCategorias(service.cargarCategorias());
            return "/presentation/cliente/coberturas/AgregarCobertura.jsp";
        } catch (Exception ex) {
            return "";
        }
    }

}
