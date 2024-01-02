import { useState } from "react";
import "./styles.css";

type Regalos = string

export default function App() {

  const [regalos, setRegalos] = useState<Regalos[]>(['PS5','PC Gaming','Nintendo'])

  function agregarRegalo(event:any) {
    event.preventDefault();
    const valorNuevoRegalo =event.target[0].value;
    setRegalos( regalosViejos => [...regalosViejos, valorNuevoRegalo ]);
    event.target[0].value = '';
  }

  return (
    <div className="App">
      <h1>Regalos:</h1>
      <form action="" onSubmit={(event)=>agregarRegalo(event)}>
        <input type="text" placeholder="Regalo Nuevo" />
        <button type="submit">Agregar</button>
      </form>
      <ul>
        {
          regalos.map((regalo, index) => (
            <li key={index}>{regalo}</li>
          ))
        }
      </ul>
    </div>
  );
}
