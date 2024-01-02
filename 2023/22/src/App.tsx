import { useEffect, useRef, useState } from "react";
import "./styles.css";
import mainSound from "./assets/xmas-sound.mp3";

interface Regalo {
  id: string;
  nombre: string;
  cantidad: number;
  destinatario: string;
  imagen?: string;
  precio: number;
}

const regalosIniciales: Regalo[] = [
  {
    id: crypto.randomUUID(),
    nombre: "PC",
    cantidad: 1,
    imagen:
      "https://i.dell.com/sites/csimages/Product_Imagery/all/prod-2585-notebook-alienware-m18-ff-800x550.png",
    destinatario: "David",
    precio: 140,
  },
  {
    id: crypto.randomUUID(),
    nombre: "PS5",
    cantidad: 1,
    imagen:
      "https://cdn.idealo.com/folder/Product/200584/7/200584783/s11_produktbild_gross_1/sony-playstation-5-ps5-standard-edition.jpg",
    destinatario: "Rodrigo",
    precio: 720,
  },
  {
    id: crypto.randomUUID(),
    nombre: "Nintendo DS",
    cantidad: 1,
    imagen: "https://americansgameocio.com/4735-large_default/nintendo-ds.jpg",
    destinatario: "Agustin",
    precio: 210,
  },
];

const regalosSorpresa: Regalo[] = [
  {
    id: crypto.randomUUID(),
    nombre: "Teclado Razer",
    cantidad: 1,
    imagen:
      "https://thumb.pccomponentes.com/w-530-530/articles/1064/10643479/1652-razer-ornata-v3-teclado-gaming-hibrido-rgb.jpg",
    destinatario: "Manuel",
    precio: 130,
  },
  {
    id: crypto.randomUUID(),
    nombre: "EA FC 24",
    cantidad: 1,
    imagen:
      "https://thumb.pccomponentes.com/w-530-530/articles/1074/10747547/1153-ea-sports-fc-24-ps5-comprar.jpg",
    destinatario: "Pedro",
    precio: 14,
  },
  {
    id: crypto.randomUUID(),
    nombre: "Monitor Gamer",
    cantidad: 1,
    imagen:
      "https://thumb.pccomponentes.com/w-530-530/articles/1066/10663790/1132-samsung-odyssey-g5-lc32g55tqbuxen-32-led-wqhd-144hz-freesync-premium-curva.jpg",
    destinatario: "Juan",
    precio: 210,
  },
  {
    id: crypto.randomUUID(),
    nombre: "Samsung Galaxy S23",
    cantidad: 1,
    imagen:
      "https://thumb.pccomponentes.com/w-530-530/articles/1066/10661568/1573-samsung-galaxy-s23-256gb-lila-libre-cargador-25w.jpg",
    destinatario: "Jorge",
    precio: 105,
  },
];

export default function App() {
  const [regalos, setRegalos] = useState<Regalo[] | []>([]);
  const [regaloInput, setRegaloInput] = useState<string>("");
  const [amountInput, setAmountInput] = useState<number>(1);
  const [urlInput, setUrlInput] = useState<string>();
  const [displayForm, setDisplayForm] = useState<boolean>(false);
  const [destinatarioInput, setDestinatarioInput] = useState<string>("");
  const [currentEditingID, setCurrentEditingID] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const [currentMode, setCurrentMode] = useState("add");
  const [priceInput, setPriceInput] = useState(10);
  const [precioTotal, setPrecioTotal] = useState(0);
  const [previewModal, setPreviewModal] = useState(false);
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const audioElementRef = useRef<any>();
  function updateLocalStorage() {
    localStorage.setItem("regalos", JSON.stringify(regalos));
  }

  function vaciarInputs() {
    setAmountInput(1);
    setRegaloInput("");
    setUrlInput("");
    setDestinatarioInput("");
    setPriceInput(10);
    setDisplayForm(false);
  }

  function addGiftHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      regalos.find((regalo) => regalo.nombre === regaloInput) ||
      regaloInput === ""
    ) {
      if (regaloInput === "") alert("El input está vacío");
      else alert("El regalo ya existe");
      return;
    }

    setRegalos((previos) => [
      ...previos,
      {
        id: crypto.randomUUID(),
        nombre: regaloInput,
        cantidad: amountInput,
        imagen: urlInput,
        destinatario: destinatarioInput,
        precio: priceInput,
      },
    ]);
    vaciarInputs();
  }

  function removeGiftById(id: string) {
    setRegalos((previos) => previos.filter((regalo) => regalo.id !== id));
  }

  function removeAllGifts() {
    setRegalos([]);
    setRegaloInput("");
    return;
  }

  function editGiftPopup(id: string) {
    if (regalos.find((regalo) => regalo.id === id) === undefined) return;
    setCurrentMode("edit");
    const info = regalos.find((regalo) => regalo.id === id);
    setCurrentEditingID(id);
    setDisplayForm(true);
    setDestinatarioInput(info!.destinatario);
    setRegaloInput(info!.nombre);
    setAmountInput(info!.cantidad);
    setUrlInput(info?.imagen);
    setPriceInput(info!.precio);
  }

  function editGift() {
    setCurrentMode("add");

    setRegalos((regalosAnteriores) =>
      regalosAnteriores.map((regalo) => {
        if (regalo.id === currentEditingID) {
          return {
            ...regalo,
            nombre: regaloInput,
            cantidad: amountInput,
            imagen: urlInput,
            destinatario: destinatarioInput,
          };
        } else return regalo;
      })
    );

    vaciarInputs();
  }

  function displayAddModal() {
    vaciarInputs();
    setDisplayForm(!displayForm);
    setCurrentMode("add");
  }
  async function loadGifts() {
    await new Promise((resolve) => setTimeout(resolve, 1300));
    setIsLoading(false);
  }

  function conseguirRegaloSorpresa() {
    console.log("regalo sorpresa");
    const regalo =
      regalosSorpresa[Math.floor(Math.random() * regalosSorpresa.length)];
    setRegaloInput(regalo.nombre);
    setAmountInput(regalo.cantidad);
    setUrlInput(regalo.imagen);
    setDestinatarioInput(regalo.destinatario);
    setPriceInput(regalo.precio);
  }

  function conseguirPrecioTotal() {
    let cifra = 0;
    regalos.forEach((regalo) => {
      cifra += regalo.precio;
    });
    return cifra;
  }
  function onPrintHandler() {
    console.log("imprimiendo lista");
    window.print();
  }

  function soundHandler() {
    if (!isPlayingSound) {
      const elemento = document.querySelector("audio");
      // elemento?.volume!=0.1
      audioElementRef.current!.volume = 0.01;
      elemento?.play();
      setIsPlayingSound(true);
    } else {
      const elemento = document.querySelector("audio");
      // elemento?.volume!=0.1
      elemento?.pause();
      setIsPlayingSound(false);
    }
  }

  useEffect(() => {
    if (!isLoading) updateLocalStorage();
    setPrecioTotal(conseguirPrecioTotal());
  }, [regalos]);

  useEffect(() => {
    try {
      loadGifts().then(() => {
        setRegalos(
          JSON.parse(localStorage.getItem("regalos")!) || regalosIniciales
        );
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className="App">
      <audio src={mainSound} id="sound-xmas" loop ref={audioElementRef}></audio>
      <button className="play-sound-btn" onClick={soundHandler}>
        {isPlayingSound ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-player-pause-filled"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
              d="M9 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z"
              strokeWidth="0"
              fill="currentColor"
            />
            <path
              d="M17 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z"
              strokeWidth="0"
              fill="currentColor"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-player-play-filled"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
              d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z"
              strokeWidth="0"
              fill="currentColor"
            />
          </svg>
        )}
      </button>
      <button className="print-btn" onClick={onPrintHandler}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-printer"
          width="50"
          height="50"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2" />
          <path d="M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4" />
          <path d="M7 13m0 2a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2z" />
        </svg>
      </button>
      <h1 className="app-title">Lista de Regalos</h1>
      <button id="agregar-regalo-btn" onClick={() => displayAddModal()}>
        Agregar regalo
      </button>
      <div className={`${displayForm ? "display-form" : "display-none"}`}>
        <form onSubmit={(e) => addGiftHandler(e)}>
          <h2>Agregá un regalo! 🙂</h2>
          <button
            className="btn-regalo-sorpresa"
            onClick={() => conseguirRegaloSorpresa()}
            type="button"
          >
            Dame un regalo sorpresa!
          </button>
          <input
            name="regalo-nombre"
            value={regaloInput}
            onChange={(e) => setRegaloInput(e.target.value)}
            type="text"
            placeholder="Nombre del regalo"
            required
          />
          <input
            id="input-url-imagen"
            type="text"
            placeholder="URL Imagen Opcional"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
          />
          <input
            type="text"
            placeholder="Destinatario"
            value={destinatarioInput}
            onChange={(e) => setDestinatarioInput(e.target.value)}
            required
          />
          <label className="" htmlFor="precio">
            Precio
          </label>
          <input
            type="number"
            value={priceInput}
            placeholder="Precio"
            name="precio"
            id=""
            onChange={(e) => setPriceInput(parseInt(e.target.value))}
          />
          <label htmlFor="cantidad" className="">
            Cantidad
          </label>
          <input
            type="number"
            name="cantidad"
            value={amountInput}
            id=""
            placeholder="1"
            onChange={(e) => setAmountInput(parseInt(e.target.value))}
            required
          />
          <div className="buttons-container">
            {currentMode === "add" && (
              <button className="agregar-btn" type="submit">
                Agregar
              </button>
            )}
            {currentMode === "edit" && (
              <button
                onClick={() => editGift()}
                className="edit-btn"
                type="button"
              >
                Editar
              </button>
            )}
            <button onClick={() => setDisplayForm(!displayForm)} type="button">
              Cerrar
            </button>
          </div>
        </form>
      </div>

      {regalos.length === 0 && !isLoading && (
        <h2 className="no-gifts">
          No hay regalos <br />
          🥺
        </h2>
      )}
      {isLoading && <h2 className="no-gifts">Cargando regalos...</h2>}
      {regalos.map((regalo) => (
        <li key={regalo.id} className="regalo-container">
          <div className="data-regalo-container">
            <span>🎁 </span>
            <img
              className="image-thumbnail"
              src={
                regalo.imagen
                  ? regalo.imagen
                  : "https://res.cloudinary.com/dc6mrv5cb/image/upload/v1702233464/adviency-goncy/default_image.512x512_hd7edh.png"
              }
              alt={`Imagen ${regalo.nombre}`}
            />
            <div className="nombre-cantidad-destinatario-container">
              <span>
                {regalo.nombre} ({regalo.cantidad}) - $
                {regalo.cantidad * regalo.precio}
              </span>
              {}
              <pre>{regalo.destinatario}</pre>
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={() => editGiftPopup(regalo.id)}>Duplicar</button>
            <button
              onClick={() => editGiftPopup(regalo.id)}
              className="edit-btn"
            >
              Editar
            </button>
            <button onClick={() => removeGiftById(regalo.id)}>X</button>
          </div>
        </li>
      ))}
      {!isLoading && (
        <>
          <hr style={{ width: "100%" }} />
          <h2 className="precio-total">
            Total: <span>${precioTotal}</span>
          </h2>
        </>
      )}
      <button style={{ width: "100%" }} onClick={() => removeAllGifts()}>
        Borrar todos los regalos
      </button>
      {!isLoading && (
        <>
          <button onClick={() => setPreviewModal(true)} className="preview-btn">
            Previsualizar Lista
          </button>
        </>
      )}
      {previewModal && (
        <div
          className={`${previewModal ? "preview-gift-modal" : "display-none"}`}
        >
          <button onClick={() => setPreviewModal(false)}>Cerrar</button>
          {regalos.map((regalo) => (
            <div key={regalo.id} className="preview-gift-container">
              <img
                src={
                  regalo.imagen
                    ? regalo.imagen
                    : "https://res.cloudinary.com/dc6mrv5cb/image/upload/v1702233464/adviency-goncy/default_image.512x512_hd7edh.png"
                }
                alt={`Imagen ${regalo.nombre}`}
              />
              <h4>
                {regalo.nombre} x {regalo.cantidad}
              </h4>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
