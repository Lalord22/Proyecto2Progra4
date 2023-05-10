<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
 <%@ include file="/presentation/Head.jsp" %>
 <title>Principal</title> 
</head>
<body>
  <%@ include file="/presentation/Header.jsp" %>
  
  <div class="container">
    <div class="left-half">
     
      <div class="mission">
        <h2>Misión</h2>
        <p>Ofrecer a nuestros clientes una amplia gama de seguros para sus vehículos en Costa Rica, brindando un servicio de calidad y personalizado, para garantizar su tranquilidad y protección ante cualquier eventualidad.</p>
        <h2>Visión</h2>
        <p>Ser reconocidos como la mejor empresa de venta de seguros para vehículos en Costa Rica, a través de la mejora continua en nuestros servicios, la innovación en nuestra oferta y el compromiso con nuestros clientes, para ser su mejor opción en protección y tranquilidad en la carretera.</p>
      </div>
    </div>

    <div class="localImage">
      <img src="images/local.jpeg" alt="JEGEDA Insurance Company Office">
    </div>
      <div class="center" style="">
          <div class="contact">
              <p class="logoIndex">
                  <img src="images\whatsapp-logo.png"><span class="spanLetra"> (+506) 8956-7890</span> 
                  <img src="images/logoCorreo.png"><span class="spanLetra"> info@jegeda.com</span></p>
          </div>
      </div>
  </div>
  
  <%@ include file="/presentation/Footer.jsp" %>
</body>
</html>