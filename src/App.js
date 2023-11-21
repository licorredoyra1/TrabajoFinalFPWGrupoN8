import { Container, Nav, Navbar } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './components/Inicio';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Error from './components/Error';
import AboutUs from './components/AboutUs';
import AppNiños from './components/ReactJuegoNiños/AppNiños';
import AppNave from './components/PhaserNave/AppNave';
import AppPhaser from './components/PhaserDude/AppPhaser'
// import AppNotas from './components/ReactListaNotas/AppNotas'
// import AppComparador './components/PhaserComparadorPrecios/AppComparador'






function App() {

  return (
    <Router>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/i">Home</Nav.Link>
            <Nav.Link href="/aboutUs">Acerca de Nosotros</Nav.Link>
            <Nav.Link href="/niños">Juego para Niños</Nav.Link>
            <Nav.Link href="/nave">Juego Nave</Nav.Link>
            <Nav.Link href="/dude">Juego Dude</Nav.Link>
            <Nav.Link href="/notas">Lista de Notas</Nav.Link>
            <Nav.Link href="/comparador">Comparador de precios</Nav.Link>
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
        {/* <Route path="/notas" element={<AppNotas/>}></Route> */}
        {/* <Route path="/comparador" element={<AppComparador/>}></Route> */}
      </Routes>
    </Router>
  );
}

export default App;
