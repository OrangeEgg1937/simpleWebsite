import ReactDOM from "react-dom/client";
import React from 'react';
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import "./index.css";
import LocationTable from "./locTable"
import Map from "./map"
import EventTable from "./eventTable"
import Favourite from "./favourite"
import LocationDetail from "./locDetail"

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Simple SPA</h1>
        <BrowserRouter>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                <Nav.Item><Link to="/loc/table">Location Table</Link></Nav.Item>
                <Nav.Item><Link to="/loc/map">Map</Link></Nav.Item>
                <Nav.Item><Link to="/event/table">Event Table</Link></Nav.Item>
                <Nav.Item><Link to="/favourite">Favourite</Link></Nav.Item>
                </Nav>
                <Nav>
                <Nav.Item><Link to="/login">Login</Link></Nav.Item>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <Routes>
            <Route path="/loc/table" element={<LocationTable />} />
            <Route path="/loc/map" element={<Map />} />
            <Route path="/event/table" element={<EventTable />} />
            <Route path="/favourite" element={<Favourite />} />
            <Route path="/loc/detail/:locName" element={<LocationDetail />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

const NoMatch = () =>{}



const root = ReactDOM.createRoot(document.querySelector('#app'));
root.render(<App />);


export default App;