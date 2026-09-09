import { useState } from 'react';

function BarberoPanel() {

  /* =====================================================
     DATOS DE LAS CITAS
     ===================================================== */

  const [citas, setCitas] = useState([
    {
      id: 1,
      hora: '09:00',
      cliente: 'Juan Pérez',
      servicio: 'Corte premium',
      estado: 'Terminada'
    },
    {
      id: 2,
      hora: '10:30',
      cliente: 'Andrés Gómez',
      servicio: 'Barba + facial',
      estado: 'En proceso'
    },
    {
      id: 3,
      hora: '11:45',
      cliente: 'Luis Martínez',
      servicio: 'Corte de cabello',
      estado: 'Pendiente'
    }
  ]);


  /* =====================================================
     ESTADO DE DISPONIBILIDAD
     ===================================================== */

  const [disponible, setDisponible] = useState(true);


  /* =====================================================
     FECHA DE CONSULTA
     ===================================================== */

  const [fecha, setFecha] = useState('2026-09-05');


  /* =====================================================
     CAMBIAR DISPONIBILIDAD
     ===================================================== */

  const cambiarDisponibilidad = () => {

    setDisponible(!disponible);

  };


  /* =====================================================
     INICIAR CITA
     ===================================================== */

  const iniciarCita = (id) => {

    setCitas(
      citas.map((cita) =>
        cita.id === id
          ? {
              ...cita,
              estado: 'En proceso'
            }
          : cita
      )
    );

  };


  /* =====================================================
     TERMINAR CITA
     ===================================================== */

  const terminarCita = (id) => {

    setCitas(
      citas.map((cita) =>
        cita.id === id
          ? {
              ...cita,
              estado: 'Terminada'
            }
          : cita
      )
    );

  };


  /* =====================================================
     CANCELAR CITA
     ===================================================== */

  const cancelarCita = (id) => {

    const confirmar = window.confirm(
      '¿Deseas cancelar esta cita?'
    );

    if (!confirmar) {
      return;
    }

    setCitas(
      citas.map((cita) =>
        cita.id === id
          ? {
              ...cita,
              estado: 'Cancelada'
            }
          : cita
      )
    );

  };


  /* =====================================================
     CONTADORES
     ===================================================== */

  const totalCitas = citas.length;

  const citasTerminadas = citas.filter(
    (cita) => cita.estado === 'Terminada'
  ).length;

  const citasPendientes = citas.filter(
    (cita) => cita.estado === 'Pendiente'
  ).length;


  /* =====================================================
     GANANCIA ESTIMADA
     ===================================================== */

  const gananciaEstimada = citasTerminadas * 30000;


  /* =====================================================
     RENDER
     ===================================================== */

  return (

    <div className="barbero-panel">


      {/* =================================================
          ENCABEZADO
          ================================================= */}

      <div className="barbero-encabezado">

        <div>

          <h2>Panel del barbero</h2>

          <p>
            Bienvenido, Carlos Barber
          </p>

        </div>


        <button className="boton-cerrar">
          Cerrar sesión
        </button>

      </div>


      {/* =================================================
          INFORMACIÓN DEL BARBERO
          ================================================= */}

      <section className="barbero-info">

        <div>

          <h2>Agenda de trabajo</h2>

          <p>
            Consulta y gestiona las citas programadas
            para tu jornada.
          </p>

        </div>


        <div className="disponibilidad">

          <span>
            Disponibilidad:
          </span>

          <button
            onClick={cambiarDisponibilidad}
            className={
              disponible
                ? 'estado-disponible'
                : 'estado-no-disponible'
            }
          >

            {disponible
              ? 'Disponible'
              : 'No disponible'}

          </button>

        </div>

      </section>


      {/* =================================================
          FILTRO DE AGENDA
          ================================================= */}

      <section className="filtro-agenda">

        <h3>Filtrar agenda</h3>

        <div className="campo-fecha">

          <label htmlFor="fecha">
            Seleccionar fecha:
          </label>

          <input
            id="fecha"
            type="date"
            value={fecha}
            onChange={(evento) =>
              setFecha(evento.target.value)
            }
          />

        </div>


        <button className="boton-buscar">
          Buscar citas
        </button>

      </section>


      {/* =================================================
          RESUMEN DE LA JORNADA
          ================================================= */}

      <section className="resumen-barbero">

        <div className="tarjeta-barbero">

          <h3>
            {totalCitas}
          </h3>

          <p>
            Total de citas
          </p>

        </div>


        <div className="tarjeta-barbero">

          <h3>
            {citasPendientes}
          </h3>

          <p>
            Citas pendientes
          </p>

        </div>


        <div className="tarjeta-barbero">

          <h3>
            {citasTerminadas}
          </h3>

          <p>
            Citas terminadas
          </p>

        </div>


        <div className="tarjeta-barbero">

          <h3>
            ${gananciaEstimada.toLocaleString('es-CO')}
          </h3>

          <p>
            Ganancia estimada
          </p>

        </div>

      </section>


      {/* =================================================
          CITAS PROGRAMADAS
          ================================================= */}

      <section className="lista-citas-barbero">

        <h2>
          Citas programadas
        </h2>

        <p>
          Agenda correspondiente al día seleccionado:
          <strong> {fecha}</strong>
        </p>


        <div className="tabla-barbero">

          <table>

            <thead>

              <tr>

                <th>
                  Hora
                </th>

                <th>
                  Cliente
                </th>

                <th>
                  Servicio
                </th>

                <th>
                  Estado
                </th>

                <th>
                  Acciones
                </th>

              </tr>

            </thead>


            <tbody>

              {citas.map((cita) => (

                <tr key={cita.id}>

                  <td>
                    {cita.hora}
                  </td>

                  <td>
                    {cita.cliente}
                  </td>

                  <td>
                    {cita.servicio}
                  </td>

                  <td>

                    <span
                      className={`estado-cita estado-${cita.estado
                        .toLowerCase()
                        .replace(' ', '-')}`}
                    >

                      {cita.estado}

                    </span>

                  </td>


                  <td>

                    <div className="acciones-barbero">

                      {cita.estado === 'Pendiente' && (

                        <button
                          onClick={() =>
                            iniciarCita(cita.id)
                          }
                        >
                          Iniciar
                        </button>

                      )}


                      {cita.estado === 'En proceso' && (

                        <button
                          onClick={() =>
                            terminarCita(cita.id)
                          }
                        >
                          Marcar terminada
                        </button>

                      )}


                      {cita.estado !== 'Terminada' &&
                        cita.estado !== 'Cancelada' && (

                        <button
                          onClick={() =>
                            cancelarCita(cita.id)
                          }
                        >
                          Cancelar
                        </button>

                      )}

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </section>


      {/* =================================================
          INFORMACIÓN
          ================================================= */}

      <section className="informacion-barbero">

        <h3>
          Información de la jornada
        </h3>

        <p>
          El barbero puede consultar las citas
          programadas y actualizar su estado durante
          la atención del cliente.
        </p>

      </section>


    </div>

  );
}

export default BarberoPanel;