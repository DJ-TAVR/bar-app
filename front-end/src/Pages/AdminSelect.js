import React from 'react'
import '../App.css'
import 'react-pro-sidebar/dist/css/styles.css';
import CustomSidebar from '../Components/CustomSidebar';
import logo from '../Assets/logo.png';

export default function AdminSelect(props){

    return(
    <div class = "row">
    <CustomSidebar isAuth = {props.isAuth} setIsAuth = {props.setIsAuth} csrfToken = {props.csrfToken} setCSRFToken = {props.setCSRFToken}/>
    <div class = "stay wide center">
            <img src={logo}/>
            <p/>
            <h1>Welcome!</h1>
            <h6>Please use the sidebar to navigate between pages.</h6>
        </div>
        </div>
    )
}