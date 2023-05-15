package com.progra.countries.resources;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.ResultSet;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

@Path("/users")
public class UserResource {

   private Connection getConnection() throws SQLException {
       String url = "jdbc:mysql://localhost:3306/guia";
       String username = "root";
       String password = "root";
       
       return DriverManager.getConnection(url, username, password);
   }

   @GET
   public Response getAllUsers() {
       try (Connection conn = getConnection();
            Statement stmt = conn.createStatement()) {

           String sql = "SELECT * FROM users";
           ResultSet rs = stmt.executeQuery(sql);

           // Process the result set and build the response
           StringBuilder responseData = new StringBuilder();
           while (rs.next()) {
               String userId = rs.getString("user_id");
               String username = rs.getString("username");
               // Add more fields as needed

               // Append the data to the response
               responseData.append("User ID: ").append(userId).append(", ");
               responseData.append("Username: ").append(username).append("\n");
           }

           return Response.ok().entity(responseData.toString()).build();
       } catch (SQLException e) {
           e.printStackTrace();
           return Response.serverError().build();
       }
   }
}
