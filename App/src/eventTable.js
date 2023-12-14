import ReactDOM from "react-dom/client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MDBDataTable } from 'mdbreact';
import {Table, Form} from "react-bootstrap";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import "./eventTable.css";

const EventTable = () => {
  const [data, setData] = useState({
    columns: [
      {
        label: 'Title',
        field: 'title',
        sort: 'asc',
      },
      {
        label: 'Venue ID',
        field: 'venueId',
        sort: 'asc',
      },
      {
        label: 'Time',
        field: 'time',
        sort: 'asc',
      },
      {
        label: 'Description',
        field: 'description',
        sort: 'asc',
      },
      {
        label: 'Organisation',
        field: 'organisation',
        sort: 'asc',
      },
      {
        label: 'Price',
        field: 'price',
        sort: 'asc',
      }
    ],
    rows: [
      {
        title: 'Event 1',
        venueId: 1,
        time: '2023-12-15 10:00 AM',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        organisation: 'Organization 1',
        price: 10.99,
      },
      {
        title: 'Event 2',
        venueId: 2,
        time: '2023-12-16 2:00 PM',
        description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        organisation: 'Organization 2',
        price: 15.99,
      },

    ]
  });

  const [maxPrice, setMaxPrice] = useState('');

  /*
  useEffect(() => {
    axios.get('http://localhost:8080/api/event/all')
      .then((response) => {
        const eventData = response.data;
        const updatedRows = eventData.map((event) => ({
          title: event.title,
          venueId: event.venueId,
          time: event.time,
          description: event.description,
          organisation: event.organisation,
          price: event.price
        }));

        setData((prevData) => ({
          ...prevData,
          rows: updatedRows
        }));
      });
  }, []);
  */

  const handleFilter = () => {
    const filteredRows = data.rows.filter((row) => row.price <= maxPrice);

    setData((prevData) => ({
      ...prevData,
      rows: filteredRows
    }));
  };

  return (
    <div>
      <input type="number" placeholder="Max Price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
      <button onClick={handleFilter}>Filter</button>
      <MDBDataTable
        striped
        bordered
        data={data}
        searchable
        filter="price"
      />
    </div>
  );
};



export default EventTable;