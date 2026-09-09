import { useEffect, useState } from 'react';

function ClienteList() {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [clienteEditando, setClienteEditando] = useState(null);

  // =========================================================
  // CARGAR CLIENTES
  // =========================================================
  const cargarClientes = async () => {
    try {
      setCargando(true);
      setError('');

      const respuesta = await fetch(
        'http://localhost:8080/barberia-web/ClienteServlet?accion=json'
      );

      if (!respuesta.ok) {
        throw new Error('No fue posible obtener los clientes.');
      }

      const datos = await respuesta.json();

      setClientes(datos);
    } catch (err) {
      console.error(err);
      setError('No fue posible conectar con el servidor.');
    } finally {
      setCargando(false);
    }
  };

  // =========================================================
  // CARGA INICIAL
  // =========================================================
  useEffect(() => {
    cargarClientes();

    const actualizarLista = () => {
      cargarClientes();
    };

    window.addEventListener(
      'cliente-registrado',
      actualizarLista
    );

    return () => {
      window.removeEventListener(
        'cliente-registrado',
        actualizarLista
      );
    };
  }, []);

  // =========================================================
  // INICIAR EDICIÓN
  // =========================================================
  const iniciarEdicion = (cliente) => {
    setClienteEditando({
      idCli: cliente.idCli,
      nomCli: cliente.nomCli,
      apeCli: cliente.apeCli,
      telCli: cliente.telCli,
      correo: cliente.correo,
      contrasena: ''
    });
  };

  // =========================================================
  // CANCELAR EDICIÓN
  // =========================================================
  const cancelarEdicion = () => {
    setClienteEditando(null);
  };

  // =========================================================
  // CAMBIAR DATOS DE EDICIÓN
  // =========================================================
  const manejarCambioEdicion = (e) => {
    const { name, value } = e.target;

    setClienteEditando((clienteAnterior) => ({
      ...clienteAnterior,
      [name]: value
    }));
  };

  // =========================================================
  // ACTUALIZAR CLIENTE
  // =========================================================
  const actualizarCliente = async (e) => {
    e.preventDefault();

    try {
      const datos = new URLSearchParams();

      datos.append('accion', 'actualizarJson');
      datos.append(
        'idCli',
        clienteEditando.idCli
      );
      datos.append(
        'nombre',
        clienteEditando.nomCli
      );
      datos.append(
        'apellido',
        clienteEditando.apeCli
      );
      datos.append(
        'telefono',
        clienteEditando.telCli
      );
      datos.append(
        'correo',
        clienteEditando.correo
      );
      datos.append(
        'contrasena',
        clienteEditando.contrasena
      );

      const respuesta = await fetch(
        'http://localhost:8080/barberia-web/ClienteServlet',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/x-www-form-urlencoded'
          },
          body: datos.toString()
        }
      );

      const resultado = await respuesta.json();

      if (!respuesta.ok || !resultado.exito) {
        throw new Error(
          resultado.mensaje ||
          'No fue posible actualizar el cliente.'
        );
      }

      setClienteEditando(null);

      await cargarClientes();

      alert(resultado.mensaje);

    } catch (err) {
      console.error(err);

      alert(
        err.message ||
        'No fue posible conectar con el servidor.'
      );
    }
  };

  // =========================================================
  // ELIMINAR CLIENTE
  // =========================================================
  const eliminarCliente = async (idCli, nombre) => {

    const confirmar = window.confirm(
      `¿Está seguro de eliminar al cliente ${nombre}?`
    );

    if (!confirmar) {
      return;
    }

    try {

      const datos = new URLSearchParams();

      datos.append('accion', 'eliminarJson');
      datos.append('idCli', idCli);

      const respuesta = await fetch(
        'http://localhost:8080/barberia-web/ClienteServlet',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/x-www-form-urlencoded'
          },
          body: datos.toString()
        }
      );

      const resultado = await respuesta.json();

      if (!respuesta.ok || !resultado.exito) {
        throw new Error(
          resultado.mensaje ||
          'No fue posible eliminar el cliente.'
        );
      }

      await cargarClientes();

      alert(resultado.mensaje);

    } catch (err) {

      console.error(err);

      alert(
        err.message ||
        'No fue posible conectar con el servidor.'
      );
    }
  };

  // =========================================================
  // CARGANDO
  // =========================================================
  if (cargando) {
    return (
      <div className="lista-clientes">
        <h2>Clientes registrados</h2>
        <p>Cargando clientes...</p>
      </div>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================
  if (error) {
    return (
      <div className="lista-clientes">
        <h2>Clientes registrados</h2>
        <p>{error}</p>
      </div>
    );
  }

  // =========================================================
  // LISTA DE CLIENTES
  // =========================================================
  return (
    <div className="lista-clientes">

      <h2>Clientes registrados</h2>

      {clientes.length === 0 ? (
        <p>No hay clientes registrados.</p>
      ) : (

        <table>

          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>

            {clientes.map((cliente) => (

              <tr key={cliente.idCli}>

                {clienteEditando?.idCli === cliente.idCli ? (

                  <>
                    <td>
                      {cliente.idCli}
                    </td>

                    <td>
                      <input
                        type="text"
                        name="nomCli"
                        value={clienteEditando.nomCli}
                        onChange={manejarCambioEdicion}
                      />
                    </td>

                    <td>
                      <input
                        type="text"
                        name="apeCli"
                        value={clienteEditando.apeCli}
                        onChange={manejarCambioEdicion}
                      />
                    </td>

                    <td>
                      <input
                        type="text"
                        name="telCli"
                        value={clienteEditando.telCli}
                        onChange={manejarCambioEdicion}
                      />
                    </td>

                    <td>
                      <input
                        type="email"
                        name="correo"
                        value={clienteEditando.correo}
                        onChange={manejarCambioEdicion}
                      />
                    </td>

                    <td>

                      <input
                        type="password"
                        name="contrasena"
                        placeholder="Nueva contraseña"
                        value={clienteEditando.contrasena}
                        onChange={manejarCambioEdicion}
                        required
                      />

                      <button
                        type="button"
                        onClick={actualizarCliente}
                      >
                        Guardar
                      </button>

                      <button
                        type="button"
                        onClick={cancelarEdicion}
                      >
                        Cancelar
                      </button>

                    </td>
                  </>

                ) : (

                  <>
                    <td>
                      {cliente.idCli}
                    </td>

                    <td>
                      {cliente.nomCli}
                    </td>

                    <td>
                      {cliente.apeCli}
                    </td>

                    <td>
                      {cliente.telCli}
                    </td>

                    <td>
                      {cliente.correo}
                    </td>

                    <td>

                      <button
                        type="button"
                        onClick={() =>
                          iniciarEdicion(cliente)
                        }
                      >
                        Actualizar
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          eliminarCliente(
                            cliente.idCli,
                            cliente.nomCli
                          )
                        }
                      >
                        Eliminar
                      </button>

                    </td>
                  </>
                )}

              </tr>

            ))}

          </tbody>

        </table>
      )}

    </div>
  );
}

export default ClienteList;