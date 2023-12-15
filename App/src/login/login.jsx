// Create the login page
import ReactDOM from "react-dom/client";
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom';

class Login extends React.Component {
    render() {
        return (
            <div>
            <h1>Login Page</h1>
            <button><Link to="/home">Login</Link></button>
            </div>
        );
    }
}

export default Login;