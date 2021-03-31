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

    )

    function handleUser(e){
        setUser(e.target.value)
    }

    function handlePass(e){
        setPass(e.target.value)
    }
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    function loginButton(){
        let csrf = getCookie('csrftoken');
        fetch("http://localhost:8000/account/login/", {
            method: "POST",
            headers: {
                "X-CSRFToken": csrf ,
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({username: user, password: pass})
        })
        .then((res) => {
            if (res.status == 200) {
                setAuthenticated(1);
            } else {
                setAuthenticated(2);
            }
            console.log(res);
        })
        .catch((err)=> {
            console.error(err);
        });
    }
}