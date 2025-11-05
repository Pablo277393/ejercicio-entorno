import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import React from "react";

function Persona({ nombre, descripcion, imagen, enlace }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "20px",
        margin: "30px 0",
        padding: "20px",
        border: "2px solid #ccc",
        borderRadius: "15px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      {/* Texto a la izquierda */}
      <div style={{ flex: 1 }}>
        <h2 style={{ marginBottom: "10px", color: "#333" }}>{nombre}</h2>
        <p style={{ fontSize: "1.1em", color: "#555" }}>
          {descripcion || "Aquí puedes escribir la presentación de esta persona."}
        </p>
        <button
          onClick={() => window.open(enlace || "#", "_blank")}
          style={{
            marginTop: "10px",
            padding: "10px 15px",
            backgroundColor: "#0078ff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Pincha aquí
        </button>
      </div>

      {/* Imagen a la derecha */}
      <div style={{ flex: "0 0 200px", textAlign: "center" }}>
        <img
          src={imagen || "https://via.placeholder.com/180"}
          alt={nombre}
          style={{
            width: "180px",
            height: "180px",
            borderRadius: "15px",
            objectFit: "cover",
            border: "2px solid #ccc",
          }}
        />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
        -ACTIVIDAD DE ENTORNOS- 
      </h1>

      <Persona
        nombre="Pablo Gamero:"
        descripcion="Soy alumno de 1ºDAM, soy de Palma del Río y tengo 18 años. Pincha en el botón de abajo y verás nuestro vídeo explicativo del proyecto."
        imagen="data:image/png;base64,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"
        enlace=""
      />

      <Persona
        nombre="Nacho Ruiz:"
        descripcion="Soy alumno de 1ºDAM, soy de Palma del Río y tengo 18 años, me gustan mucho los videojuegos. Pincha en el botón de abajo y verás nuestro repositorio compartido de GitHub."
        imagen="data:image/jpeg;base64,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"
        enlace="https://github.com/Pablo277393/ejercicio-entorno"
      />

      <Persona
        nombre="Ángel Armada:"
        descripcion="Soy alumno de 1ºDAM, soy de Palma del Río y tengo 18 años, me gusta el boxeo. Pincha en el botón de abajo y verás el documento que hemos creado para explicar y documentar el trabajo."
        imagen="data:image/jpeg;base64,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"
        enlace="https://docs.google.com/document/d/1XIKKAOXS9MBjDg1N2QGaXQr2_-1VxqN8PGpTcDHhQFI/edit?usp=sharing"
      />
    </div>
  );
}






