import '../css/AboutUs.css';
import { Container} from 'react-bootstrap';
import Desarrolladores from './Desarrolladores';
import  data from '../db.json'

const AboutUs = () => {

    return (
        <Container>

            <h1 className='desarrolladores_titulo text-center my-5 display-3'>DESARROLLADORES</h1>
            { 
                data.map((datos, posicion)=>{return <Desarrolladores datos={datos} key={posicion}/>})
            } 
            
        </Container>

    );

};
export default AboutUs;