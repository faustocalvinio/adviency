import { useState } from "react";
import "./styles.css";

interface Regalo {
  id: string;
  nombre: string;
}

const regalosIniciales = [
  { id: crypto.randomUUID(), nombre: "PC" },
  { id: crypto.randomUUID(), nombre: "PS5" },
  { id: crypto.randomUUID(), nombre: "Nintendo DS" },
  { id: crypto.randomUUID(), nombre: "Viaje a Seoul" },
]

export default function App() {

  const [regalos, setRegalos] = useState<Regalo[]>(regalosIniciales);
  const [regaloInput, setRegaloInput] = useState<string>("")

  function addGiftHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();    

    if (regalos.find(regalo => regalo.nombre === regaloInput) || regaloInput === "" )  {
      if(regaloInput === "" ) alert("El input está vacío")
      else alert("El regalo ya existe");      
      return
    }  
    
    setRegalos(previos => [...previos,{id:crypto.randomUUID(),nombre:regaloInput}]);
    setRegaloInput("");
  }

  function removeGiftById(id:string) {
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
          <li key={regalo.id} className="regalo-container">
            <span>🎁  {regalo.nombre}</span>
            <button onClick={()=>removeGiftById(regalo.id)} >Borrar</button>
          </li>          
        ))
      }
      <button style={{width:'100%'}} onClick={()=>removeAllGifts()} >Borrar todos los regalos</button>
    </div>
  );
}