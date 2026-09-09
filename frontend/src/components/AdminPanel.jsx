import { useState } from 'react';

import ClienteForm from './ClienteForm';
import ClienteList from './ClienteList';
import CitaPanel from './CitaPanel';
import BarberoPanel from './BarberoPanel';
import ServicioPanel from './ServicioPanel';
import PagoPanel from './PagoPanel';
import ReportePanel from './ReportePanel';

function AdminPanel() {

    const [moduloActivo, setModuloActivo] = useState('clientes');

    return (
    <div className="panel-admin">

        <div className="panel-titulo">
        <h2>Panel del administrador</h2>
        <p>Gestión general de la barbería</p>
        </div>

        <nav className="menu-admin">

        <button onClick={() => setModuloActivo('clientes')}>
            Clientes
        </button>

        <button onClick={() => setModuloActivo('barberos')}>
            Barberos
        </button>

        <button onClick={() => setModuloActivo('servicios')}>
            Servicios
        </button>

        <button onClick={() => setModuloActivo('citas')}>
            Citas
        </button>

        <button onClick={() => setModuloActivo('pagos')}>
            Pagos
        </button>

        <button onClick={() => setModuloActivo('reportes')}>
            Reportes
        </button>

        </nav>

        <section className="contenido-modulo">

        {moduloActivo === 'clientes' && (
            <>
            <ClienteForm />
            <ClienteList />
            </>
        )}

        {moduloActivo === 'barberos' && (
            <BarberoPanel />
        )}

        {moduloActivo === 'servicios' && (
            <ServicioPanel />
        )}

        {moduloActivo === 'citas' && (
            <CitaPanel />
        )}

        {moduloActivo === 'pagos' && (
            <PagoPanel />
        )}

        {moduloActivo === 'reportes' && (
            <ReportePanel />
        )}

        </section>

    </div>
    );
}

export default AdminPanel;