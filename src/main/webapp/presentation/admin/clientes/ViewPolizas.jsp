
<%@page import="com.progra.guia.presentation.clientes.Model"%>
<%@page import="com.progra.guia.logic.Poliza"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>


<%
    Model model = (Model) request.getAttribute("model");
    List<Poliza> polizaList = model.getPolizas();
    
%>


<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>    
        <%@ include file="/presentation/Head.jsp" %>

        <title>Polizas de Cliente</title>
    </head>
    <body>
        <%@ include file="/presentation/Header.jsp" %>
        <h1>Polizas de Cliente</h1>

        <table>
            <tr>
                <th>Número de Póliza</th>
                <th>Número de Placa</th> 
                <th>Año</th>
                <th>Valor Asegurado</th>
                <th>Fecha de Inicio</th>
            </tr>
            <% for(Poliza poliza : polizaList) { %>
            <tr>
                <td><%=poliza.getId()%></td>
                <td><%=poliza.getNumeroPlaca()%></td>
                <td><%=poliza.getAnno()%></td>
                <td><%=poliza.getValorAsegurado()%></td>
                <td><%=poliza.getFechaInicio()%></td>
            </tr>
            <% } %>
        </table>

        <%@ include file="/presentation/Footer.jsp" %>
    </body>
</html> 
