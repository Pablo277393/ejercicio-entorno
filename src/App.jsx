// src/App.jsx
import React, { useEffect, useState, useRef } from "react";

/*
  App.jsx - Versión mejorada y completa
  - Mantiene exactamente los datos originales que proporcionaste.
  - Un solo fichero, con estilos inyectados por <style> para no depender de archivos externos.
  - Funcional en Vite + React sin dependencias adicionales.
*/

/* ============================
   ESTILOS: inyectados en el head
   ============================ */
const GLOBAL_CSS = `
:root{
  --bg:#0f1724; /* dark bluish */
  --card:#0b1220;
  --muted:#94a3b8;
  --accent:#2563eb;
  --glass: rgba(255,255,255,0.04);
  --glass-2: rgba(255,255,255,0.02);
  --success: #10b981;
  --danger:#ef4444;
  --text: #e6eef8;
  --surface: linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
  --radius: 14px;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
}

/* Light theme */
.light {
  --bg: #f6f8fb;
  --card: #ffffff;
  --muted: #5b6b7a;
  --accent: #2563eb;
  --glass: rgba(8,15,25,0.03);
  --glass-2: rgba(8,15,25,0.02);
  --success: #059669;
  --danger: #dc2626;
  --text: #0b1220;
  --surface: linear-gradient(135deg, rgba(0,0,0,0.02), rgba(0,0,0,0.01));
}

/* Reset & base */
* { box-sizing: border-box; }
html,body,#root { height: 100%; }
body {
  margin:0;
  padding:0;
  background: radial-gradient(1200px 600px at 10% 10%, rgba(37,99,235,0.06), transparent),
              radial-gradient(1000px 500px at 90% 90%, rgba(99,102,241,0.04), transparent),
              var(--bg);
  color: var(--text);
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
  line-height:1.45;
  transition: background 300ms ease, color 300ms ease;
  padding-bottom: 80px;
}

/* Container */
.app {
  max-width: 1100px;
  margin: 28px auto;
  padding: 28px;
}

/* Top nav */
.topbar {
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:16px;
  padding:14px 20px;
  border-radius: 16px;
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
  box-shadow: 0 6px 30px rgba(2,6,23,0.45);
  backdrop-filter: blur(6px);
  margin-bottom: 22px;
}
.brand {
  display:flex;
  gap:12px;
  align-items:center;
}
.logo {
  width:48px; height:48px; border-radius:10px;
  display:grid; place-items:center;
  background:linear-gradient(135deg,var(--accent), #7c3aed);
  color:white; font-weight:800; font-size:18px;
  box-shadow: 0 6px 20px rgba(37,99,235,0.18);
}
.site-title { font-weight:700; font-size:18px; }
.site-sub { font-size:12px; color:var(--muted); margin-top:2px; }

/* Nav links */
.nav {
  display:flex; gap:8px; align-items:center;
}
.nav a {
  color:var(--text);
  text-decoration:none;
  padding:8px 12px;
  border-radius:10px;
  font-weight:600;
  font-size:14px;
}
.nav a:hover { background:var(--glass); color:var(--accent); transform:translateY(-2px); transition: all 180ms ease; }

/* Hero */
.hero {
  display:flex; gap:20px; align-items:center;
  padding:22px; border-radius:var(--radius);
  background: linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.02));
  box-shadow: 0 8px 30px rgba(2,6,23,0.35);
  margin-bottom:20px;
}
.hero-left { flex:1; }
.hero h1 { margin:0; font-size:28px; line-height:1.05; }
.hero p { margin:12px 0 0; color:var(--muted); font-size:15px; max-width:70ch; }

/* Controls row */
.controls {
  display:flex; gap:12px; align-items:center; margin-top:14px;
}
.input {
  display:flex; align-items:center; gap:8px;
  background:var(--glass); padding:8px 10px; border-radius:10px;
  color:var(--text);
}
.input input {
  background:transparent; border:0; outline:none; color:var(--text); font-size:14px;
}
.btn {
  background: linear-gradient(180deg,var(--accent), #1e40af);
  color:white; border:0; padding:10px 14px; border-radius:10px; cursor:pointer; font-weight:700;
  box-shadow: 0 10px 20px rgba(2,6,23,0.25); transition: transform 160ms ease, box-shadow 160ms;
}
.btn.secondary { background: transparent; color:var(--text); border: 1px solid rgba(255,255,255,0.04); box-shadow:none; }
.btn:active { transform: translateY(1px); }

/* Grid of cards / sections */
.section { margin-top:26px; padding:18px; border-radius:14px; background:var(--card); box-shadow: 0 8px 20px rgba(2,6,23,0.35); }
.section h2 { margin:0 0 12px 0; font-size:18px; }

/* Personas list */
.person-list { display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:14px; }
.person-card {
  display:flex; gap:14px; padding:14px; align-items:center; border-radius:12px;
  background: linear-gradient(180deg,var(--surface), rgba(255,255,255,0.01));
  border: 1px solid rgba(255,255,255,0.03);
  transition: transform 300ms cubic-bezier(.2,.9,.2,1), box-shadow 300ms;
  position:relative; overflow:hidden;
}
.person-card:hover { transform: translateY(-6px); box-shadow: 0 14px 40px rgba(2,6,23,0.45); }

/* Avatar */
.avatar {
  width:120px; height:120px; border-radius:12px; overflow:hidden; flex-shrink:0;
  border: 2px solid rgba(255,255,255,0.03);
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.02));
  display:grid; place-items:center;
}
.avatar img { width:100%; height:100%; object-fit:cover; display:block; }

/* Info area */
.p-info { flex:1; min-width:0; }
.p-info h3 { margin:0 0 6px 0; font-size:18px; }
.p-info p { margin:0 0 8px 0; color:var(--muted); font-size:14px; line-height:1.25; }

/* Actions */
.actions { display:flex; gap:8px; align-items:center; margin-top:6px; }
.link-btn {
  padding:8px 10px; border-radius:8px; background:var(--accent); color:white; border:0; cursor:pointer; font-weight:700;
}
.link-btn[disabled] { background: rgba(255,255,255,0.04); color:var(--muted); cursor:not-allowed; font-weight:600; }

/* small badges */
.badge {
  position:absolute; top:12px; right:12px; padding:8px 10px; border-radius:10px; font-weight:700; font-size:12px;
  background: linear-gradient(90deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
  color:var(--muted);
}

/* big preview modal */
.modal-backdrop {
  position:fixed; inset:0; background: rgba(2,6,23,0.6); display:grid; place-items:center; z-index:1200;
}
.modal {
  width:min(920px, 96%); max-height:92vh; overflow:auto; border-radius:14px; padding:18px; background:var(--card);
  box-shadow: 0 30px 80px rgba(2,6,23,0.6);
}
.modal .close { float:right; background:transparent; color:var(--muted); border:0; font-weight:800; cursor:pointer; font-size:18px; }

/* footer */
.footer { margin-top:28px; display:flex; justify-content:space-between; align-items:center; gap:10px; color:var(--muted); font-size:13px; }

/* small responsive tweaks */
@media (max-width: 720px) {
  .hero { flex-direction:column; text-align:center; }
  .avatar { width:96px; height:96px; }
  .person-card { padding:12px; }
}

/* Fancy animations */
@keyframes floaty {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
  100% { transform: translateY(0px); }
}
.logo { animation: floaty 6s ease-in-out infinite; }

/* subtle shimmer for portrait hover */
.person-card::after {
  content: "";
  position: absolute; left:-40%; top:-50%; width:60%; height:200%; background: linear-gradient(120deg, rgba(255,255,255,0.00) 0%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0.00) 100%);
  transform: rotate(25deg) translateX(-100%); transition: transform 600ms ease;
}
.person-card:hover::after { transform: rotate(25deg) translateX(80%); }

/* print-friendly */
@media print {
  body { background: white; color: black; }
  .topbar, .nav, .controls, .btn, .footer { display:none; }
  .app { margin:0; padding:0; }
  .person-card { box-shadow:none; border:1px solid #ccc; }
}
`;

/* ==================================================
   Persona component: mantiene la firma original
   ================================================== */
function Persona({ nombre, descripcion, imagen, enlace }) {
  // Modal preview state lifted up by App via handler; here include local handlers for image preview
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // botón desactivado si no hay enlace
  const tieneEnlace = !!(enlace && enlace.trim() !== "");

  return (
    <>
      <div className="person-card" role="article" aria-label={`Ficha de ${nombre}`}>
        <div className="avatar" title={nombre}>
          <img src={imagen || "https://via.placeholder.com/320"} alt={nombre} />
        </div>

        <div className="p-info">
          <h3>{nombre}</h3>
          <p>{descripcion || "Aquí puedes escribir la presentación de esta persona."}</p>

          <div className="actions">
            <button
              className="link-btn"
              onClick={() => {
                if (tieneEnlace) window.open(enlace, "_blank", "noopener,noreferrer");
              }}
              disabled={!tieneEnlace}
              aria-disabled={!tieneEnlace}
            >
              {tieneEnlace ? "Abrir enlace" : "Sin enlace"}
            </button>

            <button
              className="btn secondary"
              onClick={() => setIsPreviewOpen(true)}
              aria-haspopup="dialog"
            >
              Ver imagen
            </button>

            <button
              className="btn secondary"
              onClick={() => {
                // imprimir solo la tarjeta (usamos una técnica simple: abrir ventana con contenido)
                const w = window.open("", "_blank", "width=700,height=900");
                if (!w) return alert("Bloqueador de ventanas impide imprimir. Permite popups.");
                const html = `
                  <html>
                    <head>
                      <title>Imprimir - ${nombre}</title>
                      <style>
                        body{ font-family: Arial, Helvetica, sans-serif; padding:20px; color:#222; }
                        .card{ border:1px solid #ddd; padding:18px; border-radius:12px; max-width:600px; }
                        img{ max-width:160px; height:auto; border-radius:8px; float:right; margin-left:12px; }
                        h1{ font-size:20px; margin:0 0 8px 0; }
                        p{ color:#444; }
                      </style>
                    </head>
                    <body>
                      <div class="card">
                        <img src="${imagen}" alt="${nombre}" />
                        <h1>${nombre}</h1>
                        <p>${descripcion}</p>
                        <p><small>Enlace: ${enlace || "no disponible"}</small></p>
                      </div>
                    </body>
                  </html>
                `;
                w.document.write(html);
                w.document.close();
                // esperar el render y abrir diálogo de impresión
                setTimeout(() => {
                  w.print();
                }, 400);
              }}
            >
              Imprimir ficha
            </button>
          </div>
        </div>

        <div className="badge" aria-hidden>
          {tieneEnlace ? "Enlace 🔗" : "Sin enlace"}
        </div>
      </div>

      {/* Modal preview */}
      {isPreviewOpen && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsPreviewOpen(false)}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setIsPreviewOpen(false)} aria-label="Cerrar">
              ✕
            </button>
            <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginTop: 8 }}>
              <div style={{ minWidth: 260, maxWidth: 420 }}>
                <img
                  src={imagen || "https://via.placeholder.com/600"}
                  alt={`Imagen de ${nombre}`}
                  style={{ width: "100%", borderRadius: 12, objectFit: "cover", display: "block" }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ marginTop: 0, marginBottom: 8 }}>{nombre}</h3>
                <p style={{ color: "var(--muted)" }}>{descripcion}</p>
                <div style={{ marginTop: 14 }}>
                  <button
                    className="btn"
                    onClick={() => {
                      if (enlace && enlace.trim()) window.open(enlace, "_blank", "noopener,noreferrer");
                    }}
                    disabled={!enlace}
                  >
                    {enlace ? "Abrir enlace en nueva ventana" : "No hay enlace disponible"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ==================================================
   Datos EXACTOS que proporcionaste (no se cambian)
   ================================================== */
const PERSONAS_ORIGINALES = [
  {
    nombre: "Pablo Gamero:",
    descripcion:
      "Soy alumno de 1ºDAM, soy de Palma del Río y tengo 18 años. Pincha en el botón de abajo y verás nuestro vídeo explicativo del proyecto.",
    imagen:
      "data:image/png;base64,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",
    enlace: "",
  },
  {
    nombre: "Nacho Ruiz:",
    descripcion:
      "Soy alumno de 1ºDAM, soy de Palma del Río y tengo 18 años, me gustan mucho los videojuegos. Pincha en el botón de abajo y verás nuestro repositorio compartido de GitHub.",
    imagen:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIREBUPEw8OExUREBEWFRYWDQ8VFRURFRIaGhUYFRUaHiggGRsxHhUXITEiJyktLi4wFx8zODMuOCgtLisBCgoKDQ0NFQ0NFysZFR0tLSsrNzctKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrLSsrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEBAAMBAQEBAAAAAAAAAAAAAQYHCAUEAwL/xABIEAACAgEBBAYFBwgHCQEAAAAAAQIDBBEFBhIhBxMxQVFhInGBkaEIFCMyUmKCQkNyc5Kxs8IVM0RTdKLBJTVjk7LD0eHwNP/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABYRAQEBAAAAAAAAAAAAAAAAAAARAf/aAAwDAQACEQMRAD8A1QCA0yoIAKCACggAoIAKCACggAoIAKCACggAoIAKCACggAoIAKCACAgAoIAKAQCghQAIAKCBPVqK5t9i72/Jd4FB7ODuntC5a17PzJLxePOCfqc0kepV0ZbXl/YJr15GKv5wrEgZfZ0Y7Xj/AGCT9WRiv+c8zM3M2lUtZ7OzEl3xpdi/yageGBYnGThJOMl2xknGS9cXzRAiggAoIAKCACghQAIAKAQACACggAoIAKCH07M2fdk2xooqnbZN+jGK1fm33JeLfJAfPqZLutuLnbR0lTTw1P8APWtwq/C9G5/hTNrbj9EVGPw35vBkXcmq9NaK36n/AFj83y8u82fFaLRLRLs9RKsaw3e6FsOpKWVbblT7eFN01L8MXxP2y5+BsDZOw8XFXDj4uPSu/q6YRb9bS1ftPQBFAAAAAHybR2XRkR4L6Kbo+FlUJr3SRgm3+hzZ96cqHZiTfZwNzr186pPs8ouJsYAcyb09G20MBObqV9S1+lpUpaLxnX9aPxS8TDkzswwDffotxc7iupUcbIer44x+jsf/ABa13/eWj8dewtSOcwejvBsLIwbnj5NTrmuafbCcftVy7JR/d36PkeaVFBABQQAUEAFICAAQAUEAFBD6dl7Ptybq8amDnZdNRhHzfe33JJNt9yTYH27s7v37QyI4uPDWT5yk9eCuHfOb7l8W+SOlNydzcfZdPV1Lisml1t0kuOx/yxXdFcl5tttuJujVsvGVMNJWT0ldbpzss07vCK7Eu71tt5IZaAAAAAAAAAAAAAAAageRvPu5j7QoePkV8S7YyXKdc+6Vcu5/B9jTXI5q323Qv2XkdVb6dc9XTco6Rsiu77s13x9vYdWHlbz7v07Qxp4t8dYz5qS04q5r6s4PukvjzT1TaA5HB6m8+wbtn5U8S5elDRxkl6Nlb+rOPk9H6mmu48o0yoIAKCACggAgIUKAEAupv7oQ3O+b4/8ASN0PpsmP0aa514z5p+Tlyk/LhXiam6Ot2/6R2hVjyWtUdbbv1MGtY+1uMfxM6pjFJaJJJLRJLkkTTFABFad+UNtdxhi4cZNccrLp6NrVQSjBPy1nJ/hRqfZO8ubitSozMmvTuVspQ9tctYP2ozf5QMn/AEnUn2LCr09but4v3I1kVG5t0+mx6qvaFK07Ovpi+XnOr/WP7JuDZ20acipX0212VyWqnGacfPn3eruOOT+1dJRdanNQk05Q45cEpLsbj2N+Yg6y2hvfs+h6W5+HBr8l5FfF+ynqePf0qbHg9HnJ/o4+TNe+MGcxJJdiKIOmq+lfY8np8909eLlxXvdeh6mDvxsy56Q2jhtvud8Iv3S0ZyiRiDst5MOB2ccOBJty448Kiu1uXZoas3w6aKaW6cGtZE1qndPVUJ/dS9Kz4LwbNFQsai61KShLTigpSUZaPVcUex+0/gQe/tvfPaGY27s29p6+hCbqrS8OCGift1fmZV0E7YlVtN47k+HKomtG+22v04v9nrPea3Mo6LpNbZw9P76XudM0/hqB1OACKwjpX3OW0cNyrjrk4ylOnTtmtPTqb8Hpy+8o+ZzPqdnnN3TPu0sPaDuhHSrM4rY+Ebk/po++Sl+N+BcRgIAKAIAKAAICACggevYk232LTVt9ySA3/wBAOw+qwrM2S9LLs0j+pqbjHT1yc358jaR527mzFiYlGKvzFFcNfFxilJ+16v2nomVAD5dp58MemzIsfDCmuU5v7sVq9PF8gNM/KKxodbiXKceN13QcNfS4FKMoy08NXJa+Zp89PebbtuflWZdrfFZLlHXVV1r6kI+SXver7zyyooICiggAoIAKCACmd9CWNCe2KpTnGLqqvnBN6OdnBwaR8XwzlLT7rMDP1xcidU421zlCdclKEl2xnF6pog7MBj+4u8cdo4NWUtFNpxtivybocpr1d68pIyAihg/THsL53sq2SWtmL9PDx9BPrF7YOfLx0M4P4trUouMkmpJpp9jTWjQHGQPq2vs942RdivXWi+2rVrm1Cbin7Uk/afIaRQQAUEAEABAPb3JxOu2lh1Psll0t/owmpP4RZ4hl/RFXxbbxPKVz92PYB1GACKGtenzabq2ZGiL0eVkVwlz/ADcE7JfGEV7TZRpv5Rz+jwl3dZke/gh/5YGkQAVAAAAAAAAAAAAABuP5Ou02rMrDb5ShXdFeEk+Cb9zr9xu8516AX/taX+Cu/i1HRRFAABzF0yYnVbayNOy1U2L8VUU/jFmFGyun+vTasH9rCq+FtqNalQAAAAAQEAFMx6H7NNt4nm7178eww0yDo+y+p2rh2a6L51XF+qx8H84HWgAIoak+UXj64eLb9jKlH9uqT/kNtmHdLeyHlbIyIRWs6oxugtNXrU+KSS8XFSXtA5dBEwVFBABQQAUEAFBABQQAbU+Tzi8W0L7eeleJw+2y2L/7bOgDVHyetkOvCuy2tHk3KMX41UprVfjlYvwm1yKAADnj5QNmu1a19nBq+N1prMznpsy+s21ctf6quiv29Xxv+IYKVFBABQQAQAAD+q7ZQkpxekoSUovwlF6r4o/kAdlbJzo5FFWRD6t1Vdkf0ZxUl+8+s1x0E7b+cbM+buWs8Ox1tarXqpayqfq0bj+A2ORQklqtGtUygDlXpK3TlszOlUovqLnKzHl3dW3zhr4xb09XC+8xQ683s3ao2jjSxr48nzhNacddmnKcH4/BrVM5q303EzNmTfWw46dfRvhF9W1ry4/7uXZyfsbAxgAFQAAAAAAAAPS3e2LbnZNeJStZ2y0105Qh+VOX3Uufw7Wj9d2t2craFvVY1Mp6NcU3yrrXjOfYvV2vuTOkej3cSnZVLSasvsS625x0b0/IgvyYLw7+192gZBsXZleLj1YtS0hTXGEfFqK7X5vtfrPtAIoRvvKYn0pbc+ZbKvsUtJ2Q6mrmtestTWq80uKX4WBzTvNtP51m5GUnqrsi2cf1bk+D/KonmESKVAAAAABAQAUEAGcdD+8vzHaUFOWlWUlTZz5KTf0U36pcte5TkdPnE7Om+iDfH+kMJV2S1yMVRhbq+c4aehb7UtH5p+KIr9+lPYm0MnGhLZ+VdVZTKUpV13yqd0WuxWJp6rTkm0nq/I0zsLpI2rs6913W3XqEnGyjJlJzTT5pWS1nCXhza8mdOGqenLcpZFD2lTD6bHj9Kkv63HXa34yiuev2dV3IDP8AdXeOjaONHKok3GXKUXpxV2L60Jrua+Kaa5M9WcFJOLSaa0aaTTXg0ct9F++r2Xl8U+KWPelG6K56afVsiu9rny70336HT2Bm131xuqshZXZHWMoyTi15MDCtvdEey8luUaZY03348lCP/LacF7EjCNqdBFkU5U7RqaSb0uolDRL7U4t+/hN6Gu+nTbUsbZTqg2pZdkadU+aracrPY4x4fxgc45VShOUFZXYoyaU4OThPR9sHJJtetI/MgKiggA2pu50LW5VMMh7SxFXbFSjKmq23WL85cGj8muTM72J0L7Noalb1+VJf3lnDDX9CGmvqbZ4HyddtSlDJwJNtVuN1erb0U/RsS8Fqov1yfibnIr8MLDrpgqqq664RWkYQhGMUvKK5H7gAAAAOeunveX5xmRwIS1hhpuej5PImua/DHReuUl3G3+kLeuGzMKeQ9HZL0KIfaua5ar7K+s/JeaOUb7pTlKycnKc5SlKTerlOT1k35ttsD+QQFRQQAUEAEBABQQAU9fdXeG7Z2VDMp5yhylFvRWVv60JeT07e5pPuPHAHYu7e3qc/GhlUS4oTXNcuKE19aE13SX/vsZ6c4ppppNNNNPsafbqcobgb7XbKyOOOs6bGldTrykvtR8Jrufsfl0/sDblGdRHJx7FOE/Y4yXbGce2Ml4EVy50gbrT2bnWY7jLqpSlOifdOlvVJPxjrwv1a9jR8O7+82ZgtvFyraeJ6yimpQk/GVck4t8u3TU6v3g2BjZ1LoyaY2w11WuqlGX2oSXOL80ap2r0Cxb1xs+cV3RupU3+3Fx/6QMLt6X9sOPD85qj95YtPF8U18DE9sbbycufWZOTddJdnHY2o6/Zj2R9iRs2PQNla88/FS8qrX8DFukfcJ7I+bp5PXvI67XSnq1Hq+DTT0nrrxv3FGGAgCKCADZ3ye3/tazzwbv41J0Wc5/J8/wB7T/wN38Wo6MIoAAB820s+vHqnfdZGuuqLlOUnokl/r3ad+pdoZ1WPVK+6yFddcXKUpPRJf/d3ec1dJ/SJZtSzqauKvErl6EXylbJfnLF+6Pd6+wPL6Qt8LNq5bvacaq9YUVt/Vr17X996Jv2LuMYICooIAKCACggAgAAAAAAAB7m6W9eTs2/r8eemuisrlq67YrunHx8Gua954YCuqNxekbE2nFQjLqcjROVE5LXXvdcuyxern4pGZHE0JtNSTaaaaabTTXY0+5myt0embNxVGrJj88qWi1lPhviv1nPj/Fzf2iDo80l8pRf/AIX55f7qjPN3uk3ZmYlw5UKZ6c672qpLyTb4Zexs1f0/7xY2VbjUUXV3OhXSslCalBOfAox4lyb9F6+HIDUwAKgAANnfJ6/3rZ/gLv41J0Ycw9Cu3aMPanHkWRrhbj2VKcnpCM5ThJcT7l6DWvmje+2+kHZmJHiszqJPTVQqmrZv8MNdPW9ERWTmO74b6YezK+LIs9OS9CqGkrZ+qPcvvPRGod7OnDIuTrwafm8Xy62zhnc15R5xh/m9hqnJyZ2zlZZZOyc3rKc5ylOT8ZSfNsDJt+t+8ratidj6umD1rojJuEX9qT5cc/N9nclqzFQCgAAAACAAAAACAgIqggAoIAKCACggAoIAKCACggApEABQQAUEAFBABQQAUEAFBABAQAUEAFBABQQAUEAFBABQQAUEAFBABQQAUEAFBABQQAUEAFBCgQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH//2Q==",
    enlace: "https://github.com/Pablo277393/ejercicio-entorno",
  },
  {
    nombre: "Ángel Armada:",
    descripcion:
      "Soy alumno de 1ºDAM, soy de Palma del Río y tengo 18 años, me gusta el boxeo. Pincha en el botón de abajo y verás el documento que hemos creado para explicar y documentar el trabajo.",
    imagen:
      "data:image/jpeg;base64,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",
    enlace:
      "https://docs.google.com/document/d/1XIKKAOXS9MBjDg1N2QGaXQr2_-1VxqN8PGpTcDHhQFI/edit?usp=sharing",
  },
];

/* ==================================================
   Aplicación principal: menú, secciones, filtros...
   ================================================== */
export default function App() {
  // insertar estilos globales (solo una vez)
  useEffect(() => {
    if (!document.getElementById("app-global-styles")) {
      const s = document.createElement("style");
      s.id = "app-global-styles";
      s.innerHTML = GLOBAL_CSS;
      document.head.appendChild(s);
    }
  }, []);

  // theme: 'dark' | 'light'
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("entornos_theme") || "dark";
    } catch {
      return "dark";
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    try {
      localStorage.setItem("entornos_theme", theme);
    } catch {}
  }, [theme]);

  // personas (puedes later añadir aquí más, se mantiene tu info original)
  const [personas] = useState(PERSONAS_ORIGINALES);

  // search/filter
  const [q, setQ] = useState("");
  const filtered = personas.filter((p) => {
    const text = (p.nombre + " " + p.descripcion).toLowerCase();
    return text.includes(q.trim().toLowerCase());
  });

  // navegación suave
  const equipoRef = useRef(null);
  const docRef = useRef(null);
  const contactoRef = useRef(null);
  const scrollTo = (ref) => ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  // feedback de ayuda: pantalla de bienvenida animada
  const [showTip, setShowTip] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShowTip(false), 6000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="app" role="application" aria-label="Proyecto Entornos - Actividad">
      {/* TOP BAR */}
      <div className="topbar" role="banner">
        <div className="brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ cursor: "pointer" }}>
          <div className="logo">E</div>
          <div>
            <div className="site-title">ACTIVIDAD DE ENTORNOS</div>
            <div className="site-sub">1ºDAM · Proyecto colaborativo</div>
          </div>
        </div>

        <nav className="nav" role="navigation" aria-label="Navegación principal">
          <a onClick={() => scrollTo(equipoRef)} style={{ cursor: "pointer" }}>Equipo</a>
          <a onClick={() => scrollTo(docRef)} style={{ cursor: "pointer" }}>Documento</a>
          <a onClick={() => scrollTo(contactoRef)} style={{ cursor: "pointer" }}>Contacto</a>

          <div style={{ width: 10 }} />

          <button
            className="btn secondary"
            onClick={() => {
              setTheme((t) => (t === "dark" ? "light" : "dark"));
            }}
            title="Cambiar tema"
            aria-pressed={theme === "light"}
          >
            {theme === "light" ? "Modo oscuro" : "Modo claro"}
          </button>
        </nav>
      </div>

      {/* HERO */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-left">
          <h1 id="hero-title">Proyecto: Actividad de Entornos — Presentación del equipo</h1>
          <p>
            Esta página muestra las fichas del equipo con mejoras visuales, navegación, filtros y utilidades (vista previa,
            impresión y acceso directo a repositorios/documentos). Hecho con React — mantenemos los datos originales intactos.
          </p>

          <div className="controls" role="region" aria-label="Controles">
            <div className="input" style={{ minWidth: 220 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden style={{ opacity: 0.7 }}>
                <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.471 6.471 0 001.48-5.34C15.14 5.5 12.64 3 9.5 3S3.86 5.5 3.86 8.39 6.36 13.78 9.5 13.78c1.61 0 3.08-.59 4.2-1.57l.27.28v.79L17 18.5 18.5 17l-3-3z"></path>
              </svg>
              <input
                placeholder="Buscar por nombre o descripción..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
                aria-label="Buscar personas"
              />
            </div>

            <button
              className="btn"
              onClick={() => {
                // export pequeño: print de la página
                window.print();
              }}
              title="Imprimir toda la página"
            >
              Imprimir página
            </button>

            <button
              className="btn secondary"
              onClick={() => {
                setQ("");
              }}
            >
              Limpiar búsqueda
            </button>
          </div>
        </div>

        <div style={{ width: 320, textAlign: "center" }}>
          <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 8 }}>Estado del proyecto</div>
          <div style={{ padding: 16, borderRadius: 12, background: "linear-gradient(180deg, rgba(255,255,255,0.02), transparent)", boxShadow: "inset 0 -6px 30px rgba(0,0,0,0.2)" }}>
            <div style={{ fontWeight: 800, fontSize: 20 }}>En desarrollo</div>
            <div style={{ marginTop: 8, color: "var(--muted)" }}>Mejoras visuales y accesibilidad implementadas</div>
            <div style={{ marginTop: 12 }}>
              <div style={{ height: 8, background: "rgba(255,255,255,0.03)", borderRadius: 8, overflow: "hidden" }}>
                <div style={{ width: "68%", height: "100%", background: "linear-gradient(90deg,var(--accent), #7c3aed)" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TIP */}
      {showTip && (
        <div style={{ marginTop: 12, padding: 12, borderRadius: 10, background: "var(--glass-2)", color: "var(--muted)" }}>
          Consejo: prueba a escribir <strong>"Palma"</strong> o <strong>"video"</strong> en el buscador para filtrar en tiempo real.
        </div>
      )}

      {/* SECCIÓN EQUIPO */}
      <section className="section" ref={equipoRef} aria-labelledby="equipo-title" style={{ marginTop: 22 }}>
        <h2 id="equipo-title">Equipo</h2>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <div style={{ color: "var(--muted)" }}>
            Mostrando <strong>{filtered.length}</strong> de <strong>{personas.length}</strong>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <select
              onChange={(e) => {
                const val = e.target.value;
                if (val === "all") {
                  // no action (we show filtered anyway)
                } else {
                  // quick filter for demo: "con-enlace" o "sin-enlace"
                  if (val === "has") {
                    setQ("__HAS_LINK__");
                    setTimeout(() => setQ(""), 1000); // quick highlight effect
                  } else if (val === "no") {
                    setQ("__NO_LINK__");
                    setTimeout(() => setQ(""), 1000);
                  }
                }
              }}
              aria-label="Filtro rápido"
              style={{ padding: "8px 10px", borderRadius: 8, background: "transparent", color: "var(--text)", border: "1px solid rgba(255,255,255,0.03)" }}
            >
              <option value="all">Filtro rápido</option>
              <option value="has">Con enlace</option>
              <option value="no">Sin enlace</option>
            </select>
          </div>
        </div>

        <div className="person-list" role="list">
          {filtered.map((p, i) => (
            <div role="listitem" key={i}>
              <Persona {...p} />
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN DOCUMENTACIÓN */}
      <section className="section" ref={docRef} aria-labelledby="doc-title" style={{ marginTop: 20 }}>
        <h2 id="doc-title">Documentación y recursos</h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 12 }}>
          <div>
            <p style={{ color: "var(--muted)" }}>
              Aquí tienes enlaces útiles. Si algo no tiene enlace (campo vacío), el botón dentro de la ficha estará desactivado.
            </p>

            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <a className="btn" href="https://github.com/Pablo277393/ejercicio-entorno" target="_blank" rel="noreferrer">Repositorio GitHub</a>
              <a className="btn secondary" href={PERSONAS_ORIGINALES[2].enlace} target="_blank" rel="noreferrer">Documento (Google)</a>
            </div>

            <div style={{ marginTop: 18, color: "var(--muted)" }}>
              Notas: he dejado los recursos tal y como los subiste. Si quieres que el botón "Ver imagen" abra una página separada o reproduzca un vídeo, lo adaptamos.
            </div>
          </div>

          <aside style={{ padding: 12, borderRadius: 12, background: "var(--glass)", color: "var(--muted)" }}>
            <div style={{ fontWeight: 800 }}>Resumen técnico</div>
            <ul style={{ marginTop: 8 }}>
              <li>React + CSS in-file (sin librerías externas)</li>
              <li>Modo Claro/Oscuro guardado en localStorage</li>
              <li>Impresión y export simple de fichas</li>
              <li>Accesibilidad básica (aria-* en elementos clave)</li>
            </ul>
          </aside>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="section" ref={contactoRef} aria-labelledby="contacto-title" style={{ marginTop: 20 }}>
        <h2 id="contacto-title">Contacto</h2>

        <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
          <div style={{ color: "var(--muted)" }}>
            ¿Quieres que integre más funcionalidades—por ejemplo reproducción de vídeo, listar issues del repositorio o autenticación básica? Dímelo y lo implemento.
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <a className="btn secondary" href="mailto:nacho@example.com">Enviar correo</a>
            <button
              className="btn"
              onClick={() => {
                const el = document.querySelector(".person-list");
                if (el) {
                  el.style.transform = "scale(0.98)";
                  setTimeout(() => (el.style.transform = ""), 300);
                }
              }}
            >
              Animar tarjetas
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer" style={{ marginTop: 22 }}>
        <div>© {new Date().getFullYear()} Proyecto Entornos — 1ºDAM</div>
        <div style={{ color: "var(--muted)" }}>Hecho con React — Diseño mejorado</div>
      </footer>
    </div>
  );
}