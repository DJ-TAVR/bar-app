import ReactDOM from 'react-dom';
import React, {useState, useEffect} from "react";
import Table from 'react-bootstrap/Table'
import { Button } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom'
import { useTable, useSortBy } from 'react-table'
import CustomSidebar from "../Components/CustomSidebar"
var selector = 0;

export default function AddBartender(props) {
    const [data, setData] = React.useState([]);

    const columns = React.useMemo(() => [{
        Header: "First Name",
        accessor: "first_name" 
    }, {
        Header: "Last Name",
        accessor: "last_name",
    }, {
        Header: "Email",
        accessor: "email",
    }], []);

    
    function editData(e) {
        const el = e.target;
        const index = Array.prototype.indexOf.call(el.parentNode.children, el);
        const th = document.querySelector('#bartender th:nth-child(' + (index+1) + ')');
        selector += 1;
        if (!th.textContent.includes("Bartender ID")) {
            el.innerHTML = "<input class='BartenderInput' id='n" + selector + "' value='" + el.textContent + "'> </input>";
            document.getElementById("n"+selector).focus();
        }
        document.getElementById("submitChanges").style.visibility = "visible";
    }
    
    function submit() {
        const table = document.getElementById("bartender");
        selector = 0;
        for (let i = 1, row; row = table.rows[i]; i++) {
            let changes = []
            let changeHappens = false;
            for (var j = 0, col; col = row.cells[j]; j++) {
                if (col.firstChild.className == "BartenderInput") {
                    changes.push(col.firstChild.value)
                    col.innerHTML = col.firstChild.value
                    changeHappens = true;
                } else {
                    changes.push(col.innerHTML)
                }
            }
            if (changeHappens) {
                fetch("127.0.0.1:8000/account/update_bartender/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    bartender_id: changes[0],
                    body: JSON.stringify({
                        first_name: changes[0],
                        last_name: changes[1],
                        email: changes[2],
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
        
        fetch(" 127.0.0.1:8000/account/get_bartenders/", {
            credentials: "include"
        }).then(r =>  r.json().then(data => ({status: r.status, body: data})))
        .then(obj => setData(obj.body));
    }

    // function addBartender() {
    //     fetch("127.0.0.1:8000/account/create_bartender/", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         credentials: "include",
    //         body: JSON.stringify({
    //             first_name: "test",
    //             last_name: "test",
    //             email: "abc@gmail.com",
            
    //         })
    //     })
    //     .then((res) => {
    //         console.log(res)
    //     }).then(() =>{
    //         updateTable();
    //     })
    // }

    function removeBartender() {
        let lastRow = document.getElementById("bartenders").rows;
        let lastID = lastRow[lastRow.length - 1].children[0].innerText;
        fetch("127.0.0.1:8000/account/delete_bartender/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                bartender_id: lastID,
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

            <h1 class = "Table_Text">Manage Employees</h1>
            <div class = "tableDiv">
            <Table {...getTableProps()} className = "Table-header" id="bartenders">
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
                                                    className="BartenderElement"
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
            {/* <Button className = "button managerButton" id="submitChanges" onClick={submit}>Submit</Button> */}
            {/* Demonstration Commands */}
            <Link to = "/registration"><Button>Add Bartender</Button></Link>
            <br/>
            <Button onClick = {removeBartender}>Remove Bartender</Button>
        </div>
        </div>
    )
}