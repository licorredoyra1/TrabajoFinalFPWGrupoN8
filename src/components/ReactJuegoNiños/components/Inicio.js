import React, { useState } from "react";
import Juego from "./Juego";
import Felicitaciones from "./Felicitaciones";
//import '../reactComponets/style/StyleInicio.css'

function Inicio() {
  const [nombreJugador, setNombreJugador] = useState("");
  const [mostrarJuego, setMostrarJuego] = useState(false);
  const [puntaje, setPuntaje] = useState(0);
  const [mostrarFelicitaciones, setMostrarFelicitaciones] = useState(false);
  const [rondaActual, setRondaActual] = useState(1);
  const [nombreJugador2, setNombreJugador2] = useState("");
  const [puntaje2, setPuntaje2] = useState(0);
  const [turno, setTurno] = useState(1);
  const [resultado, setResultado] = useState(""); // Estado para mostrar el resultado
  const [rondasTotales, setRondasTotales] = useState(0); // Definir el estado de rondasTotales

  const manejarClickJugar = (nombre, nombre2) => {
    setNombreJugador(nombre);
    setNombreJugador2(nombre2);

    // Restablece el resultado al comenzar un nuevo juego
    setResultado("");

    // Establece las rondas totales aleatoriamente en el rango de 5 a 10
    const rondasTotales = Math.floor(Math.random() * 6) + 5;
    setRondasTotales(rondasTotales);

    setMostrarJuego(true);
    setPuntaje2(0);
    setPuntaje(0);
    setRondaActual(1); // Iniciar desde la ronda 1
    setTurno(1);
    setMostrarFelicitaciones(false);
  };

  const alTerminar = (puntaje, puntaje2) => {
    if (rondaActual >= rondasTotales) {
      // Todas las rondas se han jugado, determinar el resultado
      if (puntaje > puntaje2) {
        setPuntaje(puntaje);
        setPuntaje2(puntaje2);
        setResultado(`🥳${nombreJugador} Won!🎉`);
      } else if (puntaje2 > puntaje) {
        setPuntaje(puntaje);
        setPuntaje2(puntaje2);
        setResultado(`🥳${nombreJugador2} Won!🎉`);
      } else {
        setPuntaje(puntaje);
        setPuntaje2(puntaje2);
        setResultado("Tie🤷🏻‍♂️");
      }
      setMostrarJuego(false);
      setMostrarFelicitaciones(true);
    } else {
      setRondaActual(rondaActual + 1);
      // Cambiar al siguiente turno
       //setTurno(turno === 1 ? 2 : 1);
      setTurno(rondaActual % 2 === 0 ? 1 : 2);
    }
  };



  if (!mostrarJuego && !mostrarFelicitaciones) {
    return (
      <div className="container">
        <div className="conteinerTitulo">
        <h1 className="tituloJuego">Guess the animal</h1>
        </div>
        <div className="conteinerJugador" >
          <h1 className="title">What's your name, Player 1?</h1>
          <input className="inputJugador"
            type="text"
            placeholder="Player 1"
            onChange={(e) => setNombreJugador(e.target.value)}
          />
        </div>

        <div className="conteinerJugador">
          <h1 className="title">What's your name, Player 2?</h1>
          <input className="inputJugador"
            required
            type="text"
            placeholder="Player 2"
            onChange={(e) => setNombreJugador2(e.target.value)}
          />
        </div>


        <div className="mt-5 fs-5">
          <button className="button"
            onClick={() => manejarClickJugar(nombreJugador, nombreJugador2)}
          >
            Play
          </button>
        </div>
      </div>
    );
  } else if (mostrarJuego) {
    return (
      <div>
        <Juego
          nombreJugador={nombreJugador}
          nombreJugador2={nombreJugador2}
          puntaje={puntaje}
          puntaje2={puntaje2}
          setPuntaje2={setPuntaje2}
          setPuntaje={setPuntaje}
          alTerminar={alTerminar}
          rondaActual={rondaActual}
          setRondaActual={setRondaActual}
          setTurno={setTurno}
          turno={turno}
          rondasTotales={rondasTotales}
          setRondasTotales={setRondasTotales}
        />
      </div>
    );
  } else if (mostrarFelicitaciones) {
    return (
      <div>
        <Felicitaciones
          nombreJugador={nombreJugador}
          puntaje={puntaje}
          nombreJugador2={nombreJugador2}
          puntaje2={puntaje2}
          resultado={resultado}
        />
      </div>
    );
  }
}

export default Inicio;