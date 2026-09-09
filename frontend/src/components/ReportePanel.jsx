import { useState } from 'react';

function ReportePanel() {

  const [periodo, setPeriodo] = useState('mes');

  const reportes = {
    mes: {
      ingresos: '$1.250.000',
      citas: 42,
      clientes: 15,
      servicios: 38
    },

    semana: {
      ingresos: '$380.000',
      citas: 14,
      clientes: 6,
      servicios: 12
    },

    dia: {
      ingresos: '$150.000',
      citas: 6,
      clientes: 4,
      servicios: 6
    }
  };

  const datos = reportes[periodo];

  return (
    <div className="modulo-panel">

      {/* =====================================================
          TÍTULO
          ===================================================== */}

      <h2>Reportes</h2>

      <p>
        Consulta información resumida sobre la operación de la
        barbería.
      </p>


      {/* =====================================================
          FILTRO DEL PERIODO
          ===================================================== */}

      <div className="filtro-reportes">

        <label htmlFor="periodo">
          Periodo:
        </label>

        <select
          id="periodo"
          value={periodo}
          onChange={(evento) => setPeriodo(evento.target.value)}
        >
          <option value="dia">Hoy</option>
          <option value="semana">Esta semana</option>
          <option value="mes">Este mes</option>
        </select>

      </div>


      {/* =====================================================
          TARJETAS DE RESUMEN
          ===================================================== */}

      <div className="tarjetas-reportes">

        <div className="tarjeta-reporte">
          <h3>Ingresos</h3>
          <strong>{datos.ingresos}</strong>
          <p>Ingresos registrados</p>
        </div>


        <div className="tarjeta-reporte">
          <h3>Citas</h3>
          <strong>{datos.citas}</strong>
          <p>Citas registradas</p>
        </div>


        <div className="tarjeta-reporte">
          <h3>Clientes</h3>
          <strong>{datos.clientes}</strong>
          <p>Clientes atendidos</p>
        </div>


        <div className="tarjeta-reporte">
          <h3>Servicios</h3>
          <strong>{datos.servicios}</strong>
          <p>Servicios realizados</p>
        </div>

      </div>


      {/* =====================================================
          RESUMEN
          ===================================================== */}

      <div className="resumen-reportes">

        <h3>Resumen del periodo</h3>

        <p>
          Durante el periodo seleccionado se registraron{' '}
          <strong>{datos.citas}</strong> citas y{' '}
          <strong>{datos.servicios}</strong> servicios realizados.
        </p>

        <p>
          Los ingresos registrados corresponden a un total de{' '}
          <strong>{datos.ingresos}</strong>.
        </p>

      </div>


      {/* =====================================================
          REPORTE DE SERVICIOS
          ===================================================== */}

      <div className="lista-reportes">

        <h3>Servicios más realizados</h3>

        <table>

          <thead>
            <tr>
              <th>Servicio</th>
              <th>Cantidad</th>
              <th>Valor generado</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>Corte de cabello</td>
              <td>20</td>
              <td>$600.000</td>
            </tr>

            <tr>
              <td>Barba y bigote</td>
              <td>12</td>
              <td>$240.000</td>
            </tr>

            <tr>
              <td>Corte + barba</td>
              <td>6</td>
              <td>$240.000</td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ReportePanel;