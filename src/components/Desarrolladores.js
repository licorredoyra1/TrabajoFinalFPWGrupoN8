import React from "react";
import { Col,Row,Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';


import { Link } from 'react-router-dom';
function Desarrolladores({datos}){
    return(<>
       <hr></hr>
            <Row id='seccionUno' className='mt-3'>
                <Col md="4" className='mt-3'>

                    <img src= {datos.image} alt={datos.name} className='img-fluid fotoPerfil' />
                </Col>
                <Col md="8">
                    <h2 className='text-center mt-2 mb-4'>{datos.name}</h2>
                    <p className='mx-5 text-center fs-2'>{datos.description}</p>

                    <div className="text-center">
                        <Container as={Link} to={datos.git} target="_blank" className="fs-1 text-dark text-center mt-3"><FontAwesomeIcon icon={faGithub} /></Container>
                        </div>
                        


                    

                </Col>
            </Row>
            <hr className='mb-5'></hr>

    </>);
}

export default Desarrolladores