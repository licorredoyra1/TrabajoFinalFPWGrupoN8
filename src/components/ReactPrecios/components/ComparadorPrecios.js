import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './styles/comparadorPrecios.css'
import { Row, Col, Container, Button } from 'react-bootstrap';
import Formulario from './Formulario'
import { useState } from 'react';
import Productos from './Productos';


function App() {

  const [productos, setProductos] = useState([]);


  function ordenarPorNombre() {
    const productosOrdenados = [...productos].sort((a, b) =>
      a.producto.localeCompare(b.producto)
    );
    setProductos(productosOrdenados);
  }

  function ordenarPorPrecio() {
    const productosOrdenados = [...productos].sort((a, b) =>
      a.precio - b.precio
    );
    setProductos(productosOrdenados);
  }

  function mostrarMenorPrecio() {
    const uniqueProducts = {};
  
    productos.forEach(producto => {
      if (!(producto.producto in uniqueProducts) || producto.precio < uniqueProducts[producto.producto].precio) {
        uniqueProducts[producto.producto] = producto;
      }
    });
  
    const uniqueProductsArray = Object.values(uniqueProducts);
  
    setProductos(uniqueProductsArray)
    // Puedes hacer algo con el array de productos únicos con menor precio si lo necesitas en la interfaz
  }

  return (
    <>
      
      <h2 className='titulo_calculadora display-4 text-center mt-4'>Calculadora Precios</h2>
      <Container>
        <hr></hr>
        <Row>
          <Col md={6}>
            <Formulario productos={productos} setProductos={setProductos}></Formulario>
          </Col>
          <Col md={6}>
            <h2 className='text-center'>Productos</h2>
            {
              productos.map((productos, posicion) => {
                return <Productos key={posicion}
                  productos={productos}></Productos>
              })
            }
            <div className='d-flex'>
              <Button className='mx-1' onClick={()=>{ordenarPorNombre()}}>Ordenar por nombre</Button>
              <Button className='mx-1' onClick={()=>{ordenarPorPrecio()}}>Ordenar por precio</Button>
              <Button className='mx-1' onClick={()=>{mostrarMenorPrecio()}}>Mostrar menor precio</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
