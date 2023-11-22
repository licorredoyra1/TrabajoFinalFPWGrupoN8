//import '../reactComponets/css/StyleFelicitaciones.css'

function Felicitaciones({ nombreJugador, puntaje, nombreJugador2, puntaje2, resultado }) {
    return (
        <div className="conteiner">
            <div className='conteinerPlayers'>
                <div className='conteinerP1'>
                    <h1 className="titles">Congratulations, {nombreJugador}!</h1>
                    <p className="score">Your score is: <h2 className='puntaje'>{puntaje}</h2></p>
                </div>

                <div className='conteinerP2'>
                    <h1 className="titles">Congratulations, {nombreJugador2}!</h1>
                    <p className="score">Your score is: <h2 className='puntaje'>{puntaje2}</h2></p>
                </div>
            </div>

            <div className='resultado'>
                <h2 className="titles">{resultado}</h2>
            </div>
        </div>
    );
}

export default Felicitaciones;