import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Form } from 'react-bootstrap';
import { useParams } from "react-router-dom";

const LocationDetailPage = () => {

  const { locationId } = useParams();
  const [location, setLocation] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // Fetch the location and comments data from the API
    axios.get(`http://localhost:8080/api/venues/${locationId}`) // Replace with the actual API endpoint for retrieving a venue
      .then(response => {
        const locationData = response.data;
        setLocation(locationData);
        setComments(locationData.comments);
      })
      .catch(error => {
        console.error('Error fetching location data:', error);
      });
  }, [locationId]);

  const handleAddComment = () => {
    // Send a request to the backend to add a new comment
    axios.post(`http://localhost:8080/api/venues/${locationId}/comments`, { comment: newComment }) // Replace with the actual API endpoint for adding a comment
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
    axios.post(`http://localhost:8080/api/venues/${locationId}/favorite`) // Replace with the actual API endpoint for adding/removing a venue from favorites
      .then(response => {
        const updatedLocation = response.data;
        setLocation(updatedLocation);
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
            <Card.Title>{location.name}</Card.Title>
            <Card.Text>{location.latitude}</Card.Text>
            <Card.Text>{location.longitude}</Card.Text>
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