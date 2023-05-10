package com.progra.guia.registration;

import com.progra.guia.logic.Cliente;
import com.progra.guia.logic.Service;
import com.progra.guia.logic.Usuario;
import com.progra.guia.presentation.login.Model;
import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

@WebServlet(name = "RegistrationController", urlPatterns = {"/presentation/login/register"})
public class Controller extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        String viewUrl="";
        
        viewUrl=this.registerUser(request);
        
        request.getRequestDispatcher(viewUrl).forward( request, response); 

        
    }
    
    private String registerUser(HttpServletRequest request){
    request.setAttribute("model", new Model());
        Service service = Service.instance();
       
        String username = request.getParameter("id");
        String password = request.getParameter("password");
        String name = request.getParameter("name");
        String telephone = request.getParameter("telephone");
        String email = request.getParameter("email");
        String creditCard = request.getParameter("creditcard");
        
        
        
        Usuario usuario = new Usuario();
        usuario.setCedula(username);
        usuario.setClave(password);
        usuario.setTipo(1);
        
        Cliente cliente = new Cliente();
        cliente.setCedula(username);
        cliente.setNombre(name);
        cliente.setTelefono(telephone);
        cliente.setCorreo(email);
        cliente.setDatosTarjeta(creditCard);
        cliente.setUsuario(usuario);
        
        try {
            service.registerUser(usuario);
            
            service.registerClient(cliente);
            
            return "/presentation/registration/registrationSuccess.jsp";
            
        } catch (Exception ex) {
            Logger.getLogger(Controller.class.getName()).log(Level.SEVERE, null, ex);
            
            System.out.println("Error, try again later");
            
            return null;
        }
        
    }
    
     
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }
}
