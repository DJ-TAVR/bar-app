import ReactDOM from 'react-dom';
import React, {useState, useEffect} from "react";
import Table from 'react-bootstrap/Table'
import { Button } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom'
import { useTable, useSortBy } from 'react-table'

var selector = 0;

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
    const table = document.getElementById("stickers");
    let newValues = []
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
        newValues.push({
            id: changes[0],
            brand: changes[1],
            type: changes[2],
            mlpp: changes[3],
            price: changes[4]
        })
    }
    console.log(newValues);
    document.getElementById("submitChanges").style.visibility = "hidden";
}

export default function Stickers(props) {
    const columns = React.useMemo(() => [{
        Header: "Sticker ID",
        accessor: "id" 
    }, {
        Header: "Brand",
        accessor: "brand",
    }, {
        Header: "Drink Type",
        accessor: "type",
    }, {
        Header: "MLPP (L)",
        accessor: "mlpp",
    }, {
        Header: "Price Per Liter (L)",
        accessor: "price",
    }], []);

    let data = React.useMemo(() => [{
        id: "NCC-1701",
        brand: "Captain Morgan",
        type: "rum",
        mlpp: "3",
        price: "5"
    }, {
        id: "NCC-1337",
        brand: "",
        type: "",
        mlpp: "",
        price: ""
    }], []);

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