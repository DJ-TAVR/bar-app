import ReactDOM from 'react-dom';
import React, {useState, useEffect} from "react";
import Table from 'react-bootstrap/Table'
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom'
export default function Stickers(props) {
    return(
        <div className="Stickers">
        <Button className = "HelpButton"> ? </Button>
        <Link to = "/admin">
            <Button className = "BackAdminButton">Back to Dashboard</Button>
        </Link>
        <h1 class = "Table_Text">Manage Stickers</h1>
        <Table className = "Table-header">
        <colgroup>
          <col class = "green"/>
        </colgroup>
        <thead>
            <tr>
            <th>Sticker ID</th>
            <th>Brand</th>
            <th>Drink Type</th>
            <th>MLPP (L)</th>
            <th>Price per Liter($)</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td>NCC-1701</td>
            <td>Captain Morgan</td>
            <td>Rum</td>
            <td>3</td>
            <td>5</td>
            </tr>

            <tr>
            <td>NCC-1337</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            </tr>

        </tbody>
        </Table>
        
        </div>
    )
}