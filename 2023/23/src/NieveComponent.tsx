import { NieveEffect } from "./NieveEffect";
import { useRef } from "react";
export function NieveComponente() {
   const canvasRef = useRef(null);
   return (
      <div id="container-nieve">
         <canvas ref={canvasRef}></canvas>
         <NieveEffect canvasRef={canvasRef} />
      </div>
   );
}
