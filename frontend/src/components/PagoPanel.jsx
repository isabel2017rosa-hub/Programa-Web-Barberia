import { useState } from 'react';

function PagoPanel() {

  const [pagos, setPagos] = useState([
    {
      id: 1,
      cliente: 'Ana Rodríguez',
      servicio: 'Corte de cabello',
      valor: 30000,
      metodo: 'Efectivo',
      estado: 'Pagado'
    },
    {
      id: 2,
      cliente: 'Isabel Turizo',
      servicio: 'Barba y bigote',
      valor: 20000,
      metodo: 'Transferencia',
      estado: 'Pagado'
    }
  ]);

  const [cliente, setCliente] = useState('');
  const [servicio, setServicio] = useState('');
  const [valor, setValor] = useState('');
  const [metodo, setMetodo] = useState('');

  const handleSubmit = (evento) => {
    evento.preventDefault();

    const nuevoPago = {
      id: pagos.length + 1,
      cliente,
      servicio,
      valor: Number(valor),
      metodo,
      estado: 'Pagado'
    };

    setPagos([...pagos, nuevoPago]);

    setCliente('');
    setServicio('');
    setValor('');
    setMetodo('');

    alert('Pago registrado correctamente');
  };

  return (
    <div className="modulo-panel">

      <h2>Gestión de pagos</h2>

      <p>
        En este módulo el administrador puede registrar y consultar
        los pagos realizados por los clientes.
      </p>

      <form className="form-pago" onSubmit={handleSubmit}>

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
          <label>Valor:</label>

          <input
            type="number"
            value={valor}
            onChange={(evento) => setValor(evento.target.value)}
            placeholder="Ejemplo: 30000"
            min="0"
            required
          />
        </div>

        <div>
          <label>Método de pago:</label>

          <select
            value={metodo}
            onChange={(evento) => setMetodo(evento.target.value)}
            required
          >
            <option value="">Seleccionar método</option>
            <option value="Efectivo">Efectivo</option>
            <option value="Transferencia">Transferencia</option>
            <option value="Tarjeta">Tarjeta</option>
          </select>
        </div>

        <button type="submit">
          Registrar pago
        </button>

      </form>


      <div className="lista-pagos">

        <h2>Pagos registrados</h2>

        <table>

          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Servicio</th>
              <th>Valor</th>
              <th>Método</th>
              <th>Estado</th>
            </tr>
          </thead>

          <tbody>

            {pagos.map((pago) => (
              <tr key={pago.id}>

                <td>{pago.id}</td>

                <td>{pago.cliente}</td>

                <td>{pago.servicio}</td>

                <td>
                  ${pago.valor.toLocaleString('es-CO')}
                </td>

                <td>{pago.metodo}</td>

                <td>{pago.estado}</td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default PagoPanel;   
