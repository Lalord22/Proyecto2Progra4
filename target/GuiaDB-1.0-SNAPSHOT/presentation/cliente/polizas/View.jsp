<%@page import="com.progra.guia.logic.Modelo"%>
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
        <title>Pólizas</title> 
    </head>
    <body >
        <%@ include file="/presentation/Header.jsp" %>



        <form action="presentation/cliente/polizas/search" method="post">
            <div  style="margin-right: 10px;" class="search-container">
                <label for="placa"> Placa: </label>
                <input type="text" id="placa" name="placa" placeholder="Placa" required>
                <input type="hidden" name="accion" value="buscar">
                <input type="submit" value="Buscar" class="submit">

            </div>
        </form>

        <div style="width:90%;margin: 0 auto;">
            <div style="display: inline-flex;">
                <p class="misPolizas" style="margin-right: 10px;">Mis pólizas</p>
                <a href="iniciarCompra" class="logoIndex"><img src="images/mas.png" style="padding-left: 10px;"></a>
            </div>

            <table style="width: 100%; font-size: 14px; letter-spacing: 0.5px;">
                <thead>
                    <tr>
                        <th style="width: 15%; text-align: center; border-bottom: 1px solid black;">Número</th>
                        <th style="width: 20%; text-align: center; border-bottom: 1px solid black;">Placa</th>
                        <th style="width: 30%; text-align: center; border-bottom: 1px solid black;">Fecha </th>
                        <th style="width: 25%; text-align: center; border-bottom: 1px solid black;">Auto </th>
                        <th style="width: 20%; text-align: center; border-bottom: 1px solid black;"> Valor </th>
                    </tr>
                </thead>
                <tbody>
                    <% for(Poliza p : polizas) { %>
                    <tr>
                        <td style="width: 15%; text-align: center;"><%=p.getId()%></td>

                        <td style="width: 20%; text-align: center;"><a href="presentation/cliente/poliza/show?numeroFld=<%=p.getId()%>"><%=p.getNumeroPlaca()%></a></td>  
                        <td style="width: 30%; text-align: center;"><%=p.getFechaInicio()%></td>

                        <th style="width: 25%; text-align: center;"><%= p.getModelo().getDescripcion()%> <%=p.getModelo().getMarca().getDescripcion() %></th>

                        <td style="width: 20%; text-align: center;"><%=p.getValorAsegurado()%></td>

                    </tr>
                    <% } %>
                </tbody>
            </table>          
        </div>  
        <%@ include file="/presentation/Footer.jsp" %>
    </body>
</html>








