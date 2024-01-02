import { useState } from "react";
import "./styles.css";

interface Regalos{
  id: number;
  nombre: string;
}
function getRandomNumber(min=1, max=10000000000000) {  
  const randomNumber = Math.random() * (max - min) + min;   
  return Math.floor(randomNumber);
}

const regalosConId = [{
    id: getRandomNumber(),
    nombre: "PC"
  },
  {
    id:getRandomNumber(),
    nombre: "PS5",
  },
  {
    id:getRandomNumber(),
    nombre: "Nintendo DS",
  }
]

export default function App() {

  const [regalos, setRegalos] = useState<Regalos[]>(regalosConId)


  function agregarRegalo(event:any) {
    event.preventDefault();
    const nuevoRegalo = event.target[0].value;
    setRegalos( regalosPrevios => [...regalosPrevios, {id:getRandomNumber(),nombre:nuevoRegalo}]);
    event.target[0].value = "";
  }

  function removerRegaloPorId(id:number) {
    console.log(id);

    setRegalos(regalos.filter( (item) => item.id !== id))

  }


  return (
    <div className="App">
      <h1>Regalos:</h1>
      <form onSubmit={(e)=>agregarRegalo(e)} >
        <input type="text" placeholder="Regalo Nuevo..." />
        <button type="submit">Agregar</button>
      </form>
      {
        regalos.map( (item) => (
          <li key={item.id} >{item.nombre} <button onClick={ () => removerRegaloPorId(item.id) }>Remove</button></li>
        ))
      }
    </div>
  );
}

