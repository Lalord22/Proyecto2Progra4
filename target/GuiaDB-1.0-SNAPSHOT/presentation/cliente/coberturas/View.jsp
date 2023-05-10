
<%@page import="com.progra.guia.presentation.coberturas.Model"%>
<%@page import="com.progra.guia.logic.Cobertura"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>


<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%
    Model model = (Model) request.getAttribute("model");
    List<Cobertura> coberturasList = model.getCoberturas();
    
%>


<!DOCTYPE html>
<html>
    <head>    
        <%@ include file="/presentation/Head.jsp" %>
    </head>
    <body>
        <%@ include file="/presentation/Header.jsp" %>
<div style="width:90%;margin: 0 auto; padding-bottom: 150px"> 
            <div style="display: inline-flex;">
                <p class="misPolizas" style="margin-right: 10px;">Lista de coberturas</p>
                <a href="presentation/cliente/agregacobertura" class="logoIndex"><img src="images/mas.png" style="padding-left: 10px;"></a>
            </div>

    <table>
        <thead>
            <tr>
                <th style="width: 15%; text-align: center; border-bottom: 1px solid black;">Id</th>
                <th style="width: 20%; text-align: center; border-bottom: 1px solid black;">Descripción</th>
                <th style="width: 15%; text-align: center; border-bottom: 1px solid black;">Precio Mínimo</th>
                <th style="width: 10%; text-align: center; border-bottom: 1px solid black;">Precio Porcentual</th>

            </tr>
        </thead>
        <tbody>
            <% for(Cobertura cobertura : coberturasList) { %>
            <tr>
                <td style="width: 15%; text-align: center; border-bottom: 1px solid black;"><%=cobertura.getId()%></td>
                <td style="width: 20%; text-align: center; border-bottom: 1px solid black;"><%=cobertura.getDescripcion()%></td>
                <td style="width: 15%; text-align: center; border-bottom: 1px solid black;"><%=cobertura.getCostoMinimo()%></td>
                <td style="width: 10%; text-align: center; border-bottom: 1px solid black;"><%=cobertura.getCostoPorcentual()%></td>
            </tr>
            <% } %>
        </tbody>
    </table>
</div>
    <%@ include file="/presentation/Footer.jsp" %>
</body>
</html>

