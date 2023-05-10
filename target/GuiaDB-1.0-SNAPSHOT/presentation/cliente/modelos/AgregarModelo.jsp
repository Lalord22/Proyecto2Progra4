
<%@page import="com.progra.guia.presentation.marcas.Model"%>
<%@page import="com.progra.guia.logic.Marca"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>


<%
    Model model = (Model) request.getAttribute("model");
    List<Marca> marcasList = model.getMarcas();
    
%>
<!DOCTYPE html>
<html>
    <head>
        <%@ include file="/presentation/Head.jsp" %>
    </head>
    <body>
        <%@ include file="/presentation/Header.jsp" %>
        <div style="margin-bottom: 20px;">
<form action="presentation/admin/agregaModelo" <%/*enctype="multipart/form-data"*/%> method="POST">
                <div class="panel" style="width:35%;">
                    <div class="fila encabezado">Agregar Modelo</div>
                    
                    <div class="fila">
                        <label for="descripcion">Descripcion</label>
                        <input type="text" id="descripcion" name="descripcion" required><br><br>
                    </div>  

                    <div class="fila">
                        <label for="marca">Marca</label>
                        <select id="marca" name="marca">
                            <% 
                             for(Marca marca: marcasList) {
                            %>
                            <option value="<%= marca.getId() %>"><%= marca.getDescripcion() %></option>
                            <%
                                }
                            %>
                        </select><br><br>
                    </div> 

                    <%-- Para cargar la imagen
                    <div class="fila">
                        <label for="imagen">Imagen NoFunciona</label>
                        <input type="file" id="imagen" name="imagen"><br><br>
                    </div>
                    --%>        
  
                    <div class="fila encabezado">
                        <%-- <button type="submit">Agregar Modelo</button> --%>
                        <div class="fila encabezado"><button type="submit" style="padding: 10px; font-size: 16px; border-radius: 5px; border: none; background-color: #007bff; color: #fff; cursor: pointer;">Agregar</button> </div>
                    </div>
            </form>
        </div>
         <%@ include file="/presentation/Footer.jsp" %>
    </body>
</html>

