import React from 'react'
import { Button } from 'reactstrap';
import '../App.css'
import { Link } from 'react-router-dom'


export default function AdminSelect(props){
    return(
        <div class = "App">
            <Button className = "HelpButton"> ? </Button>
            <Link to = "/">
                <Button className = "BackAdminButton">Logout</Button>
            </Link>
            <header className="App-header">
                <h1>Dashboard</h1>
                <div>
                    <Link to = "/statistics">
                        <Button className = "button managerButton">View Statistics</Button>
                    </Link>

                    <Link to = "/admin">
                        <Button className = "button managerButton">Manage Stickers</Button>
                    </Link>
                </div>
            </header>
        </div>
    )
}