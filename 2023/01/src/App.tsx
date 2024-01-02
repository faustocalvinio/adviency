import "./styles.css";

type Regalo = string;

const regalos: Regalo[] = ['PS5','Nintendo DS','PC Gaming'];

export default function App() {


  return (
    <div className="App">
      <h1>Regalos:</h1>
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
