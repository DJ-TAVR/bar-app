import '../App.css'
import ReactDOM from 'react-dom';
import React, {useState, useEffect} from "react";
import {TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom'
import CustomSidebar from '../Components/CustomSidebar';

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

const useStyles = makeStyles({
    root: {
      color: "white"
    },
    input: {
        color: "white"
    }
});

export default function AddSticker(props){
    const [name, setName] = React.useState("");
    const [type, setType] = React.useState("");
    const [size, setSize] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [target, setTarget] = React.useState("");

    const classes = useStyles();

    function handleName(e){
        setName(e.target.value)
    }

    function handleType(e){
        setType(e.target.value)
    }

    function handleSize(e){
        setSize(e.target.value)
    }

    function handlePrice(e){
        setPrice(e.target.value)
    }
    
    function handleTarget(e){
        setTarget(e.target.value)
    }
    
    return(
        <div class="row">
            <CustomSidebar isAuth = {props.isAuth} setIsAuth = {props.setIsAuth} csrfToken = {props.csrfToken} setCSRFToken = {props.setCSRFToken}/>
            <div class = "stay wide center">
        <h1> BarIQ </h1>
        
        <TextField className = {classes.root}
        onChange = {(e) => {handleName(e)}}
        InputLabelProps = {{
            className: classes.input
        }}
        InputProps = {{
            className: classes.input
        }}
        label="Name" />

        <TextField className = {classes.root}
        onChange = {(e) => {handleType(e)}}
        InputLabelProps = {{
            className: classes.input
        }
        }
        InputProps = {{
            className: classes.input
        }}
        label="Type" />

        <TextField className = {classes.root}
        onChange = {(e) => {handleSize(e)}}
        InputLabelProps = {{
            className: classes.input
        }}
        InputProps = {{
            className: classes.input
        }}
        label="Size" />

    <TextField className = {classes.root}
        onChange = {(e) => {handlePrice(e)}}
        InputLabelProps = {{
            className: classes.input
        }}
        InputProps = {{
            className: classes.input
        }}
        label="Price" />

    <TextField className = {classes.root}
        onChange = {(e) => {handleTarget(e)}}
        InputLabelProps = {{
            className: classes.input
        }}
        InputProps = {{
            className: classes.input
        }}
        label="Target" />

        <div class = "spaceTop">
        <Link to = "/stickers">
            <Button onClick = {addSticker} className = "button bartenderButton">Register Sticker</Button>
        </Link>
        <Link to = "/stickers">
            <Button className = "button bartenderButton">Back</Button>
        </Link>
        </div>
        </div>
      </div>
    )

    function addSticker() {
        let csrf = getCookie('csrftoken');
        fetch("http://localhost:8000/sticker/create/", {
            method: "POST",
            headers: {
                "X-CSRFToken": csrf ,
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                sticker_id: (Math.floor(Math.random() * 100) + 1).toString(),
                drink_name: name,
                drink_type: type,
                drink_size: size,
                price: price,
                target: target
            })
        })
        .then((res) => {
            console.log(res)
        })
    }
}

