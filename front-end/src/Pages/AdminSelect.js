import React from 'react'
import '../App.css'
import 'react-pro-sidebar/dist/css/styles.css';
import CustomSidebar from '../Components/CustomSidebar';


export default function AdminSelect(props){

    return(
    <div class = "row">
    <CustomSidebar/>
    <div class = "stay wide center">
            <h1>Welcome!</h1>
        </div>
        </div>
    )
}