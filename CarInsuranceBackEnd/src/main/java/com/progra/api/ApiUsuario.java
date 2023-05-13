package com.progra.api;

import com.progra.countries.logic.Usuario;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author lalo2
 */
@Path("/api/usuarios")
public class ApiUsuario {

    /**
     *
     * @return
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Usuario> getUsers() {
        List<Usuario> userList = new ArrayList<>();

        // Database connection parameters
        String url = "jdbc:mysql://localhost:3306/Guia";
        String username = "root";
        String password = "root";

        try (Connection connection = DriverManager.getConnection(url, username, password)) {
            String query = "SELECT * FROM usuarios";
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery(query);

            while (resultSet.next()) {
                String cedula = resultSet.getString("cedula");
                String nombre = resultSet.getString("nombre");
                // Retrieve other user attributes as needed

                Usuario usuario = new Usuario(cedula, nombre);
                userList.add(usuario);
            }
        } catch (SQLException e) {
        }

        return userList;
    }
}
