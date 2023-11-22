import './styles/productos.css';

function Productos ({ productos }){
    return(
        <p className='nombre_producto text-center'>{productos.producto} - ${productos.precio} - {productos.comercio}</p>
        
    )
}

export default Productos