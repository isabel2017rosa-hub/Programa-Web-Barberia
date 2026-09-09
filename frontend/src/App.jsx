import { useState } from 'react';

import AdminPanel from './components/AdminPanel';
import ClientePanel from './components/ClientePanel';
import BarberoPanel from './components/BarberoPanel';

import './App.css';


function App() {

  // Rol que se está visualizando actualmente
  const [rolActivo, setRolActivo] = useState('administrador');


  return (

    <div className="app">


      {/* =====================================================
          ENCABEZADO GENERAL
          ===================================================== */}

      <header className="encabezado">

        <h1>Barbería</h1>

        <p>
          Sistema de gestión de clientes
        </p>

      </header>


      {/* =====================================================
          SELECTOR DE ROL
          ===================================================== */}

      <div
        style={{
          width: '90%',
          maxWidth: '1100px',
          margin: '25px auto 0',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '10px',
          flexWrap: 'wrap'
        }}
      >

        <button
          onClick={() => setRolActivo('administrador')}
          style={{
            backgroundColor:
              rolActivo === 'administrador'
                ? '#555'
                : '#222'
          }}
        >
          Administrador
        </button>


        <button
          onClick={() => setRolActivo('cliente')}
          style={{
            backgroundColor:
              rolActivo === 'cliente'
                ? '#555'
                : '#222'
          }}
        >
          Cliente
        </button>


        <button
          onClick={() => setRolActivo('barbero')}
          style={{
            backgroundColor:
              rolActivo === 'barbero'
                ? '#555'
                : '#222'
          }}
        >
          Barbero
        </button>

      </div>


      {/* =====================================================
          CONTENIDO PRINCIPAL
          ===================================================== */}

      <main className="contenido">


        {/* ===================================================
            PANEL ADMINISTRADOR
            =================================================== */}

        {rolActivo === 'administrador' && (

          <AdminPanel />

        )}


        {/* ===================================================
            PANEL CLIENTE
            =================================================== */}

        {rolActivo === 'cliente' && (

          <ClientePanel />

        )}


        {/* ===================================================
            PANEL BARBERO
            =================================================== */}

        {rolActivo === 'barbero' && (

          <BarberoPanel />

        )}

      </main>

    </div>

  );
}


export default App;