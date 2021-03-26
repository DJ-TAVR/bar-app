
import '../App.css'
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarFooter, SidebarContent } from 
'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Button } from 'reactstrap';
import ReactDOM from 'react-dom';
import React, {useState, useEffect} from "react";
import {TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';



import { Link } from 'react-router-dom'


export default function CustomSidebar(props){

    return(
    <div>
    <ProSidebar popperArrow = "true" className = "sidebarSize" width = "175px">
        <SidebarContent>
        <Menu iconShape = "square">
          <MenuItem class = "normal"></MenuItem>
        
          <SubMenu title = "Statistics">
            <MenuItem><Link to = "/bartender">Bartender</Link></MenuItem>
            <MenuItem><Link to = "/drinks">Drinks</Link></MenuItem>
          </SubMenu>
          <MenuItem><Link to = "/stickers">Manage Stickers</Link></MenuItem>
          <MenuItem><Link to = "/registration">Registration</Link></MenuItem>
          <MenuItem><Link to = "/help">Help</Link></MenuItem>
        </Menu>
        </SidebarContent>
        <SidebarFooter>
            <Menu>
                <MenuItem onClick = {logoutButton}><Link to = "/">Logout</Link></MenuItem>
            </Menu>
        </SidebarFooter>
      </ProSidebar>
    </div>
    )

    function logoutButton(){
        fetch("http://localhost:8000/logout/")
        .then((res) => {
            console.log(res)
        })
        .catch((err)=> {
            console.error(err)
        });
    }
}