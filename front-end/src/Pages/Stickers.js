import ReactDOM from 'react-dom';
import React, {useState, useEffect} from "react";
import Table from 'react-bootstrap/Table'
import { Button } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom'
import { useTable } from 'react-table'

function editData(e) {
    const el = e.target;
    const index = Array.prototype.indexOf.call(el.parentNode.children, el);
    const th = document.querySelector('#stickers th:nth-child(' + (index+1) + ')');
    if (!th.textContent.includes("Sticker ID")) {
        const input = document.createElement("input");
        input.setAttribute("value", el.textContent);
        input.className = "StickerInput";
        el.replaceWith(input);
        const save = function() {
            const previous = document.createElement(el.tagName.toLowerCase());
            previous.onClick = {editData};
            previous.textContent = input.value.trim();
            previous.className = "StickerElement";
            input.replaceWith(previous);
        };
        input.addEventListener('blur', save, {
            once: true,
        });
        input.focus();
    }
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
    } = useTable({ columns, data });

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
                                <th {...column.getHeaderProps()}> {column.render('Header')} </th>
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
                                    return (<td {...cell.getCellProps()} 
                                                className="StickerElement"
                                                onClick={editData}> 
                                                    {cell.render('Cell')} 
                                            </td>
                                        );
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}