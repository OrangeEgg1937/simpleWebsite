// Create the login page
import axios from "axios";
import ReactDOM from "react-dom/client";
import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
} from 'react-router-dom';

const baseURL = "https://automatic-space-invention-jqgvgpr4956h5wv9-8080.app.github.dev/api/locations/find10";

export default function Login() {
    const [post, setPost] = React.useState(null);

    React.useEffect(() => {
        axios.get(baseURL).then((response) => {
            setPost(response.data);
            console.log(response.data);
        });
    }, []);

    if (!post) return null;

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
        </div>
    );
}
