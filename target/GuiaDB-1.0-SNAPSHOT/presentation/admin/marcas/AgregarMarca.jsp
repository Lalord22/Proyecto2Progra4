
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <%@ include file="/presentation/Head.jsp" %>
    </head>
    <body>
        <%@ include file="/presentation/Header.jsp" %>
        <div style="margin-bottom: 20px;">
            <form action="admin/addMarca" method="POST">
                <div class="panel" style="width:35%;">
                    <div class="fila encabezado">Agregar Marca</div>
                    <div class="fila">
                        <label for="descripcion">Descripción:</label>
                        <input type="text" id="descripcion" name="descripcion" required><br><br>
                    </div>

                    <div class="fila encabezado">
                        <%-- <button type="submit">Agregar</button> --%>
                        <div class="fila encabezado"><button type="submit" style="padding: 10px; font-size: 16px; border-radius: 5px; border: none; background-color: #007bff; color: #fff; cursor: pointer;">Agregar</button> </div>
                    </div>
            </form>
        </div>
        <%@ include file="/presentation/Footer.jsp" %>
    </body>
</html>
