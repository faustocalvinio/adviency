import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>Regalos:</h1>
      {/* --- Inicio mensaje a borrar */}
      <div
        style={{
          margin: 24,
          padding: 12,
          backgroundColor: "gold",
          display: "grid",
          borderRadius: 4,
          gap: 12,
        }}
      >
        <p>
          🔔 Recordá que la idea es empezar la app de 0 cada día, no editar la
          del día anterior, si no te dan los tiempos o te parece mucho, editá la
          anterior, mejor poco que nada! 🔔
        </p>

        <p>Borrá esta caja y empezá!</p>
      </div>
      {/* --- Fin mensaje a borrar */}
    </div>
  );
}
