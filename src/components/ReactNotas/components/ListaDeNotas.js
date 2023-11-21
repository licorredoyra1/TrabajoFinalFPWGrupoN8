import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import "./styles/ListaDeNotas.css";


function ListaDeNotas() {
    const [nota, setNota] = useState([]);
    const [notaLista, setNotaLista] = useState("");

    const guardar = (e) => { 
        e.preventDefault();
        setNota([...nota, { texto: notaLista, estado: 'Sin estado' }]);
        setNotaLista("");
    };

    const borrado = (index) => {
        const nuevasNotas = [...nota];
        nuevasNotas.splice(index, 1);
        setNota(nuevasNotas);
    };
   
    const handleEstado = (index, nuevoEstado) => {
        setNota(prevNotas => prevNotas.map((item, i) => 
            i === index ? { ...item, estado: nuevoEstado } : item
        ));
    };

    const marcarHecho = (index) => {
        handleEstado(index, 'Hecho');
    };
   
    return (
        <Container className="contenedor">
            <Row>
                <h1>Agenda</h1>
                <label className="labelEstilo" id="secTitulo">Agrega una nota</label>
                <br/>
                <input
                    className="input"
                    type="text"
                    id="nota"
                    value={notaLista}
                    onChange={(e) => setNotaLista(e.target.value)}
                />
                <button className="boton" onClick={guardar}>Agregar</button>
                <br />
                <h2>Sin estado</h2>
                <ul className="nota">
                    {nota.map((notaItem, index) => (
                        (notaItem.estado === 'Sin estado') && (
                            <li key={index}>
                                <p>{notaItem.texto}</p>
                                <button className="button" onClick={() => borrado(index)}>Eliminar</button>
                                <button className="button" onClick={() => handleEstado(index, "En curso")}>En curso</button>
                                <button className="button" onClick={() => handleEstado(index, "Hecho")}>Hecho</button>
                            </li>
                        )
                    ))}
                </ul>
                <h2>En curso</h2>
                <ul className="notaCurso">
                    {nota.map((notaItem, index) => (
                        (notaItem.estado === 'En curso') && (
                            <li key={index}>
                                <p>{notaItem.texto}</p>
                                <button className="button" onClick={() => borrado(index)}>Eliminar</button>
                                <button className="button" onClick={() => marcarHecho(index)}>Hecho</button>
                            </li>
                        )
                    ))}
                </ul>
                <h2>Hecho</h2>
                <ul className="notaHecho">
                    {nota.map((notaItem, index) => (
                        (notaItem.estado === 'Hecho') && (
                            <li key={index}>
                                <p>{notaItem.texto}</p>
                                <button className="button" onClick={() => borrado(index)}>Eliminar</button>
                            </li>
                        )
                    ))}
                </ul>
            </Row>
        </Container>
    );
}

export default ListaDeNotas;
