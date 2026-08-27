package com.barberia.servlet;

import com.barberia.model.Cliente;
import com.barberia.repository.ClienteRepository;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

@WebServlet("/ClienteServlet")
public class ClienteServlet extends HttpServlet {

    private ClienteRepository clienteRepository;

    @Override
    public void init() throws ServletException {
        clienteRepository = new ClienteRepository();
    }

    // ==========================
    // MÉTODO GET
    // ==========================
    @Override
    protected void doGet(HttpServletRequest request,
                        HttpServletResponse response)
            throws ServletException, IOException {

        String accion = request.getParameter("accion");

        if (accion == null) {
            accion = "listar";
        }

        if ("listar".equals(accion)) {

            List<Cliente> clientes = clienteRepository.consultarTodos();

            request.setAttribute("clientes", clientes);

            request.getRequestDispatcher("/vistas/clientes.jsp")
                    .forward(request, response);
        }
    }

    // ==========================
    // MÉTODO POST
    // ==========================
    @Override
    protected void doPost(HttpServletRequest request,
                        HttpServletResponse response)
            throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");

        String accion = request.getParameter("accion");

        // ==========================
        // INSERTAR
        // ==========================
        if ("insertar".equals(accion)) {

            String nombre = request.getParameter("nombre");
            String apellido = request.getParameter("apellido");
            String telefono = request.getParameter("telefono");
            String correo = request.getParameter("correo");
            String contrasena = request.getParameter("contrasena");

            Cliente cliente = new Cliente();

            cliente.setNomCli(nombre);
            cliente.setApeCli(apellido);
            cliente.setTelCli(telefono);
            cliente.setCorreo(correo);
            cliente.setContraCli(contrasena);

            boolean resultado = clienteRepository.insertar(cliente);

            if (resultado) {
                response.sendRedirect(request.getContextPath() + "/ClienteServlet?accion=listar");
            } else {
                mostrarError(request, response, "No fue posible registrar el cliente.");
            }
        }

        // ==========================
        // ACTUALIZAR
        // ==========================
        else if ("actualizar".equals(accion)) {

            int idCli = Integer.parseInt(request.getParameter("idCli"));

            String nombre = request.getParameter("nombre");
            String apellido = request.getParameter("apellido");
            String telefono = request.getParameter("telefono");
            String correo = request.getParameter("correo");
            String contrasena = request.getParameter("contrasena");

            Cliente cliente = new Cliente();

            cliente.setIdCli(idCli);
            cliente.setNomCli(nombre);
            cliente.setApeCli(apellido);
            cliente.setTelCli(telefono);
            cliente.setCorreo(correo);
            cliente.setContraCli(contrasena);

            boolean resultado = clienteRepository.actualizar(cliente);

            if (resultado) {
                response.sendRedirect(request.getContextPath() + "/ClienteServlet?accion=listar");
            } else {
                mostrarError(request, response, "No fue posible actualizar el cliente.");
            }
        }

        // ==========================
        // ELIMINAR
        // ==========================
        else if ("eliminar".equals(accion)) {

            int idCli = Integer.parseInt(request.getParameter("idCli"));

            boolean resultado = clienteRepository.eliminar(idCli);

            if (resultado) {
                response.sendRedirect(request.getContextPath() + "/ClienteServlet?accion=listar");
            } else {
                mostrarError(request, response, "No fue posible eliminar el cliente.");
            }
        }
    }

    // ==========================
    // PÁGINA DE ERROR
    // ==========================
    private void mostrarError(HttpServletRequest request,
                        HttpServletResponse response,
                        String mensaje)
        throws IOException {

    response.setContentType("text/html;charset=UTF-8");

    response.getWriter().println("""
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <title>Error</title>
            </head>
            <body>
                <h1>Error en la operación</h1>
                <p>%s</p>
                <a href="%s/ClienteServlet?accion=listar">
                    Volver a clientes
                </a>
            </body>
            </html>
            """.formatted(mensaje, request.getContextPath()));
}
}