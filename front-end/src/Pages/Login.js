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

    function toggleSidebar(){
        if(openBar){
            setOpenBar(false);
        }else{
            setOpenBar(true);
        }
    }
}