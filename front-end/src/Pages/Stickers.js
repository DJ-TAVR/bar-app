import ReactDOM from 'react-dom';
import React, {useState, useEffect} from "react";
import Table from 'react-bootstrap/Table'
import { Button } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom'
import { useTable, useSortBy } from 'react-table'
import CustomSidebar from "../Components/CustomSidebar"
var selector = 0;

export default function Stickers(props) {
    const [data, setData] = React.useState([]);

    const columns = React.useMemo(() => [{
        Header: "Sticker ID",
        accessor: "sticker_id" 
    }, {
        Header: "Brand",
        accessor: "drink_name",
    }, {
        Header: "Drink Type",
        accessor: "drink_type",
    }, {
        Header: "MLPP (L)",
        accessor: "drink_size",
    }, {
        Header: "Price Per Liter (L)",
        accessor: "price",
    }], []);

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    
    function editData(e) {
        const el = e.target;
        const index = Array.prototype.indexOf.call(el.parentNode.children, el);
        const th = document.querySelector('#stickers th:nth-child(' + (index+1) + ')');
        selector += 1;
        if (!th.textContent.includes("Sticker ID")) {
            el.innerHTML = "<input class='StickerInput' id='n" + selector + "' value='" + el.textContent + "'> </input>";
            document.getElementById("n"+selector).focus();
        }
        document.getElementById("submitChanges").style.visibility = "visible";
    }
    
    function submit() {
        let csrf = getCookie('csrftoken');
        const table = document.getElementById("stickers");
        selector = 0;
        for (let i = 1, row; row = table.rows[i]; i++) {
            let changes = []
            let changeHappens = false;
            for (var j = 0, col; col = row.cells[j]; j++) {
                if (col.firstChild.className == "StickerInput") {
                    changes.push(col.firstChild.value)
                    col.innerHTML = col.firstChild.value
                    changeHappens = true;
                } else {
                    changes.push(col.innerHTML)
                }
            }
            if (changeHappens) {
                fetch("http://localhost:8000/sticker/update/", {
                    method: "PUT",
                    headers: {
                        "X-CSRFToken": csrf ,
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    sticker_id: changes[0],
                    body: JSON.stringify({
                        sticker_id: changes[0],
                        drink_name: changes[1],
                        drink_type: changes[2],
                        drink_size: changes[3],
                        price: changes[4]
                    })
                })
                .then((res) => {
                    console.log(res)
                })
            }
        }
        document.getElementById("submitChanges").style.visibility = "hidden";
    }

    function updateTable() {
        let csrf = getCookie('csrftoken');
        fetch("http://localhost:8000/sticker/get/", {
            headers: {
                "X-CSRFToken": csrf ,
            },
            credentials: "include"
        }).then(r =>  r.json().then(data => ({status: r.status, body: data})))
        .then(obj => setData(obj.body));
    }

    function addSticker() {
        let csrf = getCookie('csrftoken');
        fetch("http://localhost:8000/sticker/create/", {
            method: "POST",
            headers: {
                "X-CSRFToken": csrf ,
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                sticker_id: (Math.floor(Math.random() * 100) + 1).toString(),
                drink_name: "test",
                drink_type: "lemon",
                drink_size: "12",
                price: "3.50"
            })
        })
        .then((res) => {
            console.log(res)
        }).then(() =>{
            updateTable();
        })
    }

    function removeSticker() {
        let csrf = getCookie('csrftoken');
        let lastRow = document.getElementById("stickers").rows;
        let lastID = lastRow[lastRow.length - 1].children[0].innerText;
        fetch("http://localhost:8000/sticker/delete/", {
            method: "POST",
            headers: {
                "X-CSRFToken": csrf ,
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                sticker_id: lastID,
            })
        })
        .then((res) => {
            console.log(res)
        }).then(() =>{
            updateTable();
        })
    }
    
    useEffect(() => {
        updateTable();
    }, []);

    let {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data }, useSortBy);

    return(
        <div class ="row">
            <CustomSidebar isAuth = {props.isAuth} setIsAuth = {props.setIsAuth} csrfToken = {props.csrfToken} setCSRFToken = {props.setCSRFToken} />
            <div class = "stay wide center">

            <h1 class = "Table_Text">Manage Stickers</h1>
            <div class = "tableDiv">
            <Table {...getTableProps()} className = "Table-header" id="stickers">
                <colgroup>
                    <col class = "green"/>
                </colgroup>
                <thead> {
                    headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}> {
                            headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}> 
                                    {column.render('Header')} 
                                    {column.isSorted ? column.isSortedDesc ? '▲' : '▼': ''}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}> {
                    rows.map(row => {
                        prepareRow(row);
                        return (
                        <tr {...row.getRowProps()}> {
                                row.cells.map(cell => {
                                    return (
                                        <td {...cell.getCellProps()} 
                                                    className="StickerElement"
                                                    onClick={editData}> 
                                                        {cell.render('Cell')}
                                        </td>
                                    );
                                })} 
                        </tr>)
                    })}
                </tbody>
            </Table>
            </div>
            <Button className = "button managerButton" id="submitChanges" onClick={submit}>Submit</Button>
            {/* Demonstration Commands */}
            <Button onClick={addSticker}>Add Sticker to Bar</Button>
            <br/>
            <Button onClick={removeSticker}>Remove Sticker from Bar</Button>
        </div>
        </div>
    )
}