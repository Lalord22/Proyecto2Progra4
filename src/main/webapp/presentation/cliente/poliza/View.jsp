<%@page import="com.progra.guia.logic.Poliza"%>
<%@page import="com.progra.guia.presentation.cliente.Poliza.Model"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>


    <%Model model = (Model) request.getAttribute("model");%>
    <%Poliza poliza = model.getCurrent();%>


<!DOCTYPE html>
<html>
<head>
                <%@ include file="/presentation/Head.jsp" %>
	<meta charset="UTF-8">
	<title>Póliza</title>
</head>
<body>
                <%@ include file="/presentation/Header.jsp" %>
	<h1>Póliza</h1>
	<table>
		<tr>
			<th>Número</th>
			<td><%=poliza.getNumeroPlaca()%></td>
		</tr>
		<tr>
			<th>Valor Asegurado</th>
			<td><%=poliza.getValorAsegurado()%></td>
		</tr>
		<tr>
			<th>Cliente</th>
			<td><%=poliza.getCliente().getNombre()%></td>
		</tr>
		<tr>
			<th>Modelo</th>
			<td><%=poliza.getModelo().getDescripcion()%></td>
		</tr>
		<tr>
			<th>Fecha Inicio</th>
			<td><%=poliza.getFechaInicio()%></td>
		</tr>
	
	</table>
                
        <%@ include file="/presentation/Footer.jsp" %>        
</body>
</html>
