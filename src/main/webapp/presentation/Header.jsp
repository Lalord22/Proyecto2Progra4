<%@page import="com.progra.guia.logic.Usuario"%>
<% Usuario usuario=  (Usuario) session.getAttribute("usuario");  %>

<header>
    <div class="logo">
        <a href="presentation/Index.jsp"><img class="imglogo" src="images/logo.png"></a>
        <div class="agregar" style="width: 70%;" >
            <ul style="width: 110%;"> 
                <li>
                    <a href="presentation/Index.jsp">Inicio</a>
                </li>
                <% if (usuario!=null){ %>                     
                    <li >
                        <a  href="presentation/cliente/datos/show">User:<%=usuario.getCedula()%></a>
                        <ul>  <!--submenu --> </ul>
                    </li> 

                        <% if(usuario.getTipo()== 1){%>
                        <li>
                            <a href="presentation/cliente/polizas/blank">Polizas</a>
                            <ul>  <!--submenu --> </ul>
                        </li>                                
                        <%}%>

                        <% if(usuario.getTipo()== 2){%>
                        <li style="padding-left: 25px;padding-right: 20px;">
                            <a  href="presentation/cliente/polizas/Administrar.jsp">Administrar</a>                                       
                        </li>                        
                        
                        <%}%>


                    <li class="logout" style="display: inline-block;">
                        <a  href="presentation/login/logout" >Logout</a>
                    </li>                
                <% } %>
                
                <% if (usuario==null){%>
                    <li>
                        <a href="presentation/login/show">Login</a>
                    </li>
                <% }%>             
            </ul>
        </div>
    </div> 
            
            
    <% if (usuario!=null){ %>       
    <% if(usuario.getTipo()== 2){%>
    <nav>
        <ul class="nav">
           <%/* <li style="padding-top: 20px; color: #333;">
                 Menu de Listas
                <ul class="submenu">
                    <li><a href="presentation/cliente/coberturas">Coberturas</a></li>
                    <li><a href="admin/categorias">Categorias</a></li>
                    <li><a href="admin/marcas">Marcas</a></li>
                    <li><a href="presentation/cliente/modelos">Modelos</a></li>
                    <li><a href="presentation/clientes/show">Clientes</a></li>
                </ul>
            </li> */%>
            <li style="padding-top: 20px; color: #333; margin-right: 465px">
                    <li><a href="admin/categorias">Categorías</a></li>

            <li style="padding-top: 20px; color: #333;">
                    <li><a href="presentation/cliente/coberturas">Coberturas</a></li>
           
            <li style="padding-top: 20px; color: #333;">
                    <li><a href="admin/marcas">Marcas</a></li>
           
            <li style="padding-top: 20px; color: #333;">
                    <li><a href="presentation/cliente/modelos">Modelos</a></li>
         
            <li style="padding-top: 20px; color: #333;">
                    <li><a href="presentation/clientes/show">Clientes</a></li>
           
        </ul>     
    </nav>
    <%}%>
    <%}%>
</header>          

