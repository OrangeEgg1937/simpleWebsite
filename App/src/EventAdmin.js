import axios from "axios";
import React from "react";
import EventTable from "./eventTable";


class EventAdmin extends React.Component {

    handleSearchEvent = async (event) => {
        event.preventDefault();
        const eventId = document.getElementById('editSearchEventID').value;

        try {

            let eventDetails;
            axios.get(`https://scaling-sniffle-pqr77x5p779h65p-8080.app.github.dev/api/events/find?id=${eventId}`)
            .then((response) => {
                eventDetails = response.data;
                console.log(response.data);
                document.getElementById('editEventTitle').value = eventDetails.title;
                document.getElementById('editPresenterOrg').value = eventDetails.presenterorge;
                document.getElementById('editProgTime').value = eventDetails.progtime;
                document.getElementById('editVenueId').value = eventDetails.venueid;
                document.getElementById('editPrice').value = eventDetails.price;
                document.getElementById('editDesce').value = eventDetails.desce;
    
            })
            .catch((error) => console.log(error));

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

        const eventId = document.getElementById('editSearchEventID').value;
        const eventTitle = document.getElementById('editEventTitle').value;
        const presenterOrg = document.getElementById('editPresenterOrg').value;
        const progTime = document.getElementById('editProgTime').value;
        const venueId = document.getElementById('editVenueId').value;
        const price = document.getElementById('editPrice').value;
        const description = document.getElementById('editDesce').value;

        const data = {
            id: eventId,
            desce: description,
            presenterorge: presenterOrg,
            price: price,
            progtime: progTime,
            title: eventTitle,
            venueid: venueId
        };

        axios.post(`https://scaling-sniffle-pqr77x5p779h65p-8080.app.github.dev/api/events/update`, data)
        .catch((error) => console.log(error));

    };

    handleDeleteEvent = async (event) => {
        event.preventDefault();
        const eventId = document.getElementById('editSearchEventID').value;

        axios.delete(`https://scaling-sniffle-pqr77x5p779h65p-8080.app.github.dev/api/events/delete`, {
            id: eventId,
        })
        .catch((error) => console.log(error));
    };

    render() {

        const textareaStyle = {
            width: "80%",
            padding: "0.5em",
            margin: "0.5em 0 0.5em 2em",
            boxSizing: "border-box",
            borderRadius: "8px",
        };

        const leftContainerStyle = {
            width: "48%",
            float: "left",
        };

        const rightContainerStyle = {
            width: "48%",
            float: "right",
        };

        return (
            <>
                <span style={leftContainerStyle}>
                    <h1>Event List</h1>
                    <EventTable />
                </span>
                <span style={rightContainerStyle}>
                    <div>
                        <h3 style={{margin: "0 0 0 2em"}}>Create / Update / Delete Event</h3>
                        <form id="searchEventForm">
                            <label htmlFor="editSearchEventID" style={{ fontWeight: 'bold' }}>Event ID:</label>
                            <input type="text" id="editSearchEventID" name="editSearchEventID" style={{ width: "60%", padding: "0.5em", margin: "0.5em 1em 0.5em 2em", boxSizing: "border-box", borderRadius: "8px", }} />
                            <input type="submit" value="Search" onClick={this.handleSearchEvent} className="btn btn-info" />
                            <br />
                        </form>

                        <form id="updateEventForm">
                            <label htmlFor="editEventTitle" style={{ fontWeight: 'bold' }}>Title:</label><br />
                            <textarea type="text" id="editEventTitle" name="editEventTitle" style={textareaStyle}></textarea>
                            <br />

                            <label htmlFor="editPresenterOrg" style={{ fontWeight: 'bold' }}>Presenter Organization:</label><br />
                            <textarea type="text" id="editPresenterOrg" name="editPresenterOrg" style={textareaStyle}></textarea>
                            <br />

                            <label htmlFor="editProgTime" style={{ fontWeight: 'bold' }}>Program Time:</label><br />
                            <textarea type="text" id="editProgTime" name="editProgTime" style={textareaStyle}></textarea>
                            <br />

                            <label htmlFor="editVenueId" style={{ fontWeight: 'bold' }}>Venue ID:</label><br />
                            <textarea type="text" id="editVenueId" name="editVenueId" style={textareaStyle}></textarea>
                            <br />

                            <label htmlFor="editPrice" style={{ fontWeight: 'bold' }}>Price:</label><br />
                            <textarea type="text" id="editPrice" name="editPrice" style={textareaStyle}></textarea>
                            <br />

                            <label htmlFor="editDesce" style={{ fontWeight: 'bold' }}>Description:</label><br />
                            <textarea type="text" id="editDesce" name="editDesce" style={textareaStyle}></textarea>
                            <br />

                            <button type="submit" id="submitCreate" value="submitCreate" className="btn btn-success" style={{margin: "0 0 5em 3em"}} onClick={this.handleUpdateEvent}>Create</button>

                            <button type="submit" id="submitUpdate" value="Submit Update" className="btn btn-warning" style={{margin: "0 0 5em 3em"}} onClick={this.handleUpdateEvent} >Update Event</button>

                            <button type="submit" id="submitDelete" value="submitDelete" className="btn btn-danger" style={{margin: "0 0 5em 3em"}} onClick={this.handleDeleteEvent} >Delete</button>
                        </form>

                    </div>
                </span>
            </>
        );
    }
}

export default EventAdmin;