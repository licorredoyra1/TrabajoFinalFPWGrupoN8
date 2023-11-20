import { Container, Nav, Navbar } from 'react-bootstrap';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Inicio from './components/Inicio';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Error from './components/Error';
import AboutUs from './components/AboutUs';



function App() {

  return (
    <Router>
                <Navbar bg="dark" data-bs-theme="dark">
                    <Container>    
                        <Navbar.Brand href="/">Navbar</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/aboutUs">Acerca de Nosotros</Nav.Link>
                        </Nav>
                        
                    </Container>
                </Navbar>
                <Routes>
                    <Route path="/" element={<Inicio />}></Route>
                    <Route path="/aboutUs" element={ <AboutUs/>}></Route> 
                    <Route path="*" element={<Error />}></Route>
                </Routes>
    </Router>
  );
}

export default App;
