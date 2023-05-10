
<%@page import="com.progra.guia.presentation.coberturas.Model"%>
<%@page import="com.progra.guia.logic.Cobertura"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
Model model = (Model) request.getAttribute("model");
List<Cobertura> coberturaList = model.getCoberturas();
String numeroPlaca = request.getParameter("numeroPlaca");
String marca = request.getParameter("marca");
String modelo = request.getParameter("modelo");
int year = Integer.parseInt(request.getParameter("year"));
double valorAsegurado = Double.parseDouble(request.getParameter("valorAsegurado"));
String periodoPago = request.getParameter("periodoPago");
String fechaInicio = request.getParameter("fechaInicio");
%>

<!DOCTYPE html>
<html>
<head>
    <%@ include file="/presentation/Head.jsp" %>
    <meta charset="UTF-8">
    <title>Select Coverage</title>
</head>
<body>
    <%@ include file="/presentation/Header.jsp" %>
    <form action="CompraPolizaPaso3" method="POST">
        <div class="panel">
        <h1>Selecione Cobertura:</h1>
        <input type="hidden" name="numeroPlaca" value="<%=numeroPlaca%>">
        <input type="hidden" name="marca" value="<%=marca%>">
        <input type="hidden" name="modelo" value="<%=modelo%>">
        <input type="hidden" name="year" value="<%=year%>">
        <input type="hidden" name="valorAsegurado" value="<%=valorAsegurado%>">
        <input type="hidden" name="periodoPago" value="<%=periodoPago%>">
        <input type="hidden" name="fechaInicio" value="<%=fechaInicio%>">
        <% for (Cobertura cobertura : coberturaList) { %>
            <input type="checkbox" name="coverage" value="<%= cobertura.getId() %>"> <%= cobertura.getDescripcion() %> <br>
        <% } %>
        <div style="padding-top: 50px;">
        <input class="search-button" type="submit" value="Submit">
         </div>

    </form>
        </div>
    <%@ include file="/presentation/Footer.jsp" %>
</body>
</html>
