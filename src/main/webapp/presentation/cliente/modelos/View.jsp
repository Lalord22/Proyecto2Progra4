
<%@page import="com.progra.guia.presentation.modelos.Model"%>
<%@page import="com.progra.guia.logic.Modelo"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>


<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%
    Model model = (Model) request.getAttribute("model");
    List<Modelo> modeloList = model.getModelos();
    
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
                <p class="misPolizas" style="margin-right: 10px;">Lista de modelos</p>
                <a href="presentation/cliente/agregamodelo" class="logoIndex"><img src="images/mas.png" style="padding-left: 10px;"></a>
            </div>
            <table>
                <thead>
                    <tr>
                        <th style="width: 15%; text-align: center; border-bottom: 1px solid black;">Id</th>
                        <th style="width: 20%; text-align: center; border-bottom: 1px solid black;">Descripción</th>
                        <%-- <th style="width: 20%; text-align: center; border-bottom: 1px solid black;">Imagen</th> --%>
                    </tr>
                </thead>
                <tbody>
                    <% for(Modelo modelos : modeloList) { %>
                    <tr> 
                        <td style="width: 15%; text-align: center;"><%=modelos.getId()%></td>
                        <td style="width: 20%; text-align: center;"><%=modelos.getDescripcion()%> - <%=modelos.getMarca().getDescripcion()%></td>
                        <%-- <td style="width: 20%; text-align: center;"><img src="images/<%=modelos.getId()%>.png"></td> --%>
                    </tr>
                    <% } %>
                </tbody>
            </table>
        </div>
        <%@ include file="/presentation/Footer.jsp" %>
    </body>
</html>
