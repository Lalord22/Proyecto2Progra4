
<%@page import="com.progra.guia.logic.Modelo"%><%@page import="com.progra.guia.logic.Marca"%>
<%@page import="com.progra.guia.presentation.modelos.Model"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="com.progra.guia.logic.Cobertura"%>
<%@ page import="java.util.Comparator" %>
<%@page import="java.util.Collections"%>

<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>

<%
List<Modelo> modelos = (List<Modelo>) request.getAttribute("opcionesModelo");
List<Marca> marcas = (List<Marca>) request.getAttribute("opcionesMarca");

// sort the modelos by marca
Collections.sort(modelos, new Comparator<Modelo>() {
    @Override
    public int compare(Modelo m1, Modelo m2) {
        return m1.getMarca().getDescripcion().compareTo(m2.getMarca().getDescripcion());
    }
});
%>

<!DOCTYPE html>
<html>
    <head>
        <%@ include file="/presentation/Head.jsp" %>
        <meta charset="UTF-8">
    </head>
    <body>
        <%@ include file="/presentation/Header.jsp" %>
        <div style="margin-bottom: 20px;">
        <form action="ComprarPoliza" method="POST" class="container-form">
                <div class="panel" style="width:35%;">
                    <div class="fila encabezado">Compra de Póliza</div>
                    <div class="fila">
                        <label for="numeroPlaca">Placa:</label>
                        <input type="text" id="numeroPlaca" name="numeroPlaca" required>
                    </div>
                    
                    <div class="fila">
    <label for="modelo">Modelo:</label>
    <select id="modelo" name="modelo" required>
        <% 
        // display the sorted modelos in the combobox
        String currentMarca = "";
        for (Modelo modelo : modelos) {
            if (!currentMarca.equals(modelo.getMarca().getDescripcion())) {
        %>
            <optgroup label="<%= modelo.getMarca().getDescripcion() %>"></optgroup>
        <%      
                currentMarca = modelo.getMarca().getDescripcion();
            }
        %>
        <option value="<%= modelo.getId() %>"><%= modelo.getDescripcion() %></option>
        <% } %>
    </select>
</div>


                    <div class="fila">
                        <label for="year">Año de Fabricación:</label>
                        <input type="number" id="year" name="year" required>
                    </div>
                    <div class="fila">
                        <label for="valorAsegurado">Valor Asegurado:</label>
                        <input type="number" id="valorAsegurado" name="valorAsegurado" required>
                    </div>
                    <div class="fila">
                        <label for="periodoPago">Período de Pago:</label>
                        <select id="periodoPago" name="periodoPago">
                            <option value="trimestral">Trimestral</option>
                            <option value="semestral">Semestral</option>
                            <option value="anual">Anual</option>
                        </select>
                    </div>
                    <div class="fila">
                        <label for="fechaInicio">Fecha de Inicio:</label>
                        <input type="date" id="fechaInicio" name="fechaInicio" required>
                    </div>
                    <div class="fila encabezado">
                        <div class="fila encabezado"><button type="submit" style="padding: 10px; font-size: 16px; border-radius: 5px; border: none; background-color: #007bff; color: #fff; cursor: pointer;">Comprar</button> </div>
                    </div>
                </div>
            </form>
        </div>

        <%@ include file="/presentation/Footer.jsp" %>
    </body>
</html>
