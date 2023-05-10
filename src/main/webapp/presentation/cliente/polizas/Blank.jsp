
<%@page import="com.progra.guia.logic.Poliza"%>
<%@page import="com.progra.guia.presentation.cliente.polizas.Model"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>

<%
    Model model = (Model) request.getAttribute("model");
    List<Poliza> polizas = model.getPolizas();
%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
 <%@ include file="/presentation/Head.jsp" %>
 <title>Polizas</title> 
</head>
<body >
    <%@ include file="/presentation/Header.jsp" %>

    <form action="presentation/cliente/polizas/search" method="post">
    <div class="search-container">
        <label for="placa">Placa: </label>
        <input type="text" id="placa" name="placa" placeholder="Placa" style="text-align: center" required>
        <input type="hidden" name="accion" value="buscar">
        <input type="submit" value="Buscar" class="submit">
    </div>
</form>
    
    
    <form action="presentation/cliente/polizas/show">
        
       <button class="search-buttonPoliza" >Mis pólizas</button>
       
    </form>
    
     <%@ include file="/presentation/Footer.jsp" %>
</body>
</html>








