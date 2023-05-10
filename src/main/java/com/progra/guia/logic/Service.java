/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.progra.guia.logic;

import com.progra.guia.data.CategoriaDao;
import com.progra.guia.data.ClienteDao;
import com.progra.guia.data.CoberturaDao;
import com.progra.guia.data.MarcaDao;
import com.progra.guia.data.ModeloDao;
import com.progra.guia.data.PolizaDao;
import com.progra.guia.data.RelDatabase;
import com.progra.guia.data.UsuarioDao;
import java.sql.SQLException;
import java.util.List;


/*
 *Proyecto I Programacion 4
 * 
 *Jennifer Lobo Vasquez
 *Daniela Madrigal Morales
 *Gerardo Salzar Vargas
 * 
 */


public class Service {

    private static Service uniqueInstance;

    public static Service instance() {
        if (uniqueInstance == null) {
            uniqueInstance = new Service();
        }
        return uniqueInstance;
    }
    RelDatabase relDatabase;
    UsuarioDao usuarioDao;
    ClienteDao clienteDao;
    PolizaDao polizaDao;
    CoberturaDao coberturaDao;
    CategoriaDao categoriaDao;
    ModeloDao modeloDao;
    MarcaDao marcaDao;

    private Service() {
        relDatabase = new RelDatabase();
        usuarioDao = new UsuarioDao(relDatabase);
        clienteDao = new ClienteDao(relDatabase);
        polizaDao = new PolizaDao(relDatabase);
        coberturaDao = new CoberturaDao(relDatabase);
        categoriaDao = new CategoriaDao(relDatabase);
        modeloDao = new ModeloDao(relDatabase);
        marcaDao = new MarcaDao(relDatabase);
    }

    public Usuario usuarioFind(String cedula, String clave) throws Exception {
        Usuario usuario = usuarioDao.read(cedula, clave);
        return usuario;
    }

    public Cliente clienteFind(Usuario usuario) throws Exception {
        return clienteDao.read(usuario.getCedula());
    }

    public List<Poliza> polizaFind(Cliente cliente) throws Exception {
        List<Poliza> polizas = polizaDao.findByCliente(cliente);
        for (Poliza e : polizas) {
            e.setCliente(cliente);
        }
        cliente.setPolizas(polizas);
        return polizas;
    }

    public void clienteUpdate(Cliente cliente) throws Exception {
        clienteDao.update(cliente);
    }

    public void usuarioUpdate(Usuario usuario) throws Exception {
        usuarioDao.update(usuario);
    }

    public List<Poliza> polizaFindPlaca(String numero) throws Exception {
        return polizaDao.findByPlaca(numero);
    }

    public void registerUser(Usuario u) throws Exception {
        usuarioDao.addUser(u);
    }

    public void registerClient(Cliente u) throws Exception {
        clienteDao.addClient(u);
    }

    public Poliza polizaShowById(Integer parameter) throws Exception {

        return polizaDao.read(parameter);

    }

    public List<Cobertura> cargarCoberturas() {
        return coberturaDao.cargarTodo();
    }

    public List<Categoria> cargarCategorias() {
        return categoriaDao.cargarTodo();
    }

    public void agregaCategoria(Categoria categoria) throws Exception {
        this.categoriaDao.addCategoria(categoria);
    }

    public List<Modelo> cargarModelos() {

        return modeloDao.cargarTodo();

    }

    public List<Marca> cargarMarcas() {

        return marcaDao.cargarTodo();

    }

    public Marca cargarMarcaById(Integer id) throws Exception {
        return marcaDao.read(id);
    }

    public Categoria cargarCategoriaById(Integer id) throws Exception {
        return categoriaDao.read(id);
    }

    public void agregaCobertura(Cobertura cobertura) throws Exception {
        this.coberturaDao.addCobertura(cobertura);
    }

    public void deleteCobertura(String id) throws Exception {
        this.coberturaDao.deleteById(id);
    }

    public List<Cliente> cargarClientes() {
        return clienteDao.cargarTodo();
    }

    public List<Poliza> cargarPolizasCliente(String id) throws Exception {
        Cliente cliente = clienteDao.readCliente(id);
        List<Poliza> polizas = polizaDao.findByCliente(cliente);
        for (Poliza e : polizas) {
            e.setCliente(cliente);
        }
        cliente.setPolizas(polizas);
        return polizas;
    }

    public void agregarModelo(Modelo u) throws Exception {
        modeloDao.addModelo(u);
    }

    public void agregarMarca(Marca u) throws Exception {
        marcaDao.addMarca(u);
    }

    public Cobertura cargarCoberturaById(String coverageId) throws Exception {
        Integer value = Integer.parseInt(coverageId);
        return this.coberturaDao.read(value);
    }

    public Modelo cargarModeloById(int modeloId) throws Exception {

        return this.modeloDao.read(modeloId);

    }

    public void agregarPoliza(Poliza poliza) throws SQLException {
        this.polizaDao.addPoliza(poliza);
    }

    public double calcularCostoTotalPoliza(Poliza poliza) {
        double totalCosto = 0.0; //costo total a ser retornado

        int multiplicadorPeriodoPago = 1; // multiplica el costo total de acuerdo a la cantidad de meses en el plazo de la poliza

        double valorCalculado = poliza.getValorAsegurado();  //carga el valor del carro

        List<Cobertura> coberturas = poliza.getCoberturas();  //carga la lista de coberturas de la poliza

        if (poliza.getPlazoPago().equals("trimestral")) {   //actualiza el multiplicador de acuerdo a la cantidad de meses de servicio
            multiplicadorPeriodoPago = 3;
        } else if (poliza.getPlazoPago().equals("semestral")) {
            multiplicadorPeriodoPago = 6;
        } else {
            multiplicadorPeriodoPago = 12;
        }
        for (Cobertura cobertura : coberturas) {
            double costo = valorCalculado < 3000 ? cobertura.getCostoMinimo() : valorCalculado * cobertura.getCostoPorcentual(); // setea costo de acuerdo si el carro vale menos de 
            totalCosto += costo;                                                                                                                                             // 3000, retorna el costo minimo de la cobertura, sino, el costo porcentual sobre el carro
        }
        totalCosto *= multiplicadorPeriodoPago; //actualiza el pago por el numero de meses de servicio
        if (poliza.getPlazoPago().equals("semestral")) {
            totalCosto *= 0.95; // aplicar 5% de descuento para semestral
        } else if (poliza.getPlazoPago().equals("anual")) {
            totalCosto *= 0.9; // aplicar 10% de descuento para anual
        }
        return totalCosto;
    }
}
