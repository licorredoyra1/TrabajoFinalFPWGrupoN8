import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './css/App.css';
import logo from './img/Logo-PF.png'
import Inicio from './components/Inicio';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Error from './components/Error';
import AboutUs from './components/AboutUs';
import AppNiños from './components/ReactJuegoNiños/AppNiños';
import AppNave from './components/PhaserNave/AppNave';
import AppPhaser from './components/PhaserDude/AppPhaser'
import AppNotas from './components/ReactNotas/AppNotas';
// import AppComparador './components/PhaserComparadorPrecios/AppComparador'






function App() {

  return (
    <Router>
      <Navbar className='navbar'>
        <Container className='conteeiner'>
          <Navbar.Brand><img src={logo} alt="Logo" className="logo"/></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/i"><h2 className='componente'>Home</h2></Nav.Link>
            <Nav.Link href="/aboutUs"><h2 className='componente'>Acerca de Nosotros</h2></Nav.Link>
            <NavDropdown title="Proyectos" id="dropdown">
              <NavDropdown.Item className='dropdown-item' href="/nave">Juego Nave</NavDropdown.Item>
              <NavDropdown.Item className='dropdown-item' href="/dude">Juego Dude</NavDropdown.Item>
              <NavDropdown.Item className='dropdown-item' href="/niños">Juego para Niños</NavDropdown.Item>
              <NavDropdown.Item className='dropdown-item' href="/comparador">Comparador de precios</NavDropdown.Item>
              <NavDropdown.Item className='dropdown-item' href="/notas">Lista de Notas</NavDropdown.Item>
            </NavDropdown>
          </Nav>

        </Container>
      </Navbar>
      <Routes>
        <Route path="/i" element={<Inicio/>}></Route>
        <Route path="/aboutUs" element={<AboutUs/>}></Route>
        <Route path="*" element={<Error/>}></Route>
        <Route path="/niños" element={<AppNiños/>}></Route>
        <Route path="/nave" element={<AppNave/>}></Route>
        <Route path="/dude" element={<AppPhaser/>}></Route>
        <Route path="/notas" element={<AppNotas/>}></Route> 
        {/* <Route path="/comparador" element={<AppComparador/>}></Route> */}
      </Routes>
    </Router>
  );
}

export default App;
