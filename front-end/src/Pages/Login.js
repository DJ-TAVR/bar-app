import '../App.css'
import ReactDOM from 'react-dom';
import React, {useState, useEffect} from "react";
import {TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom'

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

    const classes = useStyles();
    return(
        <div class="App-header">
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
        <Link to = "/admin">
                <Button onClick = {loginButton} className = "button bartenderButton">Login</Button>
        </Link>
        </div>
        </div>
    )

    function handleUser(e){
        setUser(e.target.value)
    }

    function handlePass(e){
        setPass(e.target.value)
    }
    function loginButton(){
        fetch("http://localhost:8000/account/login/", {
            method: "POST",
            headers: {
                "X-CSRFToken": props.csrfToken ,
            },
            body: JSON.stringify({username: user, password: pass})
        })
        .then((res) => {
            // console.log(props.csrfToken)
            console.log(res)
        })
        .catch((err)=> {
            console.error(err)
        });
    }
}