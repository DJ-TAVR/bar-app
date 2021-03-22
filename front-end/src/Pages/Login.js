import '../App.css'
import ReactDOM from 'react-dom';
import React, {useState, useEffect} from "react";
import {TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom'
import { ProSidebar, Menu, MenuItem, SubMenu } from 
'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

const useStyles = makeStyles({
    root: {
      color: "white"
    },
    input: {
        color: "white"
    }
});


export default function Login(props){

    const [openBar, setOpenBar] = React.useState(false)

    const classes = useStyles();
    return(
        <div class = "row">
            <ProSidebar className = "sidebarSize" width = "200px" collapsed = {openBar}>
                <Menu iconShape = "square">
                    <MenuItem onClick = {toggleSidebar}>Open Sidebar</MenuItem>
                    <MenuItem>Dashboard</MenuItem>
                    <SubMenu title = "Components">
                    <MenuItem>Component 1</MenuItem>
                    <MenuItem>Component 2</MenuItem>
                    </SubMenu>
                </Menu>
            </ProSidebar>
                <div class="App-header stay">
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
                            <Button color = "primary">Login</Button>{' '}
                    </Link>
                </div>
            </div>
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
            console.log(res)
        })
        .catch((err)=> {
            console.error(err)
        });
    }
}