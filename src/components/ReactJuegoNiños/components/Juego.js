import React, { useState, useEffect } from "react";
import data from "../dataReact/imagenes.json";
//import '../reactComponets/style/StyleJuego.css'

function Juego({ nombreJugador, puntaje, setPuntaje, alTerminar, rondaActual, setRondaActual, setPuntaje2, nombreJugador2, puntaje2, setTurno, turno, rondasTotales, }) {
  const [animalObjetivo, setAnimalObjetivo] = useState("");
  const [opciones, setOpciones] = useState([]);
  const [esCorrecto, setEsCorrecto] = useState(null);
  const [puedeHacerClic, setPuedeHacerClic] = useState(true);
  const [bonusDisponibleJugador1, setBonusDisponibleJugador1] = useState(true);
  const [bonusDisponibleJugador2, setBonusDisponibleJugador2] = useState(true);

  const obtenerAnimalAleatorio = () => {
    const animales = data.animales;
    const indiceAleatorio = Math.floor(Math.random() * animales.length);
    return animales[indiceAleatorio];
  };

  const obtenerOpcionesAleatorias = () => {
    const animalCorrecto = obtenerAnimalAleatorio();
    let opcionesAleatorias = [animalCorrecto];

    while (opcionesAleatorias.length < 3) {
      const opcion = obtenerAnimalAleatorio();
      if (!opcionesAleatorias.includes(opcion)) {
        opcionesAleatorias.push(opcion);
      }
    }

    opcionesAleatorias = opcionesAleatorias.sort(() => Math.random() - 0.5);

    setOpciones(opcionesAleatorias);
    setAnimalObjetivo(animalCorrecto);
  };

  const usarBonus = (jugador) => {
    if (jugador === 1 && bonusDisponibleJugador1) {
      const opcionesSinAnimalCorrecto = opciones.filter(opcion => opcion !== animalObjetivo);
      const opcionEliminada = opcionesSinAnimalCorrecto[Math.floor(Math.random() * 2)];

      const nuevasOpciones = opciones.filter(opcion => opcion !== opcionEliminada);

      setOpciones(nuevasOpciones);
      setBonusDisponibleJugador1(false);
    } else if (jugador === 2 && bonusDisponibleJugador2) {

      const opcionesSinAnimalCorrecto = opciones.filter(opcion => opcion !== animalObjetivo);
      const opcionEliminada = opcionesSinAnimalCorrecto[Math.floor(Math.random() * 2)];

      const nuevasOpciones = opciones.filter(opcion => opcion !== opcionEliminada);

      setOpciones(nuevasOpciones);
      setBonusDisponibleJugador2(false);
    }
  };
  const verificarRespuesta = (animalSeleccionado) => {
    if (animalSeleccionado === animalObjetivo) {
      if (turno === 1) {
        setPuntaje(puntaje + 1);
      } else {
        setPuntaje2(puntaje2 + 1);
      }
      setEsCorrecto(true);
    } else {
      setEsCorrecto(false);
    }
    setPuedeHacerClic(false);
  };


  const siguienteRonda = () => {
    if (rondaActual < rondasTotales * 2) { 
      setRondaActual(rondaActual + 1);

      if (rondaActual % rondasTotales === 0) {
        setTurno(turno === 1 ? 2 : 1);
      }

      setEsCorrecto(null);
      setPuedeHacerClic(true);
      obtenerOpcionesAleatorias();
    } else {
      alTerminar(puntaje, puntaje2);
    }
  };

  const opcionesDeshabilitadas = esCorrecto !== null;

  useEffect(() => {
    obtenerOpcionesAleatorias();
  }, []); 

  let jugador;
  if (turno === 1) {
    jugador = nombreJugador;
  } else {
    jugador = nombreJugador2;
  }

  return (
    <div className="conteiner ">
      <div className="conteinerNombreJugador" >
      <h2 className="nombreJugador">{jugador}</h2>
      </div>
      <h1 className="title1">What animal is this?</h1>
      <p className="title2">Round: {rondaActual}</p>
      <div className="text-center">
        <img src={`..../assets/animales/${animalObjetivo}.jpg`} alt={animalObjetivo} className="image"  />
      </div>

      <div className=" botonJuego">
        <div className="conteinerOpciones" >
        {opciones.map((animal) => (
          <button className="botonOpcion"
            key={animal}
            onClick={() => verificarRespuesta(animal)}
            disabled={!puedeHacerClic || opcionesDeshabilitadas}
          >
            {animal}
          </button>
        ))}
        </div>
        <div className="conteinerBonus" >
          {turno === 1 && bonusDisponibleJugador1 && (
            <button className="bonus-button" onClick={() => usarBonus(1)} disabled={!puedeHacerClic || !bonusDisponibleJugador1}>
              Use bonus
            </button>
          )}

          {turno === 2 && bonusDisponibleJugador2 && (
            <button className="bonus-button" onClick={() => usarBonus(2)} disabled={!puedeHacerClic || !bonusDisponibleJugador2}>
              Use bonus
            </button>
          )}
        </div>
      </div>
      {esCorrecto === true && <p className="success-message my-5">Great job! Keep it up!</p>}
      {esCorrecto === false && (
        <p className="error-message my-5"> That's not it, but don't give up, you can do it!</p>
      )}
      <div className="text-center">
        <button className="next-button" onClick={siguienteRonda}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Juego;