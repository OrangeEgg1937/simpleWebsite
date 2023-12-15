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
import UserAdmin from "./UserAdmin";
import Login from "./login/login"
import LocationTable from "./locTable"
// import Map from "./mapShow"
// import EventTable from "./eventTable"
// import Favourite from "./favourite"
import LocationDetail from "./locDetail"

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


class App extends React.Component {
  // using state to store the change
  constructor(props) {
    super(props);
    this.state = {
      isLogined: '0',
      isAdmin: '0',
      isNormalUser: '0',
      click: '0',
    };
  }

  loginCheck = (loginID) => {
    this.setState({isLogined: loginID});
  }

  userOnClick(e){
    if (this.click === '0') {
      this.setState({click: '1'});
    }else {
      this.setState({click: '0'});
    }
  }

  render() {
    // get the cookie user name
    const username = getCookie("username");
    return (
      <div>
        <BrowserRouter>
          <header><Navbar expand="md">
            <Container className="m-0 ml-0">
              <Navbar.Brand>Project G34</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav>
                  <button onClick={(e)=>this.userOnClick(e)}><Link to="/loc/table" className="nav_link" >Location Table</Link></button>
                  <button onClick={(e)=>this.userOnClick(e)}><Link to="/event/table" className="nav_link">Event Table</Link></button>
                  <button onClick={(e)=>this.userOnClick(e)}><Link to="/favourite" className="nav_link">Favourite</Link></button>
                  <button onClick={(e)=>this.userOnClick(e)}><Link to="/admin/events" className="nav_link">Events</Link></button>
                  <button onClick={(e)=>this.userOnClick(e)}><Link to="/admin/users" className="nav_link">Users</Link></button>
                  <button onClick={(e)=>this.userOnClick(e)}><Link to={this.isLogined ? "/":"/login"}>{ this.isLogined ? "Log out" : "Log in"}</Link></button>
                  {username}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          </header>
          <Routes>
            <Route path="/loc/table" element={<LocationTable />} />
            <Route path="/loc/map" element={<NoMatch />} />
            <Route path="/event/table" element={<NoMatch />} />
            <Route path="/favourite" element={<NoMatch />} />
            <Route path="/admin/events" element={<EventAdmin />} />
            <Route path="/admin/users" element={<UserAdmin />} />
            {<Route path="/login" element={<Login />} />}
            <Route path="/loc/detail/:locName" element={<LocationDetail />} />
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