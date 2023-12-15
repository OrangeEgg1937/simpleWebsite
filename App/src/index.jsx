import ReactDOM from "react-dom/client";
import React from 'react';
import { Container, Navbar, Nav } from "react-bootstrap";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import "./index.css";
import EventAdmin from "./EventAdmin";
import Login from "./login/login";
// import LocationTable from "./locTable"
// import Map from "./mapShow"
// import EventTable from "./eventTable"
// import Favourite from "./favourite"
// import LocationDetail from "./locDetail"

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <header><Navbar expand="md">
            <Container className="m-0 ml-0">
              <Navbar.Brand>Project G34</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav>
                  <button><Link to="/loc/table" className="nav_link" >Location Table</Link></button>
                  <button><Link to="/loc/map" className="nav_link">Map</Link></button>
                  <button><Link to="/event/table" className="nav_link">Event Table</Link></button>
                  <button><Link to="/favourite" className="nav_link">Favourite</Link></button>
                  <button><Link to="/event/admin" className="nav_link">Events</Link></button>
                  <button><Link to="/login">Login</Link></button>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          </header>
          <h3>Content</h3>
          <Routes>
            <Route path="/loc/table" element={<NoMatch />} />
            <Route path="/loc/map" element={<NoMatch />} />
            <Route path="/event/table" element={<NoMatch />} />
            <Route path="/favourite" element={<NoMatch />} />
            <Route path="/event/admin" element={<EventAdmin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/loc/detail/:locName" element={<NoMatch />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

const NoMatch = () => { }



const root = ReactDOM.createRoot(document.querySelector('#app'));
root.render(<App />);


export default App;