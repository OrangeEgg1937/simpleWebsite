import React from "react";

class EventAdmin extends React.Component {
    handleSearch = async (event) => {
        event.preventDefault();
        const eventId = document.getElementById('search-bar').value;

        try {
            //TODO
            // const response = await fetch()
            // const eventDetails = await Response.json();
            const eventDetails = {
                "_id": {
                  "$oid": "657bf1a9511cba7043c04612"
                },
                "eventid": 154881,
                "__v": 0,
                "desce": "For details, please refer to the facebook page of the presenter",
                "presenterorge": "Presented by Make Friends With Puppet",
                "price": "$240",
                "progtime": "15 Dec 2023 (Fri) 7:45pm\n16 Dec 2023 (Sat) 2:30pm, 7:45pm\n17 Dec 2023 (Sun) 11:00am, 2:30pm, 5:00pm",
                "title": "‘Cheers!’ Series: Sweetyland III A Whistle of Dreams by Make Friends With Puppet",
                "venueid": 36310036
              };
        
            document.getElementById('editEventTitle').value = eventDetails.title;
            document.getElementById('editPresenterOrg').value = eventDetails.presenterorge;
            document.getElementById('editProgTime').value = eventDetails.progtime;
            document.getElementById('editVenueId').value = eventDetails.venueid;
            document.getElementById('editPrice').value = eventDetails.price;
            document.getElementById('editDesce').value = eventDetails.desce;

        } catch (error) {
            console.error('Error fetching event details:', error);

            document.getElementById('editEventTitle').value = "N/A";
            document.getElementById('editPresenterOrg').value = "N/A";
            document.getElementById('editProgTime').value = "N/A";
            document.getElementById('editVenueId').value = "N/A";
            document.getElementById('editPrice').value = "N/A";
            document.getElementById('editDesce').value = "N/A";

        }
    };

    handleUpdate = async (event) => {
        event.preventDefault();
        const eventTitle = document.getElementById('editEventTitle').value;
        const presenterOrg = document.getElementById('editPresenterOrg').value;
        const progTime = document.getElementById('editProgTime').value;
        const venueId = document.getElementById('editVenueId').value;
        const price = document.getElementById('editPrice').value;
        const description = document.getElementById('editDesce').value; 

        // update event
        const data = {
              desce: description,
              presenterorge: presenterOrg,
              price: price,
              progtime: progTime,
              title: eventTitle,
              venueid: venueId
        };

        // PUT data to server
    };

    render() {
        return (
            <>
                <h1>HI</h1>
                <input type="text" id="search-bar" placeholder="Search Event" />
                <button id="search-button" class="btn btn-light">Search</button>
                <ul id="full-list"></ul>

                <div id="list-container">
                    <div id="event-details"></div>
                    <button id="create-button" class="btn btn-primary">Create</button>
                    <button id="update-button" class="btn btn-warning">Update</button>
                    <button id="delete-button" class="btn btn-danger">Delete</button>
                </div>

                <div>
                    <h3>Update Event</h3>
                    <form id="searchEventForm">
                        <label for="searchEventID">Event ID:</label>
                        <input type="text" id="searchEventID" name="searchEventID" />
                        <input type="submit" value="Search" />
                        <br />
                    </form>

                    <form id="updateEventForm">
                        <label for="editEventTitle">Title:</label>
                        <input type="text" id="editEventTitle" name="editEventTitle" />
                        <br />

                        <label for="editPresenterOrg">Presenter Organization:</label>
                        <input type="text" id="editPresenterOrg" name="editPresenterOrg" />
                        <br />

                        <label for="editProgTime">Program Time:</label>
                        <input type="text" id="editProgTime" name="editProgTime" />
                        <br />

                        <label for="editVenueId">Venue ID:</label>
                        <input type="text" id="editVenueId" name="editVenueId" />
                        <br />

                        <label for="editPrice">Price:</label>
                        <input type="text" id="editPrice" name="editPrice" />
                        <br />

                        <label for="editDesce">Description:</label>
                        <textarea type="text" id="editDesce" name="editDesce"></textarea>
                        <br />

                        <input type="submit" id="submitUpdate" value="Submit Update" disabled />
                    </form>

                </div>
            </>
        );
    }
}

export default EventAdmin;