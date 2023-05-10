
<%@page import="com.progra.guia.presentation.marcas.Model"%>
<%@page import="com.progra.guia.logic.Marca"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>


<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%
    Model model = (Model) request.getAttribute("model");
    List<Marca> marcaList = model.getMarcas();
    
%>

<!DOCTYPE html>
<html>
    <head>    
        <%@ include file="/presentation/Head.jsp" %>
    </head>
    <body>
        <%@ include file="/presentation/Header.jsp" %>
        <div style="width:90%;margin: 0 auto;"> 
            <div style="display: inline-flex;">
                <p class="misPolizas" style="margin-right: 10px;">Lista de marcas</p>
                <a href="presentation/admin/marcas/AgregarMarca.jsp" class="logoIndex"><img src="images/mas.png" style="padding-left: 10px;"></a>
            </div>
            <table>
                <thead>
                    <tr>
                        <th style="width: 15%; text-align: center; border-bottom: 1px solid black;">Id</th>
                        <th style="width: 20%; text-align: center; border-bottom: 1px solid black;">Descripción</th>
                    </tr>
                </thead>
                <tbody>
                    <% for(Marca marcas : marcaList) { %>
                    <tr>
                        <td style="width: 15%; text-align: center;"><%=marcas.getId()%></td>
                        <td style="width: 20%; text-align: center;"><%=marcas.getDescripcion()%></td>
                    </tr>
                    <% } %>
                </tbody>
            </table> 
        </div>
            <%@ include file="/presentation/Footer.jsp" %>
    </body>
</html>