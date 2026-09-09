import { useState } from 'react';

function CitaPanel() {

  const [cliente, setCliente] = useState('');
  const [barbero, setBarbero] = useState('');
  const [servicio, setServicio] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [citas, setCitas] = useState([]);

    const handleSubmit = (evento) => {
    evento.preventDefault();

    const nuevaCita = {
    id: citas.length + 1,
    cliente,
    barbero,
    servicio,
    fecha,
    hora,
    estado: 'Programada'
  };

  setCitas([...citas, nuevaCita]);

  setCliente('');
  setBarbero('');
  setServicio('');
  setFecha('');
  setHora('');
};

  return (
    <div className="modulo-panel">

      <h2>Gestión de citas</h2>

      <p>
        En este módulo se pueden registrar y consultar las citas
        programadas para la barbería.
      </p>

      <form className="form-cita" onSubmit={handleSubmit}>

        <div>
          <label>Cliente:</label>

          <select
            value={cliente}
            onChange={(evento) => setCliente(evento.target.value)}
            required
          >
            <option value="">Seleccionar cliente</option>
            <option value="Ana Rodríguez">Ana Rodríguez</option>
            <option value="Isabel Turizo">Isabel Turizo</option>
          </select>
        </div>

        <div>
          <label>Barbero:</label>

          <select
            value={barbero}
            onChange={(evento) => setBarbero(evento.target.value)}
            required
          >
            <option value="">Seleccionar barbero</option>
            <option value="Carlos Barber">Carlos Barber</option>
            <option value="Andrés R.">Andrés R.</option>
          </select>
        </div>

        <div>
          <label>Servicio:</label>

          <select
            value={servicio}
            onChange={(evento) => setServicio(evento.target.value)}
            required
          >
            <option value="">Seleccionar servicio</option>
            <option value="Corte de cabello">Corte de cabello</option>
            <option value="Barba y bigote">Barba y bigote</option>
            <option value="Corte + barba">Corte + barba</option>
          </select>
        </div>

        <div>
          <label>Fecha:</label>

          <input
            type="date"
            value={fecha}
            onChange={(evento) => setFecha(evento.target.value)}
            required
          />
        </div>

        <div>
          <label>Hora:</label>

          <input
            type="time"
            value={hora}
            onChange={(evento) => setHora(evento.target.value)}
            required
          />
        </div>

        <button type="submit">
          Agendar cita
        </button>

      </form>
      {citas.length > 0 && (
  <div className="lista-citas">

    <h2>Citas programadas</h2>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Cliente</th>
          <th>Barbero</th>
          <th>Servicio</th>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Estado</th>
        </tr>
      </thead>

      <tbody>
        {citas.map((cita) => (
          <tr key={cita.id}>
            <td>{cita.id}</td>
            <td>{cita.cliente}</td>
            <td>{cita.barbero}</td>
            <td>{cita.servicio}</td>
            <td>{cita.fecha}</td>
            <td>{cita.hora}</td>
            <td>{cita.estado}</td>
          </tr>
        ))}
      </tbody>
    </table>

  </div>
)}

    </div>
  );
}

export default CitaPanel;