import '../App.css'
import ReactDOM from 'react-dom';
import React, {useState, useEffect} from "react";
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom'

export default function Home(props) {
    return(
        <div className="App">
        <header className="App-header">
        <h1>Bar <h2> IQ </h2> </h1>
            <Link to = "/login">
                <Button color = "button loginButton"> Log In </Button> 
            </Link>
            <Link to = "/register">
                <Button className = "button bartenderButton" > Register as Bartender </Button>
            </Link>
        
        </header>
      </div>
    )
    
    function adminReg(){
        props.handleUserType("admin")
    }

    function userReg(){
        props.handleUserType("user")
    }
}
