<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Clientes - Barbería</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 30px;
        }

        h1 {
            margin-bottom: 20px;
        }

        table {
            border-collapse: collapse;
            width: 100%;
        }

        th, td {
            border: 1px solid #999;
            padding: 8px;
            text-align: left;
        }

        th {
            background-color: #eeeeee;
        }

        input {
            width: 95%;
            padding: 5px;
            box-sizing: border-box;
        }

        .boton {
            padding: 6px 10px;
            cursor: pointer;
            margin-bottom: 5px;
        }

        .eliminar {
            margin-top: 5px;
        }
    </style>
</head>

<body>

    <h1>Clientes registrados</h1>

    <p>
        <a href="${pageContext.request.contextPath}/cliente-form.html">
            Registrar nuevo cliente
        </a>
    </p>

    <table>

        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Teléfono</th>
                <th>Correo</th>
                <th>Contraseña</th>
                <th>Acciones</th>
            </tr>
        </thead>

        <tbody>

            <c:forEach var="cliente" items="${clientes}">

                <!-- Formulario de actualización -->
                <form id="formActualizar${cliente.idCli}"
                      action="${pageContext.request.contextPath}/ClienteServlet"
                      method="post">

                    <input type="hidden"
                           name="accion"
                           value="actualizar">

                    <input type="hidden"
                           name="idCli"
                           value="${cliente.idCli}">
                </form>

                <tr>

                    <td>
                        ${cliente.idCli}
                    </td>

                    <td>
                        <input type="text"
                               name="nombre"
                               value="${cliente.nomCli}"
                               form="formActualizar${cliente.idCli}"
                               required>
                    </td>

                    <td>
                        <input type="text"
                               name="apellido"
                               value="${cliente.apeCli}"
                               form="formActualizar${cliente.idCli}"
                               required>
                    </td>

                    <td>
                        <input type="text"
                               name="telefono"
                               value="${cliente.telCli}"
                               form="formActualizar${cliente.idCli}">
                    </td>

                    <td>
                        <input type="email"
                               name="correo"
                               value="${cliente.correo}"
                               form="formActualizar${cliente.idCli}"
                               required>
                    </td>

                    <td>
                        <input type="password"
                               name="contrasena"
                               value="${cliente.contraCli}"
                               form="formActualizar${cliente.idCli}"
                               required>
                    </td>

                    <td>

                        <!-- Botón actualizar -->
                        <button type="submit"
                                class="boton"
                                form="formActualizar${cliente.idCli}">
                            Actualizar
                        </button>

                        <!-- Formulario eliminar -->
                        <form action="${pageContext.request.contextPath}/ClienteServlet"
                              method="post"
                              class="eliminar">

                            <input type="hidden"
                                   name="accion"
                                   value="eliminar">

                            <input type="hidden"
                                   name="idCli"
                                   value="${cliente.idCli}">

                            <button type="submit"
                                    class="boton">
                                Eliminar
                            </button>

                        </form>

                    </td>

                </tr>

            </c:forEach>

        </tbody>

    </table>

    <br>

    <a href="${pageContext.request.contextPath}/cliente-form.html">
        Volver al formulario
    </a>

</body>

</html>