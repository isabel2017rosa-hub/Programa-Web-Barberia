import { useState } from 'react';

function ClientePanel() {

  const [moduloActivo, setModuloActivo] = useState('inicio');

  const [cita, setCita] = useState({
    servicio: '',
    barbero: '',
    fecha: '',
    hora: ''
  });

  const [citaRegistrada, setCitaRegistrada] = useState(null);

  const servicios = [
    'Corte de cabello',
    'Barba y bigote',
    'Corte + barba'
  ];

  const barberos = [
    'Carlos Barber',
    'Andrés Rodríguez'
  ];

  const historial = [
    {
      id: 1,
      fecha: '2026-09-01',
      servicio: 'Corte de cabello',
      barbero: 'Carlos Barber',
      estado: 'Finalizada'
    },
    {
      id: 2,
      fecha: '2026-08-20',
      servicio: 'Barba y bigote',
      barbero: 'Andrés Rodríguez',
      estado: 'Finalizada'
    },
    {
      id: 3,
      fecha: '2026-08-10',
      servicio: 'Corte + barba',
      barbero: 'Carlos Barber',
      estado: 'Finalizada'
    }
  ];

  const handleChange = (evento) => {
    const { name, value } = evento.target;

    setCita({
      ...cita,
      [name]: value
    });
  };

  const handleSubmit = (evento) => {
    evento.preventDefault();

    if (
      !cita.servicio ||
      !cita.barbero ||
      !cita.fecha ||
      !cita.hora
    ) {
      alert('Por favor completa todos los campos.');
      return;
    }

    setCitaRegistrada(cita);

    alert(
      `Cita agendada correctamente\n\n` +
      `Servicio: ${cita.servicio}\n` +
      `Barbero: ${cita.barbero}\n` +
      `Fecha: ${cita.fecha}\n` +
      `Hora: ${cita.hora}`
    );

    setModuloActivo('consultar');
  };

  return (
    <div className="cliente-panel">

      {/* =====================================================
          ENCABEZADO DEL CLIENTE
          ===================================================== */}

      <div className="cliente-encabezado">

        <div>
          <h2>Panel del cliente</h2>

          <p>
            Bienvenido, Ana Rodríguez
          </p>
        </div>

        <button className="boton-cerrar">
          Cerrar sesión
        </button>

      </div>


      {/* =====================================================
          MENÚ DEL CLIENTE
          ===================================================== */}

      <nav className="menu-cliente">

        <button
          onClick={() => setModuloActivo('inicio')}
        >
          Inicio
        </button>

        <button
          onClick={() => setModuloActivo('agendar')}
        >
          Agendar cita
        </button>

        <button
          onClick={() => setModuloActivo('consultar')}
        >
          Consultar cita
        </button>

        <button
          onClick={() => setModuloActivo('historial')}
        >
          Historial
        </button>

      </nav>


      {/* =====================================================
          INICIO
          ===================================================== */}

      {moduloActivo === 'inicio' && (

        <section className="cliente-inicio">

          <h2>Panel de Control</h2>

          <p>
            Desde este panel puedes gestionar tus citas y
            consultar tus servicios realizados.
          </p>


          <div className="cliente-opciones">

            <button
              onClick={() => setModuloActivo('agendar')}
            >
              📅 Agendar cita
            </button>

            <button
              onClick={() => setModuloActivo('consultar')}
            >
              🔎 Consultar cita
            </button>

            <button
              onClick={() => setModuloActivo('historial')}
            >
              📋 Ver historial
            </button>

          </div>


          <div className="ultimos-servicios">

            <h3>Tus últimos 3 servicios</h3>

            <table>

              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Servicio</th>
                  <th>Barbero</th>
                  <th>Estado</th>
                </tr>
              </thead>

              <tbody>

                {historial.map((servicio) => (

                  <tr key={servicio.id}>

                    <td>{servicio.fecha}</td>

                    <td>{servicio.servicio}</td>

                    <td>{servicio.barbero}</td>

                    <td>{servicio.estado}</td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </section>

      )}


      {/* =====================================================
          AGENDAR CITA
          ===================================================== */}

      {moduloActivo === 'agendar' && (

        <section className="cliente-modulo">

          <h2>Agendar cita</h2>

          <p>
            Selecciona el servicio, barbero, fecha y hora
            para programar tu cita.
          </p>


          <form
            className="form-cliente-cita"
            onSubmit={handleSubmit}
          >

            <div>

              <label htmlFor="servicio">
                Servicio:
              </label>

              <select
                id="servicio"
                name="servicio"
                value={cita.servicio}
                onChange={handleChange}
              >

                <option value="">
                  Seleccionar servicio
                </option>

                {servicios.map((servicio) => (

                  <option
                    key={servicio}
                    value={servicio}
                  >
                    {servicio}
                  </option>

                ))}

              </select>

            </div>


            <div>

              <label htmlFor="barbero">
                Barbero:
              </label>

              <select
                id="barbero"
                name="barbero"
                value={cita.barbero}
                onChange={handleChange}
              >

                <option value="">
                  Seleccionar barbero
                </option>

                {barberos.map((barbero) => (

                  <option
                    key={barbero}
                    value={barbero}
                  >
                    {barbero}
                  </option>

                ))}

              </select>

            </div>


            <div>

              <label htmlFor="fecha">
                Fecha:
              </label>

              <input
                id="fecha"
                name="fecha"
                type="date"
                value={cita.fecha}
                onChange={handleChange}
              />

            </div>


            <div>

              <label htmlFor="hora">
                Hora:
              </label>

              <input
                id="hora"
                name="hora"
                type="time"
                value={cita.hora}
                onChange={handleChange}
              />

            </div>


            <button type="submit">
              Agendar cita
            </button>

          </form>

        </section>

      )}


      {/* =====================================================
          CONSULTAR CITA
          ===================================================== */}

      {moduloActivo === 'consultar' && (

        <section className="cliente-modulo">

          <h2>Consultar cita</h2>

          <p>
            Aquí puedes consultar la información de tu
            próxima cita.
          </p>


          {citaRegistrada ? (

            <div className="cita-actual">

              <h3>Próxima cita</h3>

              <div className="datos-cita">

                <p>
                  <strong>Cliente:</strong>{' '}
                  Ana Rodríguez
                </p>

                <p>
                  <strong>Servicio:</strong>{' '}
                  {citaRegistrada.servicio}
                </p>

                <p>
                  <strong>Barbero:</strong>{' '}
                  {citaRegistrada.barbero}
                </p>

                <p>
                  <strong>Fecha:</strong>{' '}
                  {citaRegistrada.fecha}
                </p>

                <p>
                  <strong>Hora:</strong>{' '}
                  {citaRegistrada.hora}
                </p>

                <p>
                  <strong>Estado:</strong>{' '}
                  Programada
                </p>

              </div>


              <div className="acciones-cita">

                <button>
                  Reprogramar
                </button>

                <button>
                  Cancelar cita
                </button>

              </div>

            </div>

          ) : (

            <div className="sin-cita">

              <h3>No tienes una cita registrada</h3>

              <p>
                Puedes agendar una nueva cita desde el
                botón correspondiente.
              </p>

              <button
                onClick={() => setModuloActivo('agendar')}
              >
                Agendar cita
              </button>

            </div>

          )}

        </section>

      )}


      {/* =====================================================
          HISTORIAL
          ===================================================== */}

      {moduloActivo === 'historial' && (

        <section className="cliente-modulo">

          <h2>Historial de servicios</h2>

          <p>
            Consulta los servicios que has realizado
            anteriormente en la barbería.
          </p>


          <div className="tabla-historial">

            <table>

              <thead>

                <tr>
                  <th>Fecha</th>
                  <th>Servicio</th>
                  <th>Barbero</th>
                  <th>Estado</th>
                </tr>

              </thead>

              <tbody>

                {historial.map((servicio) => (

                  <tr key={servicio.id}>

                    <td>{servicio.fecha}</td>

                    <td>{servicio.servicio}</td>

                    <td>{servicio.barbero}</td>

                    <td>{servicio.estado}</td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </section>

      )}

    </div>
  );
}

export default ClientePanel;