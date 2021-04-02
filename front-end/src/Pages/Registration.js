import '../App.css'
import ReactDOM from 'react-dom';
import React, {useState, useEffect} from "react";
import {TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom'
import CustomSidebar from '../Components/CustomSidebar';

const useStyles = makeStyles({
    root: {
      color: "white"
    },
    input: {
        color: "white"
    }
});

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

export default function Registration(props) {
    const [first, setFirst] = React.useState("");
    const [last, setLast] = React.useState("");
    const [email, setEmail] = React.useState("");

    const classes = useStyles();

    function handleFirst(e){
        setFirst(e.target.value)
    }

    function handleLast(e){
        setLast(e.target.value)
    }

    function handleEmail(e){
        setEmail(e.target.value)
    }

    function registerButton(){
        let csrf = getCookie('csrftoken');
        fetch("http://localhost:8000/account/create_bartender/", {
            method: "POST",
            headers: {
                "X-CSRFToken": csrf ,
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({first_name: first, last_name: last, email: email})
        })
        .then((res) => {
            console.log(res);
        })
        .catch((err)=> {
            console.error(err);
        });
    }

    return(
        <div class="row">
            <CustomSidebar isAuth = {props.isAuth} setIsAuth = {props.setIsAuth} csrfToken = {props.csrfToken} setCSRFToken = {props.setCSRFToken}/>
            <div class = "stay wide center">
        <h1> BarIQ </h1>
        
        <TextField className = {classes.root}
        onChange = {(e) => {handleFirst(e)}}
        InputLabelProps = {{
            className: classes.input
        }}
        InputProps = {{
            className: classes.input
        }}
        label="First Name" />

        <TextField className = {classes.root}
        onChange = {(e) => {handleLast(e)}}
        InputLabelProps = {{
            className: classes.input
        }
        }
        InputProps = {{
            className: classes.input
        }}
        label="Last Name" />

        <TextField className = {classes.root}
        onChange = {(e) => {handleEmail(e)}}
        InputLabelProps = {{
            className: classes.input
        }}
        InputProps = {{
            className: classes.input
        }}
        label="Email Address" />

        <div class = "spaceTop">
        <Link to = "/addBartender">
                <Button onClick = {registerButton} className = "button bartenderButton">Register</Button>
        </Link>
        </div>
        </div>
      </div>
    )
}
