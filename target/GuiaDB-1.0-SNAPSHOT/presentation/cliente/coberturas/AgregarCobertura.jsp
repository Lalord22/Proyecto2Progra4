
<%@page import="com.progra.guia.presentation.categorias.Model"%>
<%@page import="com.progra.guia.logic.Categoria"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>


<%
    Model model = (Model) request.getAttribute("model");
    List<Categoria> categoriasList = model.getCategorias();
    
%>
<!DOCTYPE html>
<html>
    <head>
        <%@ include file="/presentation/Head.jsp" %>
    </head>
    <body>
        <%@ include file="/presentation/Header.jsp" %>
        <div style="margin-bottom: 20px; padding-bottom: 150px">
            <div class="panel">
            <form action="presentation/admin/agregaCobertura" method="POST" class="container-form">
                <div class="panel" style="width:35%;">
                    <div class="fila encabezado">Agregar Cobertura</div>
                    <div class="fila"> 
                        <label for="descripcion">Descripción:</label>
                        <input type="text" id="descripcion" name="descripcion" required><br><br>
                    </div>  
                    <div class="fila">  
                        <label for="descripcion">Costo Mínimo:</label>
                        <input type="text" id="minimo" name="minimo" required><br><br>
                    </div>  
                    <div class="fila">  
                        <label for="descripcion">Costo Porcentual:</label>
                        <input type="text" id="porcentual" name="porcentual" required><br><br>
                    </div>  
                    <div class="fila">  
                        <label for="categoria">Categoría:</label>
                        <select id="categoria" name="categoria">
                            <% 
                             for(Categoria categoria : categoriasList) {
                            %>
                            <option value="<%= categoria.getId() %>"><%= categoria.getDescripcion() %></option>
                            <%
                        }
                            %>
                        </select><br><br>
                    </div>     
                    <div class="fila encabezado">
                        <%--<button type="submit">Agregar Cobertura</button>--%>
                        <div class="fila encabezado"><button type="submit" style="padding: 10px; font-size: 16px; border-radius: 5px; border: none; background-color: #007bff; color: #fff; cursor: pointer;">Comprar</button> </div>
                    </div>

                </div>
            </form>
        </div>
</div>

        <%@ include file="/presentation/Footer.jsp" %>
    </body>
</html>
