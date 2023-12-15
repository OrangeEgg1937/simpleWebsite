import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import './favourite.css';

const FavoriteLocationList = () => {
  const [favoriteLocations, setFavoriteLocations] = useState([]);

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

  const userId = getCookie("userid");

  useEffect(() => {
    // Fetch the favorite locations data from the API
    axios.get(`http://localhost:8080/api/users/${userId}/favorite`)
      .then(response => {
        const favoriteLocationsData = response.data;
        setFavoriteLocations(favoriteLocationsData);
      })
      .catch(error => {
        console.error('Error fetching favorite locations data:', error);
      });
  }, [userId]);

  const handleRemoveFavorite = (locationId) => {
    setFavoriteLocations(prevLocations => prevLocations.filter(location => location.id !== locationId));
  };

  const renderTableRows = () => {
    return favoriteLocations.map(location => (
      <tr key={location.id}>
        <td>{location.name}</td>
        <td>{location.latitude}</td>
        <td>{location.longitude}</td>
        <td>
          <button variant="danger" onClick={() => handleRemoveFavorite(location.id)}>
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