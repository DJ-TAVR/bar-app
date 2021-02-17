import ReactDOM from 'react-dom';
import React, {useState, useEffect} from "react";
import Table from 'react-bootstrap/Table'
import { Button } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom'

class Stickers extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    // Adapted from https://stackoverflow.com/questions/33267797/
    editData = (e) => {
        const el = e.target;
        const input = document.createElement("input");
        input.setAttribute("value", el.textContent);
        el.replaceWith(input);
        const save = function() {
            const previous = document.createElement(el.tagName.toLowerCase());
            previous.onClick = this.editData;
            previous.className = "stickerElement";
            previous.textContent = input.value;
            input.replaceWith(previous);
        };
        input.addEventListener('blur', save, {
            once: true,
        });
        input.focus();
    }

    render() {
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
                <tr >
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
                <td class="stickerElement" onClick={this.editData}>Captain Morgan</td>
                <td class="stickerElement" onClick={this.editData}>Rum</td>
                <td class="stickerElement" onClick={this.editData}>3</td>
                <td class="stickerElement" onClick={this.editData}>5</td>
                </tr>
    
                <tr>
                <td>NCC-1337</td>
                <td class="nullStickerElement" onClick={this.editData}></td>
                <td class="nullStickerElement" onClick={this.editData}></td>
                <td class="nullStickerElement" onClick={this.editData}></td>
                <td class="nullStickerElement" onClick={this.editData}></td>
                </tr>
    
            </tbody>
            </Table>
            
            </div>
        )
    }
}

export default withRouter(Stickers);