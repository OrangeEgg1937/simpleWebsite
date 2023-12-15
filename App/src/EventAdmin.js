import React from "react";

class EventAdmin extends React.Component {

    // TODO: create event
    handleCreateEvent = async (event) => {
        event.preventDefault();
    };

    handleSearchEvent = async (event) => {
        event.preventDefault();
        const eventId = document.getElementById('editSearchEventID').value;

        try {
            //TODO: get event detail by eventId
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

    handleUpdateEvent = async (event) => {
        event.preventDefault();
        const eventTitle = document.getElementById('editEventTitle').value;
        const presenterOrg = document.getElementById('editPresenterOrg').value;
        const progTime = document.getElementById('editProgTime').value;
        const venueId = document.getElementById('editVenueId').value;
        const price = document.getElementById('editPrice').value;
        const description = document.getElementById('editDesce').value;

        // TODO: update event
        const data = {
            desce: description,
            presenterorge: presenterOrg,
            price: price,
            progtime: progTime,
            title: eventTitle,
            venueid: venueId
        };

        // TODO: update event detail
    };

    // TODO: delete event
    handleDeleteEvent = async (event) => {
        event.preventDefault();
    };

    render() {

        const inputStyle = {
            width: "80%",
            padding: "0.5em",
            margin: "0.5em 0 0.5em 2em",
            boxSizing: "border-box",
            borderRadius: "8px",
        };

        const textareaStyle = {
            width: "80%",
            padding: "0.5em",
            margin: "0.5em 0 0.5em 2em",
            boxSizing: "border-box",
            borderRadius: "8px",
        };

        const leftContainerStyle = {
            width: "50%",
            float: "left",
        };

        const rightContainerStyle = {
            width: "50%",
            float: "right",
        };

        return (
            <>
                <span style={leftContainerStyle}>
                    <h1>Event List</h1>
                </span>
                <span style={rightContainerStyle}>
                    <div>
                        <h3>Create / Update / Delete Event</h3>
                        <form id="searchEventForm">
                            <label for="editSearchEventID" style={{ fontWeight: 'bold' }}>Event ID:</label>
                            <input type="text" id="editSearchEventID" name="editSearchEventID" style={{ width: "60%", padding: "0.5em", margin: "0.5em 1em 0.5em 2em", boxSizing: "border-box", borderRadius: "8px", }} />
                            <input type="submit" value="Search" onClick={this.handleSearch} class="btn btn-info" />
                            <br />
                        </form>

                        <form id="updateEventForm">
                            <label for="editEventTitle" style={{ fontWeight: 'bold' }}>Title:</label><br />
                            <textarea type="text" id="editEventTitle" name="editEventTitle" style={textareaStyle}></textarea>
                            <br />

                            <label for="editPresenterOrg" style={{ fontWeight: 'bold' }}>Presenter Organization:</label><br />
                            <textarea type="text" id="editPresenterOrg" name="editPresenterOrg" style={textareaStyle}></textarea>
                            <br />

                            <label for="editProgTime" style={{ fontWeight: 'bold' }}>Program Time:</label><br />
                            <textarea type="text" id="editProgTime" name="editProgTime" style={textareaStyle}></textarea>
                            <br />

                            <label for="editVenueId" style={{ fontWeight: 'bold' }}>Venue ID:</label><br />
                            <textarea type="text" id="editVenueId" name="editVenueId" style={textareaStyle}></textarea>
                            <br />

                            <label for="editPrice" style={{ fontWeight: 'bold' }}>Price:</label><br />
                            <textarea type="text" id="editPrice" name="editPrice" style={textareaStyle}></textarea>
                            <br />

                            <label for="editDesce" style={{ fontWeight: 'bold' }}>Description:</label><br />
                            <textarea type="text" id="editDesce" name="editDesce" style={textareaStyle}></textarea>
                            <br />

                            <button type="submit" id="submitCreate" value="submitCreate" class="btn btn-success" style={{margin: "0 0 5em 3em"}} onClick={}>Create</button>

                            <button type="submit" id="submitUpdate" value="Submit Update" class="btn btn-warning" style={{margin: "0 0 5em 3em"}} onClick={this.handleUpdateEvent} >Update Event</button>

                            <button type="submit" id="submitDelete" value="submitDelete" class="btn btn-danger" style={{margin: "0 0 5em 3em"}} onClick={this.handleDeleteEvent} >Delete</button>
                        </form>

                    </div>
                </span>
            </>
        );
    }
}

export default EventAdmin;