
<%@page import="com.progra.guia.presentation.categorias.Model"%>
<%@page import="com.progra.guia.logic.Categoria"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>


<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%
    Model model = (Model) request.getAttribute("model");
    List<Categoria> categoriasList = model.getCategorias();
    
%>


<!DOCTYPE html>
<html>
    <head>    
        <%@ include file="/presentation/Head.jsp" %>

        <title>Administrator Page</title>
    </head>
    <body>
        <%@ include file="/presentation/Header.jsp" %>

        <div style="width:90%;margin: 0 auto;">
            <div style="display: inline-flex;">
                <p class="misPolizas" style="margin-right: 10px;">Lista de categorías</p>
                <a href="presentation/admin/categorias/AgregarCategoria.jsp" class="logoIndex"><img src="images/mas.png" style="padding-left: 10px;"></a>
            </div>
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr>
                        <th style="width: 15%; text-align: center; border: 1px solid black;">Id</th>
                        <th style="width: 20%; text-align: center; border: 1px solid black;">Categoría</th>
                    </tr>
                </thead>
                <tbody>
                    <% for(Categoria categoria : categoriasList) { %>
                    <tr>
                        <td style="width: 15%; text-align: center; border: 1px solid black;"><%=categoria.getId()%></td>
                        <td style="width: 20%; text-align: center; border: 1px solid black;"><%=categoria.getDescripcion()%></td>
                    </tr>
                    <% } %>
                </tbody>
            </table>
        </div>

        <%@ include file="/presentation/Footer.jsp" %>
    </body>
</html>
