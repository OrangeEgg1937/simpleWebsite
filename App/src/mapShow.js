import ReactDOM from "react-dom/client";
import React from 'react';
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import "./mapShow.css";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  } from "@vis.gl/react-google-maps";

class MapShow extends React.Component {
  render() {
    return (
        <APIProvider>
          <div>
            <Map></Map>
          </div>
        </APIProvider>
      
    );
  }
}



export default MapShow;