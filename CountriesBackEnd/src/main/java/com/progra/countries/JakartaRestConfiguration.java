package com.progra.countries;

import com.progra.countries.resources.Countries;
import com.progra.countries.resources.Usuarios;
import jakarta.ws.rs.ApplicationPath;
import jakarta.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;

/**
 * Configures Jakarta RESTful Web Services for the application.
 * @author Juneau
 */
@ApplicationPath("api")
public class JakartaRestConfiguration extends Application {
    @Override
    public Set<Class<?>> getClasses() {
        HashSet<Class<?>> classes = new HashSet<>();
        classes.add(Countries.class); 
        classes.add(Usuarios.class);
        return classes;
    }      
}
