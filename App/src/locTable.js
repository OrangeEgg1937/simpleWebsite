import ReactDOM from "react-dom/client";
import React from 'react';
import axios from 'axios';
import { MDBDataTable } from 'mdbreact';
import {Table, Form} from "react-bootstrap";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import "./locTable.css";

const LocationTable = () => {
  const data = {
    columns: [
      {
        label: 'Name',
        field: 'name',
        sort: 'asc',
      }
    ],
    rows: []
  };
  React.useEffect(() => {
    axios.get('http://localhost:8080/api/location/all').then((response) => {
      const allLocation = JSON.parse(response);
      
      for (let loc in allLocation){
        const url = "event/table/" + loc.name;
        const dataStore = {
          name: <Link to = {url}>{loc.name}</Link>
        };
        data.rows.push(dataStore)
      }
    });
  }, [data.rows]);
  return (
    <MDBDataTable
      striped
      bordered
      small
      data={data}
    />
  );
};



export default LocationTable;