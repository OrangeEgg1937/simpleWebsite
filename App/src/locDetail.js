import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Card, Form } from 'react-bootstrap';

const LocationDetailPage = () => {

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

  const locationId  = parseInt(useParams().locName);
  
  const [location, setLocation] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // Fetch the location and comments data from the API
    axios.get(`https://miniature-giggle-69v95pvwv7rh45qw-8080.app.github.dev/api/locations/find?id=${locationId}`) // Replace with the actual API endpoint for retrieving a venue
      .then(response => {
        setLocation(response.data);
      })
      .catch(error => {
        console.error('Error fetching location data:', error);
      });
  }, [locationId]);
  

  const handleAddComment = () => {
    // Send a request to the backend to add a new comment
    axios.post(`https://miniature-giggle-69v95pvwv7rh45qw-8080.app.github.dev/api/users/comment/write`, {
      userid: parseInt(getCookie("userid")), // Replace with the actual userId value
      locid: locationId, // Replace with the actual locId value
      comment: newComment // Replace with the actual newComment value
    }) // Replace with the actual API endpoint for adding a comment
      .then(response => {
        const newCommentData = response.data;
        setComments(prevComments => [...prevComments, newCommentData]);
        setNewComment('');
      })
      .catch(error => {
        console.error('Error adding comment:', error);
      });
  };

  const handleAddFavorite = () => {
    // Send a request to the backend to toggle the favorite status of the location
    axios.post(`https://miniature-giggle-69v95pvwv7rh45qw-8080.app.github.dev/api/users/favorite/write`,{
      userid: parseInt(getCookie("userid")), 
      favourite: locationId,
    }) 
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error('Error adding favorite:', error);
      });
  };

  return (
    <div>
      {location && (
        <Card>
          <Card.Body>
            <Card.Title>Venue: {location.name}</Card.Title>
            <Card.Text>Latitude: {location.latitude}</Card.Text>
            <Card.Text>Longitude: {location.longitude}</Card.Text>
            <Button variant={location.isFavorite ? 'danger' : 'primary'} onClick={handleAddFavorite}>
              {location.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </Button>
          </Card.Body>
        </Card>
      )}
    
      <h3>Comments</h3>
      <Form onSubmit={handleAddComment}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Add a comment"
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Comment
        </Button>
      </Form>

      {comments.map(comment => (
        <Card key={comment._id} className="mt-3">
          <Card.Body>
            <Card.Text>{comment.comment}</Card.Text>
            <Card.Text className="text-muted">Posted by: {comment.userID}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default LocationDetailPage;