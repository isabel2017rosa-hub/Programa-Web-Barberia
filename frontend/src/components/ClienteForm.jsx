import { useState } from 'react';

function ClienteForm() {
  const [formulario, setFormulario] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    correo: '',
    contrasena: ''
  });

  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const manejarCambio = (evento) => {
    const { name, value } = evento.target;

    setFormulario({
      ...formulario,
      [name]: value
    });
  };

  const registrarCliente = async (evento) => {
    evento.preventDefault();

    setMensaje('');
    setError('');

    try {
      const datos = new URLSearchParams();

      datos.append('accion', 'insertarJson');
      datos.append('nombre', formulario.nombre);
      datos.append('apellido', formulario.apellido);
      datos.append('telefono', formulario.telefono);
      datos.append('correo', formulario.correo);
      datos.append('contrasena', formulario.contrasena);

      const respuesta = await fetch(
        'http://localhost:8080/barberia-web/ClienteServlet',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: datos
        }
      );

      if (!respuesta.ok) {
        throw new Error('No fue posible registrar el cliente.');
      }

      const resultado = await respuesta.json();

      if (resultado.exito) {
        setMensaje('Cliente registrado correctamente.');

        setFormulario({
          nombre: '',
          apellido: '',
          telefono: '',
          correo: '',
          contrasena: ''
        });

        // Avisar a ClienteList para que vuelva a consultar MySQL
        window.dispatchEvent(new Event('cliente-registrado'));
      } else {
        setError(
          resultado.mensaje || 'No fue posible registrar el cliente.'
        );
      }

    } catch (error) {
      console.error('Error al registrar cliente:', error);
      setError(
        'No fue posible conectar con el servidor.'
      );
    }
  };

  return (
    <section className="formulario">
      <h2>Registrar cliente</h2>

      <form onSubmit={registrarCliente}>

        <div>
          <label>Nombre:</label>

          <input
            type="text"
            name="nombre"
            value={formulario.nombre}
            onChange={manejarCambio}
            required
          />
        </div>

        <div>
          <label>Apellido:</label>

          <input
            type="text"
            name="apellido"
            value={formulario.apellido}
            onChange={manejarCambio}
            required
          />
        </div>

        <div>
          <label>Teléfono:</label>

          <input
            type="text"
            name="telefono"
            value={formulario.telefono}
            onChange={manejarCambio}
            required
          />
        </div>

        <div>
          <label>Correo:</label>

          <input
            type="email"
            name="correo"
            value={formulario.correo}
            onChange={manejarCambio}
            required
          />
        </div>

        <div>
          <label>Contraseña:</label>

          <input
            type="password"
            name="contrasena"
            value={formulario.contrasena}
            onChange={manejarCambio}
            required
          />
        </div>

        <button type="submit">
          Registrar cliente
        </button>

      </form>

      {mensaje && (
        <p style={{ color: 'green', marginTop: '15px' }}>
          {mensaje}
        </p>
      )}

      {error && (
        <p style={{ color: 'red', marginTop: '15px' }}>
          {error}
        </p>
      )}
    </section>
  );
}

export default ClienteForm;