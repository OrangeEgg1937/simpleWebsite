import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MDBDataTable } from 'mdbreact';
import { Table } from 'react-bootstrap';
import './favourite.css';

const FavoriteLocationList = () => {
  const [favoriteLocations, setFavoriteLocations] = useState([]);

  useEffect(() => {
    // Fetch the favorite locations data from the API
    axios.get('http://localhost:8080/api/favorites') // Replace with the actual API endpoint for retrieving favorites
      .then(response => {
        const favoriteLocationsData = response.data;
        setFavoriteLocations(favoriteLocationsData);
      })
      .catch(error => {
        console.error('Error fetching favorite locations data:', error);
      });
  }, []);

  const handleRemoveFavorite = (locationId) => {
    // Send a request to the backend to remove the location from favorites
    axios.delete(`http://localhost:8080/api/favorites/${locationId}`)
      .then(response => {
        // Update the favorite locations state after successful removal
        setFavoriteLocations(prevLocations => prevLocations.filter(location => location._id !== locationId));
      })
      .catch(error => {
        console.error('Error removing location from favorites:', error);
      });
  };

  const renderTableRows = () => {
    return favoriteLocations.map(location => (
      <tr key={location._id}>
        <td>{location.name}</td>
        <td>{location.latitude}</td>
        <td>{location.longitude}</td>
        <td>
          <button variant="danger" onClick={() => handleRemoveFavorite(location._id)}>
            Remove
          </button>
        </td>
      </tr>
    ));
  };


  return (
    <div>
      <h1>Favorite Location List</h1>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Name</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {renderTableRows()}
        </tbody>
      </Table>
    </div>
  );
};

export default FavoriteLocationList;