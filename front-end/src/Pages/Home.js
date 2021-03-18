import '../App.css'
import ReactDOM from 'react-dom';
import React, {useState, useEffect} from "react";
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom'
import { ProSidebar, Menu, MenuItem, SubMenu } from 
'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import hamburger from "../hamburger.png";

export default function Home(props) {

    const [openBar, setOpenBar] = useState(true);

    let sideBarOpen = true;
    return(
        <div className="App">
        <ProSidebar className = "sidebarSize" width = "200px" collapsed = {openBar}>
            <Menu iconShape = "square">
                <MenuItem icon = {hamburger}  onClick = {toggleSidebar}>Open Sidebar</MenuItem>
                <MenuItem>Dashboard</MenuItem>
                <SubMenu title = "Components">
                <MenuItem>Component 1</MenuItem>
                <MenuItem>Component 2</MenuItem>
                </SubMenu>
            </Menu>
        </ProSidebar>
        <div class = "stay">
        <h1> BarIQ </h1>
            <Link to = "/register">
                <Button onClick = {adminReg} className = "button managerButton">Register as Bar Manager</Button>
            </Link>
            <Link to = "/register">
                <Button onClick = {userReg} className = "button bartenderButton">Register as Bartender</Button>
            </Link>
            <Link to = "/login">
                <Button className = "button loginButton"> Log In </Button> 
            </Link>
        </div>
      </div>
    )

    function toggleSidebar(){
        if(openBar){
            setOpenBar(false);
        }else{
            setOpenBar(true);
        }
    }
    
    function adminReg(){
        props.handleUserType("admin")
    }

    function userReg(){
        props.handleUserType("user")
    }
}
