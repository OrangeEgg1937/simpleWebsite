import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MDBDataTable } from 'mdbreact';
import { Table, Form } from 'react-bootstrap';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import './eventTable.css';

const EventTable = () => {
  const [data, setData] = useState({
    columns: [
      {
        label: 'Event ID',
        field: 'eventid',
        sort: 'asc',
      },
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
      },
    ],
    rows: [],
  });
  const [maxPrice, setMaxPrice] = useState('');
  const [originalRows, setOriginalRows] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/events/find/by10loc')
      .then((response) => {
        const eventList = response.data;
        console.log(eventList);
        const updatedRows = eventList.map((event) => ({
          eventid: event.eventid,
          title: event.title,
          venueId: event.venueid,
          time: event.progtime,
          description: event.desce,
          organisation: event.presenterorge,
          price: event.price,
        }));

        setData((prevData) => ({
          ...prevData,
          rows: updatedRows,
        }));
        setOriginalRows(updatedRows); // Store the original rows data
      })
      .catch((error) => {
        console.error('Error fetching event data:', error);
      });
  }, []);

  const handleFilter = () => {
    const filteredRows = originalRows.filter((row) => {
      const priceValue = row.price.replace(/\D/g, ''); // Remove non-numeric characters
      const price = parseInt(priceValue, 10); // Parse the numeric value
      console.log(price);
      return !isNaN(price) && price <= maxPrice;
    });
  
    setData((prevData) => ({
      ...prevData,
      rows: filteredRows,
    }));
  };

  const handleClearFilter = () => {
    setData((prevData) => ({
      ...prevData,
      rows: originalRows, // Restore the original rows data
    }));
    setMaxPrice(''); // Clear the filter input
  };

  return (
    <div className=".container" style={{width: "100%"}}>
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
      <button onClick={handleFilter}>Filter</button>
      <button onClick={handleClearFilter}>Clear Filter</button>
      <MDBDataTable striped bordered data={data} searchable filter="price" />
    </div>
  );
};

export default EventTable;