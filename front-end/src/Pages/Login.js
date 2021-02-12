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
    const [token,setToken] = useState(0);

    const classes = useStyles();
    return(
        <div class="App-header">
        <h1> BarIQ </h1>
        <TextField className = {classes.root}
        InputLabelProps = {{
            className: classes.input
        }}
        InputProps = {{
            className: classes.input
        }}
        label="Username" />
        <TextField className = {classes.root}
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
                <Button className = "button bartenderButton" onClick = {GetCSRF()}>Login</Button>
        </Link>
        </div>
        </div>
    )
}


  function GetCSRF() {
    fetch("http://localhost:8000/api/csrf/", {
      credentials: "include",
    })
    .then((res) => {
      let csrfToken = res.headers.get("X-CSRFToken");
      this.setToken({csrf: csrfToken});
      alert(token);
    })
    .catch((err) => {
      alert(err);
    });
  }
