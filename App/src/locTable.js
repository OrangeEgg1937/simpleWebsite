import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MDBDataTable, MDBBtn } from 'mdbreact';
import { Link } from 'react-router-dom';
import './locTable.css';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import locDetail from "./locDetail"

const LocationTable = () => {
  const [data, setData] = useState({
    columns: [
      {
        label: 'Name',
        field: 'name',
        sort: 'asc',
      },
      {
        label: 'Detail',
        field: 'button',
      },
    ],
    rows: [],
  });

  const [position, setPosition] = useState([]);
  const [isLoadingPos, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://miniature-giggle-69v95pvwv7rh45qw-8080.app.github.dev/api/locations/find10')
      .then((response) => {
        const allLocation = response.data;

        const rows = allLocation.map(loc => ({
          name: <Link to={`https://miniature-giggle-69v95pvwv7rh45qw-3000.app.github.dev/loc/detail/${loc.venue_id}`}>{loc.name}</Link>,
          button: <button onClick={() => handleClick(loc)}>Click me</button>,
        }));

        const positions = allLocation.map(loc => ({
          lng: parseFloat(loc.longitude),
          lat: parseFloat(loc.latitude),
        }));

        setPosition(positions);
        setIsLoading(false);
        setData(prevData => ({ ...prevData, rows }));
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleClick = (loc) => {
    // Handle click logic here
  };

  const [open, setOpen] = useState(false);
  
  const rightContainerStyle = {
    width: "48%",
    float: "right",
  };
  const leftContainerStyle = {
    width: "48%",
    float: "left",
  };
  const middlept = {lat:22.302711, lng:	114.177216};

  return (
    <>
      {isLoadingPos ? (
        <div>Loading...</div>
      ) : (
        <>
          <span style={leftContainerStyle}>
            <MDBDataTable
              striped
              bordered
              small
              data={data}
            />
          </span>


          <span style={rightContainerStyle}>
            <APIProvider apiKey="AIzaSyDnnM8ImABBdwbXJySZCjp1X_l2FMqo21w">
              <div style={{ height: "100vh", width: "100%" }}>
                <Map zoom={10.5} center={middlept} mapId="ce6f78456381dae6">
                  <AdvancedMarker position={position[0]} onClick={() => setOpen(true)}></AdvancedMarker>
                  {open && (
                    <InfoWindow position={position[0]} onCloseClick={() => setOpen(false)}>
                      <p>{data.rows[0].name}</p>
                    </InfoWindow>
                  )}
                  <AdvancedMarker position={position[1]} onClick={() => setOpen(true)}></AdvancedMarker>
                  {open && (
                    <InfoWindow position={position[1]} onCloseClick={() => setOpen(false)}>
                      <p>{data.rows[1].name}</p>
                    </InfoWindow>
                  )}
                  <AdvancedMarker position={position[2]} onClick={() => setOpen(true)}></AdvancedMarker>
                  {open && (
                    <InfoWindow position={position[2]} onCloseClick={() => setOpen(false)}>
                      <p>{data.rows[2].name}</p>
                    </InfoWindow>
                  )}
                  <AdvancedMarker position={position[3]} onClick={() => setOpen(true)}></AdvancedMarker>
                  {open && (
                    <InfoWindow position={position[3]} onCloseClick={() => setOpen(false)}>
                      <p>{data.rows[3].name}</p>
                    </InfoWindow>
                  )}
                  <AdvancedMarker position={position[4]} onClick={() => setOpen(true)}></AdvancedMarker>
                  {open && (
                    <InfoWindow position={position[4]} onCloseClick={() => setOpen(false)}>
                      <p>{data.rows[4].name}</p>
                    </InfoWindow>
                  )}
                  <AdvancedMarker position={position[5]} onClick={() => setOpen(true)}></AdvancedMarker>
                  {open && (
                    <InfoWindow position={position[5]} onCloseClick={() => setOpen(false)}>
                      <p>{data.rows[5].name}</p>
                    </InfoWindow>
                  )}
                  <AdvancedMarker position={position[6]} onClick={() => setOpen(true)}></AdvancedMarker>
                  {open && (
                    <InfoWindow position={position[6]} onCloseClick={() => setOpen(false)}>
                      <p>{data.rows[6].name}</p>
                    </InfoWindow>
                  )}
                  <AdvancedMarker position={position[7]} onClick={() => setOpen(true)}></AdvancedMarker>
                  {open && (
                    <InfoWindow position={position[7]} onCloseClick={() => setOpen(false)}>
                      <p>{data.rows[7].name}</p>
                    </InfoWindow>
                  )}
                  <AdvancedMarker position={position[8]} onClick={() => setOpen(true)}></AdvancedMarker>
                  {open && (
                    <InfoWindow position={position[8]} onCloseClick={() => setOpen(false)}>
                      <p>{data.rows[8].name}</p>
                    </InfoWindow>
                  )}
                  <AdvancedMarker position={position[9]} onClick={() => setOpen(true)}></AdvancedMarker>
                  {open && (
                    <InfoWindow position={position[9]} onCloseClick={() => setOpen(false)}>
                      <p>{data.rows[9].name}</p>
                    </InfoWindow>
                  )}
                </Map>
              </div>
            </APIProvider>
          </span>
        </>
      )}

    </>
  );
};

export default LocationTable;