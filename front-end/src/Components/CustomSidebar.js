
import '../App.css'
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarFooter, SidebarContent } from
'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Button } from 'reactstrap';
import ReactDOM from 'react-dom';
import React, {useState, useEffect} from "react";
import {TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';



import { Link, Redirect } from 'react-router-dom'


export default function CustomSidebar(props){

    const [logged, setLogged] = React.useState(true)


    return(
    <div class = "follow">
    <ProSidebar popperArrow = "true" className = "sidebarSize" width = "175px">
        <SidebarContent>
        <Menu iconShape = "square">
          <MenuItem class = "normal"></MenuItem>

          <SubMenu title = "Insights">
            <MenuItem><Link to = "/drinks">Inventory</Link></MenuItem>
            <MenuItem><Link to = "/bartender">Bartender</Link></MenuItem>
          </SubMenu>
          <SubMenu title = "Management">
            <MenuItem><Link to = "/stickers">Stickers</Link></MenuItem>
            <MenuItem><Link to = "/addBartender">Bartenders</Link></MenuItem>
          </SubMenu>
          {/* <MenuItem><Link to = "/registration">Registration</Link></MenuItem> */}
          <MenuItem><Link to = "/help">Help</Link></MenuItem>
        </Menu>
        </SidebarContent>
        <SidebarFooter>
            <Menu>
                <MenuItem><Link to = "/login">Logout</Link></MenuItem>
            </Menu>
        </SidebarFooter>
      </ProSidebar>
    </div>
    )
}