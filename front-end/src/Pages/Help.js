import React from 'react'
import '../App.css'
import 'react-pro-sidebar/dist/css/styles.css';
import CustomSidebar from '../Components/CustomSidebar';


export default function Help(props){

    return(
        <div class = "row">
        <CustomSidebar isAuth = {props.isAuth} setIsAuth = {props.setIsAuth} csrfToken = {props.csrfToken} setCSRFToken = {props.setCSRFToken}/>
        <div class = "stay center">
        <h1 className = "Table_Text"> Help </h1>
        <h1 className = "Table_Text"> Use the sidebar to navigate through this application. </h1>
        <h1 className = "Table_Text"> Click on Statistics -> Bartender to view statistics on the bartenders </h1>
        <h1 className = "Table_Text"> Click on Statistics -> Drinks to view properties of the various drinks </h1>
        <h1 className = "Table_Text"> Click on Manage stickers to assign stickers to various bar codes </h1>
        <h1 className = "Table_Text"> Click on Registration to register as a bartender on this app</h1>
        </div>
        </div>
    )
}