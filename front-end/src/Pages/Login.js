import '../App.css'
import ReactDOM from 'react-dom';
import React, {useState, useEffect} from "react";
import {TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from 'reactstrap';
import { ProSidebar, Menu, MenuItem, SubMenu } from 
'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link, Redirect } from 'react-router-dom'

const useStyles = makeStyles({
    root: {
      color: "white"
    },
    input: {
        color: "white"
    }
});


export default function Login(props){

    const [user, setUser] = React.useState("");
    const [pass, setPass] = React.useState("");
    const [authenticated, setAuthenticated] = React.useState(0);

    useEffect(() => {
        fetch("http://localhost:8000/account/session/", {
            credentials: "include",
          })
          .then((res) => res.json())
          .then((data) => {
            console.log("session data: \n", data);
            if (data.isAuthenticated) {
              props.setIsAuth(true)
            } else {
              props.setIsAuth(false)
              getCSRF();
            }
          })
          .catch((err) => {
            console.log(err);
          });
    }
    , [])

    const classes = useStyles();

    if (authenticated == 1) {
        document.getElementById("loginFailure").style.visibility = "hidden";
        return <Redirect to='/admin'/>
    } else if (authenticated == 2) {
        setAuthenticated(0);
        document.getElementById("loginFailure").style.visibility = "visible";
        return <Redirect to='/login'/>
    }

    return(
        (!props.isAuth && (
        <div class="wide">
        <h1> BarIQ </h1>
        <TextField
        onChange = {(e) => {handleUser(e)}}
        className = {classes.root}
        InputLabelProps = {{
            className: classes.input
        }}
        InputProps = {{
            className: classes.input
        }}
        label="Username" />
        <TextField
        onChange = {(e) => {handlePass(e)}}
        className = {classes.root}
        type = "password"
        InputLabelProps = {{
            className: classes.input
        }
        }
        InputProps = {{
            className: classes.input
        }}
        label="Password" />
        <div class = "spaceTop">
        <Button onClick = {loginButton} className = "button bartenderButton">Login</Button>
        </div>
        <p id="loginFailure">Invalid Credentials!</p>
        </div>
        ))||
        (props.isAuth &&
            <div class = "wide">
                <h1>Would you like to log out of your current account?</h1>
                <Button onClick = {logoutButton}>Logout</Button>
                <Link to = "/admin"><Button>Stay Logged In</Button></Link>
            </div>
        )
    )

    function getCSRF(){
        fetch("http://localhost:8000/csrf/", {
            credentials: "include",
          })
          .then((res) => {
            let csrfToken = res.headers.get("X-CSRFToken");
            props.setCSRFToken(csrfToken);
            props.setIsAuth(false)
            console.log("csrf retrieved: " , csrfToken);
          })
          .catch((err) => {
            console.log(err);
          });
    }

    function handleUser(e){
        setUser(e.target.value)
    }

    function handlePass(e){
        setPass(e.target.value)
    }
    
    // function getCookie(name) {
    //     let cookieValue = null;
    //     if (document.cookie && document.cookie !== '') {
    //         const cookies = document.cookie.split(';');
    //         for (let i = 0; i < cookies.length; i++) {
    //             const cookie = cookies[i].trim();
    //             // Does this cookie string begin with the name we want?
    //             if (cookie.substring(0, name.length + 1) === (name + '=')) {
    //                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
    //                 break;
    //             }
    //         }
    //     }
    //     console.log(cookieValue);
    //     return cookieValue;
    // }

    function logoutButton(){
        fetch("http://localhost:8000/account/logout/", {
            method: "POST",
            credentials: "include",
            headers: {
                "X-CSRFToken": props.csrfToken ,
                "Content-Type": "application/json"
            },
        })
        .then((res) => {
            console.log(res)
            if(res.status == 200){
                setAuthenticated(0)
                getCSRF();
            }
        })
        .catch((err)=> {
            console.error(err)
        });
        // setLogged(false)
        // console.log(props.csrfToken)
    }

    function loginButton(){
        fetch("http://localhost:8000/account/login/", {
            method: "POST",
            headers: {
                "X-CSRFToken": props.csrfToken ,
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({username: user, password: pass})
        })
        .then((res) => {
            if (res.status == 200) {
                setAuthenticated(1);
                getCSRF();
            } else {
                setAuthenticated(2);
            }
            console.log(res);
        })
        .catch((err)=> {
            console.error(err);
        });
        // console.log(props.csrfToken)
    }
}