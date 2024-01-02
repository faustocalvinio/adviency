import { useState } from "react";
import "./styles.css";

interface Regalo {
  id: number;
  nombre: string;
};

function getRandomNumber(min=1, max=10000000000000) {  
  const randomNumber = Math.random() * (max - min) + min;   
  return Math.floor(randomNumber);
};

const regalosIniciales = [
  { id: getRandomNumber(), nombre: "PC" },
  { id: getRandomNumber(), nombre: "PS5" },
  { id: getRandomNumber(), nombre: "Nintendo DS" },
  { id: getRandomNumber(), nombre: "Viaje a Seoul" },

]

export default function App() {

  const [regalos, setRegalos] = useState<Regalo[]>(regalosIniciales);
  const [regaloInput, setRegaloInput] = useState<string>("")

  function addGiftHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if(regaloInput === "") return;
    console.log(regaloInput);
    setRegalos(previos => [...previos,{id:getRandomNumber(),nombre:regaloInput}]);
    setRegaloInput("");
  }

  function removeGiftById(id:number) {
      setRegalos(previos => previos.filter(regalo => regalo.id !== id));
  }
  function removeAllGifts() {
    setRegalos([]);
    setRegaloInput("");
    console.log("Borrar todos los regalos");
    return;
  }

  return (
    <div className="App">
      <h1>Regalos:</h1>
      <form onSubmit={(e)=>addGiftHandler(e)}>
        <input value={regaloInput} onChange={(e)=>setRegaloInput(e.target.value)} type="text" placeholder="Nombre del regalo" />
        <button type="submit">Agregar</button>
      </form>
      {
        regalos.length === 0 && <h2 className="no-gifts">No hay regalos <br />🥺</h2>
      }
      {
        regalos.map((regalo) => (
          <li key={regalo.id}>{regalo.nombre}  <button onClick={()=>removeGiftById(regalo.id)} >Borrar</button></li>
        ))
      }
      <button style={{width:'100%'}} onClick={()=>removeAllGifts()} >Borrar todos los regalos</button>
    </div>
  );
}