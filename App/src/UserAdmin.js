import axios from "axios";
import React from "react";

class UserAdmin extends React.Component {

    // Create or Update User
    handleCreateOrUpdateUser = async (event) => {
        event.preventDefault();
        let userId = document.getElementById('editSearchUserID').value;
        let username = document.getElementById('editUsername').value;
        let password = document.getElementById('editPassword').value;
        console.log(userId, username, password);
        axios.post('https://scaling-sniffle-pqr77x5p779h65p-8080.app.github.dev/api/users/update' , {
            userid: userId,
            username: username,
            password: password,
            isAdmin: false
        })
        .catch((error) => console.log(error));
    };

    // Search User
    handleSearchUser = async (event) => {
        event.preventDefault();
        const userId = document.getElementById('editSearchUserID').value;

        try {
            //TODO: get user detail by userI
            let userDetails;
            axios.get(`https://scaling-sniffle-pqr77x5p779h65p-8080.app.github.dev/api/users/all`)
            
            .then((response) => {
                userDetails = response.data;
                console.log(response.data);
                document.getElementById('editUsername').value = userDetails.username;
                document.getElementById('editPassword').value = userDetails.password;
            })
            .catch((error) => console.log(error));

        } catch (error) {
            console.error('Error fetching user details:', error);

            document.getElementById('editUsername').value = "N/A";
            document.getElementById('editPassword').value = "N/A";

        }
    };

    handleDeleteUser = async (event) => {
        event.preventDefault();
        const userId = document.getElementById('editSearchUserID').value;

        axios.delete(`https://scaling-sniffle-pqr77x5p779h65p-8080.app.github.dev/api/users/delete` , {
            id: userId,
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
                    <h1>User List</h1>
                </span>
                <span style={rightContainerStyle}>
                    <div>
                        <h3 style={{margin: "0 0 0 2em"}}>Create / Update / Delete User</h3>
                        <form id="searchUserForm">
                            <label htmlFor="editSearchUserID" style={{ fontWeight: 'bold' }}>User ID:</label>
                            <input type="text" id="editSearchUserID" name="editSearchUserID" style={{ width: "60%", padding: "0.5em", margin: "0.5em 1em 0.5em 2em", boxSizing: "border-box", borderRadius: "8px", }} />
                            <input type="submit" value="Search" onClick={this.handleSearchUser} className="btn btn-info" />
                            <br />
                        </form>

                        <form id="updateUserForm">
                            <label htmlFor="editUsername" style={{ fontWeight: 'bold' }}>Username:</label><br />
                            <textarea type="text" id="editUsername" name="editUsername" style={textareaStyle}></textarea>
                            <br />

                            <label htmlFor="editPassword" style={{ fontWeight: 'bold' }}>Password:</label><br />
                            <textarea type="text" id="editPassword" name="editPassword" style={textareaStyle}></textarea>
                            <br />

                            <button type="submit" id="submitCreate" value="submitCreate" className="btn btn-success" style={{margin: "0 0 5em 3em"}} onClick={this.handleCreateOrUpdateUser}>Create</button>

                            <button type="submit" id="submitUpdate" value="Submit Update" className="btn btn-warning" style={{margin: "0 0 5em 3em"}} onClick={this.handleCreateOrUpdateUser} >Update User</button>

                            <button type="submit" id="submitDelete" value="submitDelete" className="btn btn-danger" style={{margin: "0 0 5em 3em"}} onClick={this.handleDeleteUser} >Delete</button>
                        </form>

                    </div>
                </span>
            </>
        );
    }
}

export default UserAdmin;