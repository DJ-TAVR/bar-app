import ReactDOM from 'react-dom';
import React, {useState, useEffect} from "react";
import Table from 'react-bootstrap/Table'
import { Button } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom'
import { useTable, useSortBy, useRowSelect } from 'react-table'
import CustomSidebar from "../Components/CustomSidebar"

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

export default function AddBartender(props) {
    const [data, setData] = React.useState([]);

    const columns = React.useMemo(() => [{ 
        Header: "Bartender ID",
        accessor: "bartender_id" 
    },{
        Header: "First Name",
        accessor: "first_name" 
    },  {
        Header: "Last Name",
        accessor: "last_name",
    }, {
        Header: "Email",
        accessor: "email",
    }], []);

    
    function editData(e) {
        const el = e.target;
        const index = Array.prototype.indexOf.call(el.parentNode.children, el);
        const th = document.querySelector('#stickers th:nth-child(' + (index+1) + ')');
        selector += 1;
        if (!th.textContent.includes("Bartender ID")) {
            el.innerHTML = "<input class='StickerInput' id='n" + selector + "' value='" + el.textContent + "'> </input>";
            document.getElementById("n"+selector).focus();
            document.getElementById("submitChanges").style.visibility = "visible";
        }
    }
    
    function submit() {
        let csrf = getCookie('csrftoken');
        const table = document.getElementById("stickers");
        let removals = [];
        selector = 0;
        for (let i = 1, row; row = table.rows[i]; i++) {
            let changes = [];
            let changeHappens = false;
            if (row.cells[0].firstChild.checked) {
                removals.push(row.cells[1].innerHTML)
            }
            for (var j = 1, col; col = row.cells[j]; j++) {
                if (col.firstChild.className == "StickerInput") {
                    changes.push(col.firstChild.value)
                    col.innerHTML = col.firstChild.value
                    changeHappens = true;
                } else {
                    changes.push(col.innerHTML)
                }
            }
            if (changeHappens) {
                fetch("http://localhost:8000/account/update_bartender/", {
                    method: "POST",
                    headers: {
                        "X-CSRFToken": csrf ,
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        id: changes[0],
                        first_name: changes[1],
                        last_name: changes[2],
                        email: changes[3],
                    })
                })
                .then((res) => {
                    console.log(res)
                })
            }
        }
        for (let i of removals) {
            fetch("http://localhost:8000/account/delete_bartender/", {
                method: "POST",
                headers: {
                    "X-CSRFToken": csrf ,
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    id: i
                })
            }).then((res) => {
                updateTable();
                console.log(res)
            })
        }
        document.getElementById("submitChanges").style.visibility = "hidden";
    }

    function updateTable() {
        fetch("http://localhost:8000/account/get_bartenders/", {
            credentials: "include"
        }).then(r =>  r.json().then(data => ({status: r.status, body: data})))
        .then(obj => {
            let displayData = [];
            for (let i of obj.body) {
                let lone = i.account;
                lone.bartender_id = i.id;
                displayData.push(lone);
            }
            setData(displayData);
        });
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
    } = useTable({ columns, data }, useSortBy, useRowSelect,
        hooks => {
            hooks.visibleColumns.push(columns => [
              {
                id: 'remove',
                Header: "Remove?",
                Cell: ({ row }) => (
                    <input type="checkbox" class = "checkbox"/>
                ),
              },
              ...columns,
            ])
          });

    return(
        <div class ="row">
            <CustomSidebar isAuth = {props.isAuth} setIsAuth = {props.setIsAuth} csrfToken = {props.csrfToken} setCSRFToken = {props.setCSRFToken} />
            <div class = "stay widex center">

            <h1 class = "Table_Text">Manage Bartenders</h1>
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
            <Link to = "/registration"><Button>Add Bartender</Button></Link>
            <br/>
            <Button className = "button managerButton" id="submitChanges" onClick={submit}>Submit</Button>
        </div>
        </div>
    )
}