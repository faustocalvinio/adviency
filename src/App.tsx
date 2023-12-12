import { useEffect, useState } from "react";
import "./styles.css";

interface Regalo {
  id: string;
  nombre: string;
  cantidad: number;
  destinatario:string;
  imagen?:string;
}

const regalosIniciales:Regalo[] = [

  { 
    id: crypto.randomUUID(),
    nombre: "PC", 
    cantidad:1,
    imagen:'https://i.dell.com/sites/csimages/Product_Imagery/all/prod-2585-notebook-alienware-m18-ff-800x550.png',
    destinatario:'John Doe'
  },
  { 
    id: crypto.randomUUID(), 
    nombre: "PS5", 
    cantidad:1, 
    imagen:'https://cdn.idealo.com/folder/Product/200584/7/200584783/s11_produktbild_gross_1/sony-playstation-5-ps5-standard-edition.jpg', 
    destinatario:'John Doe'  
  },
  { 
    id: crypto.randomUUID(), 
    nombre: "Nintendo DS", 
    cantidad:1, 
    imagen:'https://americansgameocio.com/4735-large_default/nintendo-ds.jpg', 
    destinatario:'John Doe'
  },

  { id: crypto.randomUUID(), nombre: "PC", cantidad:1, imagen:'https://i.dell.com/sites/csimages/Product_Imagery/all/prod-2585-notebook-alienware-m18-ff-800x550.png' },
  { id: crypto.randomUUID(), nombre: "PS5", cantidad:1, imagen:'https://cdn.idealo.com/folder/Product/200584/7/200584783/s11_produktbild_gross_1/sony-playstation-5-ps5-standard-edition.jpg'  },
  { id: crypto.randomUUID(), nombre: "Nintendo DS", cantidad:1, imagen:'https://americansgameocio.com/4735-large_default/nintendo-ds.jpg'},

]

export default function App() {  

  const [regalos, setRegalos] = useState<Regalo[]>( JSON.parse(localStorage.getItem("regalos")!) || regalosIniciales);
  const [regaloInput, setRegaloInput] = useState<string>("");
  const [amountInput, setAmountInput] = useState<number>(1);
  const [urlInput, setUrlInput] = useState<string>();
  const [displayForm, setDisplayForm] = useState<boolean>(false)

  const [destinatarioInput, setDestinatarioInput] = useState<string>("");

  function updateLocalStorage() {
    localStorage.setItem("regalos", JSON.stringify(regalos));
  }

  function vaciarInputs() {
    setAmountInput(1);
    setRegaloInput("");
    setUrlInput("");

    setDestinatarioInput("");


    setDisplayForm(false);
  }

  function addGiftHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();    

    if (regalos.find(regalo => regalo.nombre === regaloInput) || regaloInput === "" )  {
      if(regaloInput === "" ) alert("El input está vacío")
      else alert("El regalo ya existe");      
      return
    }  
    
    setRegalos(previos => [...previos , { 
      id:crypto.randomUUID(), 
      nombre:regaloInput, 
      cantidad:amountInput, 
      imagen:urlInput,
      destinatario: 'Mbappe' 
    }]);
    setRegalos(previos => [...previos , { id:crypto.randomUUID(), nombre:regaloInput, cantidad:amountInput, imagen:urlInput }]);
    vaciarInputs();
  }

  function removeGiftById(id:string) {
      setRegalos(previos => previos.filter(regalo => regalo.id !== id));      
  }

  function removeAllGifts() {
    setRegalos([]);
    setRegaloInput("");    
    return;
  }

  useEffect(() => {
    updateLocalStorage();
  }, [regalos]);
  

  return (
    <div className="App">
      <h1>Regalos:</h1>
      <button id="agregar-regalo-btn" onClick={()=>setDisplayForm(!displayForm)} >Agregar regalo</button>
      <div className={`${ displayForm ? 'display-form' : 'display-none'  }`}>
        <form onSubmit={(e)=>addGiftHandler(e)}>
          <label htmlFor="regalo-nombre">Agregá un regalo! 🙂</label>
          <input name="regalo-nombre" value={regaloInput} onChange={(e)=>setRegaloInput(e.target.value)} type="text" placeholder="Nombre del regalo" />
          <input id="input-url-imagen" type="text" placeholder="URL Imagen Opcional" value={urlInput} onChange={ (e) => setUrlInput(e.target.value) }/>
          <input type="text" placeholder="Destinatario" value={destinatarioInput} onChange={ (e) => setDestinatarioInput(e.target.value) } required />
          <input type="number" name="" value={amountInput} id="" placeholder="1" onChange={ (e) => setAmountInput(parseInt(e.target.value)) } />
          <div className="buttons-container">
            <button className="agregar-btn" type="submit">Agregar</button>
            <button onClick={()=>setDisplayForm(!displayForm)} type="button" >Cerrar</button>
          </div>
        </form>
      </div>
      
      {
        regalos.length === 0 && <h2 className="no-gifts">No hay regalos <br />🥺</h2>
      }
      {
        regalos.map((regalo) => (
          <li key={regalo.id} className="regalo-container">

            <div className="data-regalo-container">
              <span>🎁 </span>
              <img className="image-thumbnail" src={regalo.imagen ? regalo.imagen : 'https://res.cloudinary.com/dc6mrv5cb/image/upload/v1702233464/adviency-goncy/default_image.512x512_hd7edh.png'} alt={`Imagen ${regalo.nombre}`}/>
                <div className="nombre-cantidad-destinatario-container">
                  <span>{regalo.nombre} x {regalo.cantidad}</span>
                  <pre>{regalo.destinatario}</pre>
                </div>
            </div>          

            <div className="data-regalo-container"><span>🎁 </span><img className="image-thumbnail" src={regalo.imagen ? regalo.imagen : 'https://res.cloudinary.com/dc6mrv5cb/image/upload/v1702233464/adviency-goncy/default_image.512x512_hd7edh.png'} alt={`Imagen ${regalo.nombre}`}/><span>{regalo.nombre} x {regalo.cantidad}</span></div>           
            <button onClick={()=>removeGiftById(regalo.id)} >Borrar</button>
          </li>          
        ))
      }
      <button style={{width:'100%'}} onClick={()=>removeAllGifts()} >Borrar todos los regalos</button>
    </div>
  );
}