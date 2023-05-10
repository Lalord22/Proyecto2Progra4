<%@page import="com.progra.guia.presentation.coberturas.Model"%>
<%@page import="com.progra.guia.logic.Cobertura"%>
<%@page import="com.progra.guia.logic.Poliza"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    double costo =0.0;
Poliza poliza = (Poliza) request.getAttribute("poliza");
List<Cobertura> coberturas = (List<Cobertura>) request.getAttribute("coberturas");
session.setAttribute("poliza", poliza);
double totalCosto = (double) request.getAttribute("totalCosto");
%>

<!DOCTYPE html>
<html>
    <head>
        <%@ include file="/presentation/Head.jsp" %>
        <meta charset="UTF-8">
        <title>Resumen de Compra</title>
    </head>
    <body>
        <%@ include file="/presentation/Header.jsp" %>
        <div style="padding-bottom: 150px;">
        <div class="panel">
        <h1>Resumen de Compra</h1>
        <p>Número de placa: <%=poliza.getNumeroPlaca()%></p>
        <p>Marca: <%=poliza.getModelo().getMarca().getDescripcion()%></p>
        <p>Modelo: <%=poliza.getModelo().getDescripcion()%></p>
        <p>Año: <%=poliza.getAnno()%></p>
        <p>Valor asegurado: <%=poliza.getValorAsegurado()%></p>
        <p>Período de pago: <%=poliza.getPlazoPago()%></p>
        <p>Fecha de inicio: <%=poliza.getFechaInicio()%></p>
        <p>Coberturas seleccionadas:</p>
        <table>
            <thead>
                <tr>
                    <th>Descripción</th>
                    <th>Categoría</th>
                    <th>Costo</th>
                     
                            </tr>
        </thead>
        <tbody>
           <% 
   for (Cobertura cobertura : coberturas) { 
        costo = poliza.getValorAsegurado() < 300 ? cobertura.getCostoMinimo() : cobertura.getCostoPorcentual();
       totalCosto += costo;
%>
       <tr>
           <td><%=cobertura.getDescripcion()%></td>
           <td><%=cobertura.getCategoria().getDescripcion()%></td>
           <td><%=costo%></td>
       </tr>
<% } %>


<tfoot>
    <tr>
        <td colspan="2"><strong>Total Costo:</strong></td>
        <td><%=totalCosto%></td>
    </tr>
</tfoot>
        </tbody>
    </table>
      
    <form  style="padding-top: 50px;" action="compraFinalizada" method="POST">
    
        

        <input class="search-button" type="submit" value="Confirmar Compra">
    </form>
    </div>

    </div>
    <%@ include file="/presentation/Footer.jsp" %>
    </body>

</html>
