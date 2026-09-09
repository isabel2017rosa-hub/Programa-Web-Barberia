import { useState } from 'react';

function ServicioPanel() {
  const [servicios, setServicios] = useState([
    {
      id: 1,
      nombre: 'Corte de cabello',
      descripcion: 'Corte clásico para caballero',
      precio: 30000,
      duracion: 30,
      estado: 'Activo'
    },
    {
      id: 2,
      nombre: 'Barba y bigote',
      descripcion: 'Perfilado y arreglo de barba',
      precio: 20000,
      duracion: 20,
      estado: 'Activo'
    }
  ]);

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [duracion, setDuracion] = useState('');

  const handleSubmit = (evento) => {
    evento.preventDefault();

    const nuevoServicio = {
      id: servicios.length + 1,
      nombre,
      descripcion,
      precio: Number(precio),
      duracion: Number(duracion),
      estado: 'Activo'
    };

    setServicios([...servicios, nuevoServicio]);

    setNombre('');
    setDescripcion('');
    setPrecio('');
    setDuracion('');
  };

  return (
    <div className="modulo-panel">

      <h2>Gestión de servicios</h2>

      <p>
        En este módulo el administrador puede registrar y consultar
        los servicios disponibles en la barbería.
      </p>

      <form className="form-servicio" onSubmit={handleSubmit}>

        <div>
          <label>Nombre del servicio:</label>
          <input
            type="text"
            value={nombre}
            onChange={(evento) => setNombre(evento.target.value)}
            placeholder="Ejemplo: Corte de cabello"
            required
          />
        </div>

        <div>
          <label>Descripción:</label>
          <input
            type="text"
            value={descripcion}
            onChange={(evento) => setDescripcion(evento.target.value)}
            placeholder="Descripción del servicio"
            required
          />
        </div>

        <div>
          <label>Precio:</label>
          <input
            type="number"
            value={precio}
            onChange={(evento) => setPrecio(evento.target.value)}
            placeholder="Ejemplo: 30000"
            min="0"
            required
          />
        </div>

        <div>
          <label>Duración (minutos):</label>
          <input
            type="number"
            value={duracion}
            onChange={(evento) => setDuracion(evento.target.value)}
            placeholder="Ejemplo: 30"
            min="1"
            required
          />
        </div>

        <button type="submit">
          Registrar servicio
        </button>

      </form>

      <div className="lista-servicios">

        <h2>Servicios registrados</h2>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Servicio</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Duración</th>
              <th>Estado</th>
            </tr>
          </thead>

          <tbody>
            {servicios.map((servicio) => (
              <tr key={servicio.id}>
                <td>{servicio.id}</td>
                <td>{servicio.nombre}</td>
                <td>{servicio.descripcion}</td>
                <td>${servicio.precio.toLocaleString('es-CO')}</td>
                <td>{servicio.duracion} min</td>
                <td>{servicio.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
}

export default ServicioPanel;