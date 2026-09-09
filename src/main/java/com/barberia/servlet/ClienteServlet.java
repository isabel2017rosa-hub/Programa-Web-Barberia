package com.barberia.servlet;

import com.barberia.model.Cliente;
import com.barberia.repository.ClienteRepository;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet("/ClienteServlet")
public class ClienteServlet extends HttpServlet {

    private ClienteRepository clienteRepository;

    @Override
    public void init() {
        clienteRepository = new ClienteRepository();
    }

    @Override
    protected void doGet(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws ServletException, IOException {

        configurarCors(response);

        String accion = request.getParameter("accion");

        if (accion == null || accion.isEmpty()) {
            accion = "listar";
        }

        switch (accion) {

            case "listar":
                request.setAttribute(
                        "clientes",
                        clienteRepository.consultarTodos()
                );

                request.getRequestDispatcher(
                        "/vistas/clientes.jsp"
                ).forward(request, response);
                break;

            case "json":
                enviarClientesJson(response);
                break;

            default:
                response.sendError(
                        HttpServletResponse.SC_BAD_REQUEST,
                        "Acción no válida."
                );
                break;
        }
    }

    @Override
    protected void doPost(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws ServletException, IOException {

        configurarCors(response);

        String accion = request.getParameter("accion");

        if (accion == null || accion.isEmpty()) {
            accion = "";
        }

        switch (accion) {

            // =====================================================
            // INSERTAR DESDE JSP
            // =====================================================
            case "insertar":

                Cliente nuevoCliente = crearClienteDesdeRequest(request);

                clienteRepository.insertar(nuevoCliente);

                response.sendRedirect(
                        request.getContextPath()
                                + "/ClienteServlet?accion=listar"
                );
                break;

            // =====================================================
            // INSERTAR DESDE REACT
            // =====================================================
            case "insertarJson":

                try {

                    Cliente cliente = crearClienteDesdeRequest(request);

                    clienteRepository.insertar(cliente);

                    enviarRespuestaJson(
                            response,
                            HttpServletResponse.SC_OK,
                            true,
                            "Cliente registrado correctamente."
                    );

                } catch (Exception e) {

                    enviarRespuestaJson(
                            response,
                            HttpServletResponse.SC_BAD_REQUEST,
                            false,
                            "No fue posible registrar el cliente."
                    );
                }

                break;

            // =====================================================
            // ACTUALIZAR DESDE JSP
            // =====================================================
            case "actualizar":

                Cliente clienteActualizar =
                        crearClienteDesdeRequest(request);

                int idActualizar = Integer.parseInt(
                        request.getParameter("idCli")
                );

                clienteActualizar.setIdCli(idActualizar);

                clienteRepository.actualizar(clienteActualizar);

                response.sendRedirect(
                        request.getContextPath()
                                + "/ClienteServlet?accion=listar"
                );
                break;

            // =====================================================
            // ACTUALIZAR DESDE REACT
            // =====================================================
            case "actualizarJson":

                try {

                    int idCli = Integer.parseInt(
                            request.getParameter("idCli")
                    );

                    Cliente clienteEditado =
                            crearClienteDesdeRequest(request);

                    clienteEditado.setIdCli(idCli);

                    clienteRepository.actualizar(clienteEditado);

                    enviarRespuestaJson(
                            response,
                            HttpServletResponse.SC_OK,
                            true,
                            "Cliente actualizado correctamente."
                    );

                } catch (Exception e) {

                    enviarRespuestaJson(
                            response,
                            HttpServletResponse.SC_BAD_REQUEST,
                            false,
                            "No fue posible actualizar el cliente."
                    );
                }

                break;

            // =====================================================
            // ELIMINAR DESDE JSP
            // =====================================================
            case "eliminar":

                int idEliminar = Integer.parseInt(
                        request.getParameter("idCli")
                );

                clienteRepository.eliminar(idEliminar);

                response.sendRedirect(
                        request.getContextPath()
                                + "/ClienteServlet?accion=listar"
                );
                break;

            // =====================================================
            // ELIMINAR DESDE REACT
            // =====================================================
            case "eliminarJson":

                try {

                    int idCli = Integer.parseInt(
                            request.getParameter("idCli")
                    );

                    clienteRepository.eliminar(idCli);

                    enviarRespuestaJson(
                            response,
                            HttpServletResponse.SC_OK,
                            true,
                            "Cliente eliminado correctamente."
                    );

                } catch (Exception e) {

                    enviarRespuestaJson(
                            response,
                            HttpServletResponse.SC_BAD_REQUEST,
                            false,
                            "No fue posible eliminar el cliente."
                    );
                }

                break;

            default:

                response.sendError(
                        HttpServletResponse.SC_BAD_REQUEST,
                        "Acción no válida."
                );

                break;
        }
    }

    // =========================================================
    // CREAR CLIENTE DESDE REQUEST
    // =========================================================
    private Cliente crearClienteDesdeRequest(
            HttpServletRequest request
    ) {

        String nombre = request.getParameter("nombre");
        String apellido = request.getParameter("apellido");
        String telefono = request.getParameter("telefono");
        String correo = request.getParameter("correo");
        String contrasena = request.getParameter("contrasena");

        return new Cliente(
                nombre,
                apellido,
                telefono,
                correo,
                contrasena
        );
    }

    // =========================================================
    // ENVIAR CLIENTES EN JSON
    // =========================================================
    private void enviarClientesJson(
            HttpServletResponse response
    ) throws IOException {

        response.setContentType("application/json;charset=UTF-8");

        List<Cliente> clientes =
                clienteRepository.consultarTodos();

        PrintWriter out = response.getWriter();

        out.print("[");

        for (int i = 0; i < clientes.size(); i++) {

            Cliente cliente = clientes.get(i);

            out.print("{");

            out.print("\"idCli\":" + cliente.getIdCli() + ",");

            out.print("\"nomCli\":\""
                    + escaparJson(cliente.getNomCli())
                    + "\",");

            out.print("\"apeCli\":\""
                    + escaparJson(cliente.getApeCli())
                    + "\",");

            out.print("\"telCli\":\""
                    + escaparJson(cliente.getTelCli())
                    + "\",");

            out.print("\"correo\":\""
                    + escaparJson(cliente.getCorreo())
                    + "\"");

            out.print("}");

            if (i < clientes.size() - 1) {
                out.print(",");
            }
        }

        out.print("]");

        out.flush();
    }

    // =========================================================
    // RESPUESTA JSON
    // =========================================================
    private void enviarRespuestaJson(
            HttpServletResponse response,
            int codigo,
            boolean exito,
            String mensaje
    ) throws IOException {

        response.setStatus(codigo);
        response.setContentType(
                "application/json;charset=UTF-8"
        );

        PrintWriter out = response.getWriter();

        out.print("{");

        out.print("\"exito\":"
                + exito
                + ",");

        out.print("\"mensaje\":\""
                + escaparJson(mensaje)
                + "\"");

        out.print("}");

        out.flush();
    }

    // =========================================================
    // CORS
    // =========================================================
    private void configurarCors(
            HttpServletResponse response
    ) {

        response.setHeader(
                "Access-Control-Allow-Origin",
                "http://localhost:5173"
        );

        response.setHeader(
                "Access-Control-Allow-Methods",
                "GET, POST, OPTIONS"
        );

        response.setHeader(
                "Access-Control-Allow-Headers",
                "Content-Type"
        );
    }

    // =========================================================
    // OPTIONS
    // =========================================================
    @Override
    protected void doOptions(
            HttpServletRequest request,
            HttpServletResponse response
    ) {

        configurarCors(response);

        response.setStatus(
                HttpServletResponse.SC_OK
        );
    }

    // =========================================================
    // ESCAPAR JSON
    // =========================================================
    private String escaparJson(String texto) {

        if (texto == null) {
            return "";
        }

        return texto
                .replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\n", "\\n")
                .replace("\r", "\\r");
    }
}