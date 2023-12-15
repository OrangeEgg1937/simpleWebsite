import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";

const URL = "http://localhost:8080/api/users/login"

// ref:https://www.w3schools.com/js/js_cookies.asp
// general function for cookies
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

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

const Login = (props) => {
    const [userid, setuserID] = useState("")
    const [password, setPassword] = useState("")
    const [error_msg, seterrpr_msg] = useState("")
    
    const navigate = useNavigate();

    const onButtonClick = () => {
        // Set error messages
        seterrpr_msg("")
        if ("" === userid) {
            seterrpr_msg("Please enter your user id")
            return
        }
        if ("" === password) {
            seterrpr_msg("Please enter a password")
            return
        }

        // handle login
        try{
            axios.post(URL, {
                "userid": userid,
                "password": password
            }).then(res => {
                if (res.status === 200) {
                    console.log(res.data);
                    setCookie("userid", userid, 1);
                    setCookie("token", res.data.token, 0.1);
                    setCookie("username", res.data.username, 1);
                    console.log(getCookie("userid"));
                    console.log(getCookie("token"));
                    console.log(getCookie("token"));
                    axios.get("http://localhost:8080/api/users/check", {})
                    .then(res => {console.log(res.data);})
                    navigate("../index", { replace: true });
                } else {
                    seterrpr_msg("Incorrect user id or password");
                }
            }).catch(err => {
                seterrpr_msg("Incorrect user id or password");
            });
        }catch(err){
            seterrpr_msg("Incorrect user id or password")
        }
        
    }

    return <div className={"mainContainer"}>
        <div className={"titleContainer"}>
            <div>Login</div>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={userid}
                placeholder="Enter your username here"
                onChange={ev => setuserID(ev.target.value)}
                className={"inputBox"} />
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={password}
                placeholder="Enter your password here"
                type="password"
                onChange={ev => setPassword(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{error_msg}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                className={"inputButton"}
                type="button"
                onClick={onButtonClick}
                value={"Log in"} />
        </div>
    </div>
}

export default Login