import ReactDOM from 'react-dom';
import React, {useState, useEffect} from "react";
import Table from 'react-bootstrap/Table'
import { Button } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom'
import { useTable, useSortBy } from 'react-table'

var selector = 0;

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
        for (var j = 0, col; col = row.cells[j]; j++) {
            if (col.firstChild.className == "StickerInput") {
                changes.push(col.firstChild.value)
                col.innerHTML = col.firstChild.value
            } else {
                changes.push(col.innerHTML)
            }
        }
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
    document.getElementById("submitChanges").style.visibility = "hidden";
}

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

    useEffect(() => {
        let csrf = getCookie('csrftoken');
        fetch("http://localhost:8000/sticker/get/", {
            headers: {
                "X-CSRFToken": csrf ,
            },
            credentials: "include"
        }).then(r =>  r.json().then(data => ({status: r.status, body: data})))
        .then(obj => setData(obj.body));
    }, []);

    let {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data }, useSortBy);

    return(
        <div className="Stickers">
            <Button className = "HelpButton"> ? </Button>
            <Link to = "/admin">
                <Button className = "BackAdminButton">Back to Dashboard</Button>
            </Link>
            <h1 class = "Table_Text">Manage Stickers</h1>
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
            <Button className = "button managerButton" id="submitChanges" onClick={submit}>Submit</Button>
        </div>
    )
}