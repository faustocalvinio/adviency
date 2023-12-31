import { useEffect } from "react";

export const NieveEffect = ({ canvasRef }:any) => {
   const flakes:any = [];
   let mX = -100;
   let mY = -100;

   const reset = (flake:any) => {
      flake.x = Math.floor(Math.random() * window.innerWidth);
      flake.y = 0;
      flake.size = Math.random() * 3 + 2;
      flake.speed = Math.random() * 1 + 0.3;
      flake.velY = flake.speed;
      flake.velX = 2;
      flake.opacity = Math.random() * 0.5 + 0.3;
   };

   const snow = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < flakes.length; i++) {
         const flake = flakes[i];
         const x = mX;
         const y = mY;
         const minDist = 150;
         const x2 = flake.x;
         const y2 = flake.y;

         const dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y));
         // const dx = x2 - x;
         // const dy = y2 - y;

         if (dist < minDist) {
            const force = minDist / (dist * dist);
            const xcomp = (x - x2) / dist;
            const ycomp = (y - y2) / dist;
            const deltaV = force / 2;

            flake.velX -= deltaV * xcomp;
            flake.velY -= deltaV * ycomp;
         } else {
            flake.velX *= 0.98;
            if (flake.velY <= flake.speed) {
               flake.velY = flake.speed;
            }
            flake.velX += Math.cos((flake.step += 0.05)) * flake.stepSize;
         }

         ctx.fillStyle = "rgba(255,255,255," + flake.opacity + ")";
         flake.y += flake.velY;
         flake.x += flake.velX;

         if (flake.y >= canvas.height || flake.y <= 0) {
            reset(flake);
         }

         if (flake.x >= canvas.width || flake.x <= 0) {
            reset(flake);
         }

         ctx.beginPath();
         ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
         ctx.fill();
      }

      requestAnimationFrame(snow);
   };

   const init = () => {
      for (let i = 0; i < 400; i++) {
         const x = Math.floor(Math.random() * window.innerWidth);
         const y = Math.floor(Math.random() * window.innerHeight);
         const size = Math.random() * 3 + 2;
         const speed = Math.random() * 10 + 0.5;
         const opacity = Math.random() * 0.5 + 0.3;

         flakes.push({
            speed: speed,
            velY: speed,
            velX: 0,
            x: x,
            y: y,
            size: size,
            stepSize: Math.random() / 30,
            step: 0,
            opacity: opacity,
         });
      }

      snow();
   };

   useEffect(() => {
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const handleMouseMove = (e:any) => {
         mX = e.clientX;
         mY = e.clientY;
      };

      canvas.addEventListener("mousemove", handleMouseMove);

      const handleResize = () => {
         canvas.width = window.innerWidth;
         canvas.height = window.innerHeight;
      };

      window.addEventListener("resize", handleResize);

      init();

      return () => {
         canvas.removeEventListener("mousemove", handleMouseMove);
         window.removeEventListener("resize", handleResize);
      };
   }, []);

   return <canvas ref={canvasRef} />;
};
