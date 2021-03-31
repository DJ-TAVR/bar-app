import React from 'react'
import '../App.css'
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarFooter, SidebarContent } from 
'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';


import { Link } from 'react-router-dom'


export default function CustomSidebar(props){

    return(
    <div class="follow">
    <ProSidebar popperArrow = "true" className = "sidebarSize" width = "175px">
        <SidebarContent>
        <Menu iconShape = "square">
            <MenuItem class = "normal"></MenuItem>
          <MenuItem>Help</MenuItem>
          <SubMenu title = "Statistics">
            <MenuItem><Link to = "/bartender">Bartender</Link></MenuItem>
            <MenuItem><Link to = "/drinks">Drinks</Link></MenuItem>
          </SubMenu>
          <MenuItem><Link to = "/stickers">Manage Stickers</Link></MenuItem>
          <MenuItem><Link to = "/registration">Registration</Link></MenuItem>
        </Menu>
        </SidebarContent>
        <SidebarFooter>
            <Menu>
                <MenuItem><Link to = "/">Log Out</Link></MenuItem>
            </Menu>
        </SidebarFooter>
      </ProSidebar>
    </div>
    )
}