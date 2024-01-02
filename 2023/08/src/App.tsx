import { useState } from "react";
import "./styles.css";

interface Regalo {
  id: string;
  nombre: string;
  cantidad: number;
}

const regalosIniciales:Regalo[] = [
  { id: crypto.randomUUID(), nombre: "PC", cantidad:1 },
  { id: crypto.randomUUID(), nombre: "PS5", cantidad:1  },
  { id: crypto.randomUUID(), nombre: "Nintendo DS", cantidad:1},
  { id: crypto.randomUUID(), nombre: "Viaje a Seoul", cantidad:1  },
]

export default function App() {

  const [regalos, setRegalos] = useState<Regalo[]>(regalosIniciales);
  const [regaloInput, setRegaloInput] = useState<string>("");
  const [amountInput, setAmountInput] = useState<number>(1);

  function addGiftHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();    

    if (regalos.find(regalo => regalo.nombre === regaloInput) || regaloInput === "" )  {
      if(regaloInput === "" ) alert("El input está vacío")
      else alert("El regalo ya existe");      
      return
    }  
    
    setRegalos(previos => [...previos , { id:crypto.randomUUID(), nombre:regaloInput, cantidad:amountInput }]);
    setAmountInput(1);
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
        <input type="number" name="" value={amountInput} id="" placeholder="1" onChange={ (e) => setAmountInput(parseInt(e.target.value)) } />
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