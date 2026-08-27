package com.barberia.repository;

import com.barberia.config.Conexion;
import com.barberia.model.Cliente;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ClienteRepository {

    // INSERTAR CLIENTE
    public boolean insertar(Cliente cliente) {

        String sql = "INSERT INTO cliente " +
                "(nom_cli, ape_cli, tel_cli, correo, contra_cli) " +
                "VALUES (?, ?, ?, ?, ?)";

        try (Connection conexion = Conexion.obtenerConexion();
            PreparedStatement sentencia = conexion.prepareStatement(sql)) {

            sentencia.setString(1, cliente.getNomCli());
            sentencia.setString(2, cliente.getApeCli());
            sentencia.setString(3, cliente.getTelCli());
            sentencia.setString(4, cliente.getCorreo());
            sentencia.setString(5, cliente.getContraCli());

            int filasAfectadas = sentencia.executeUpdate();

            return filasAfectadas > 0;

        } catch (SQLException e) {
            System.out.println("Error al insertar cliente: " + e.getMessage());
            return false;
        }
    }

    // CONSULTAR TODOS LOS CLIENTES
    public List<Cliente> consultarTodos() {

        List<Cliente> clientes = new ArrayList<>();

        String sql = "SELECT id_cli, nom_cli, ape_cli, tel_cli, correo, contra_cli " +
                "FROM cliente";

        try (Connection conexion = Conexion.obtenerConexion();
            PreparedStatement sentencia = conexion.prepareStatement(sql);
            ResultSet resultado = sentencia.executeQuery()) {

            while (resultado.next()) {

                Cliente cliente = new Cliente(
                        resultado.getInt("id_cli"),
                        resultado.getString("nom_cli"),
                        resultado.getString("ape_cli"),
                        resultado.getString("tel_cli"),
                        resultado.getString("correo"),
                        resultado.getString("contra_cli")
                );

                clientes.add(cliente);
            }

        } catch (SQLException e) {
            System.out.println("Error al consultar clientes: " + e.getMessage());
        }

        return clientes;
    }

    // ACTUALIZAR CLIENTE
    public boolean actualizar(Cliente cliente) {

        String sql = "UPDATE cliente SET " +
                "nom_cli = ?, ape_cli = ?, tel_cli = ?, " +
                "correo = ?, contra_cli = ? " +
                "WHERE id_cli = ?";

        try (Connection conexion = Conexion.obtenerConexion();
            PreparedStatement sentencia = conexion.prepareStatement(sql)) {

            sentencia.setString(1, cliente.getNomCli());
            sentencia.setString(2, cliente.getApeCli());
            sentencia.setString(3, cliente.getTelCli());
            sentencia.setString(4, cliente.getCorreo());
            sentencia.setString(5, cliente.getContraCli());
            sentencia.setInt(6, cliente.getIdCli());

            int filasAfectadas = sentencia.executeUpdate();

            return filasAfectadas > 0;

        } catch (SQLException e) {
            System.out.println("Error al actualizar cliente: " + e.getMessage());
            return false;
        }
    }

    // ELIMINAR CLIENTE
    public boolean eliminar(int idCli) {

        String sql = "DELETE FROM cliente WHERE id_cli = ?";

        try (Connection conexion = Conexion.obtenerConexion();
            PreparedStatement sentencia = conexion.prepareStatement(sql)) {

            sentencia.setInt(1, idCli);

            int filasAfectadas = sentencia.executeUpdate();

            return filasAfectadas > 0;

        } catch (SQLException e) {
            System.out.println("Error al eliminar cliente: " + e.getMessage());
            return false;
        }
    }
}