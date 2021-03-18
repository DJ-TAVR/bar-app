import ReactDOM from 'react-dom';
import React, {useState, useEffect} from "react";
import Table from 'react-bootstrap/Table'
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom'
import {Bar, Doughnut} from 'react-chartjs-2';
import { useTable, useSortBy } from 'react-table'


export default function Bartender(props) {

    const [chartData, setChartData] = React.useState({average_mlpp:5, cumulative_mlpp:0, top3_MLPP:[0, 0, 0], over_pouring_percentage: 5 });
    const [tableData, setTableData] = React.useState([]);

    const columns = React.useMemo(() => [{
        Header: "Shift",
        accessor: "shift" 
    }, {
        Header: "Bartenders Present",
        accessor: "bartenders",
    }, {
        Header: "Liters Overpoured",
        accessor: "liters",
    }, {
        Header: "Amount of Overpouring Instances",
        accessor: "instances",
    }], []);

    let topOverpouring = {
        labels: ['Shift 1', 'Shift 2', 'Shift 3'],
        datasets: [
          {
            label: 'Number of Overpouring Instances',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: chartData.top3_MLPP,
          }
        ]
    }

    let overpourPercent = {
        labels: ["Percentage of Pours that are Overpours", "Percentage of Pours that are Non-overpours"],
        datasets: [
            {
                data: [chartData.over_pouring_percentage, 100 - chartData.over_pouring_percentage],
                backgroundColor: ['rgba(255,0,0,1)', 'rgba(0,255,0,1)'],
            }
        ]

    }

    let averageDifference = chartData.average_mlpp;
    let cumulativePoursAbove = chartData.cumulative_mlpp;

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

    // Doesn't currently work
    function updateChartData() {
        let csrf = getCookie('csrftoken');
        fetch("http://localhost:8000/sticker/shifts_stats/", {
            method: "POST",
            headers: {
                "X-CSRFToken": csrf ,
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                start_time: "2021-03-15 02:00:00", //change these based on filter input
                end_time: "2021-03-17 08:00:00"
            })
        }).then(r =>  r.json().then(data => ({status: r.status, body: data})))
        .then(obj => setChartData(obj.body));
    }

    function updateTableData() {
        setTableData([
            {
                shift: "2021/11/15 5:00:00",
                bartenders: "John Ego, Bill Paxton",
                liters: "10",
                instances: "5"
            },
            {
                shift: "2021/11/15 18:00:00",
                bartenders: "William Billiam, Silly Sam",
                liters: "20",
                instances: "1"
            }
        ]);
    }

    function colorMapper(input, max) {
        input = Math.min(input, max);
        let redness = 255 - ((255 / max) * input);
        return "rgb(255, " + redness + ", " +  redness + ")";
    }

    useEffect(() => {
        updateChartData();
    }, []);

    useEffect(() => {
        updateTableData();
    }, []);

    let {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data: tableData }, useSortBy);

    let colorAvg = colorMapper(Math.abs(averageDifference), 5);
    let colorCum = colorMapper(cumulativePoursAbove, 10);

    return(
        <div className="Inventory">
            <Button className = "HelpButton"> ? </Button>
            <Link to = "/statistics">
                <Button className = "BackAdminButton">Back to Statistics</Button>
            </Link>
            <h1 className = "Table_Text"> Bartender Insights </h1>
            {/*onClick should lead to a popup to select time. Selecting time updates the data*/ }
            <Button className = "filterButton" onClick={() => setChartData([Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)])}>
                Filters: 3/16/2018; Shift(9AM-12PM);...
            </Button>
            <div className="Grid">
                <Bar className ="Chart"
                data={topOverpouring} 
                options={{
                    title:{
                        display:true,
                        text:'Shifts with Greatest Overpouring Rates',
                        fontSize:20,
                    },
                        legend:{
                        display:true,
                        position:'right'
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }}/>
                <Doughnut className ="Chart"
                data={overpourPercent} 
                options={{
                    title:{
                        display:true,
                        text: "Percentage of Overpours",
                        fontSize:20,
                    },
                    animation: {
                        animateScale: true,
                        animateRotate: true
                    }
                }}/>
                <div className="Statistic">
                    <p className="StatHeader">Average Difference Between Pours and MLPP</p>
                    <p className="StatElement" style={{color: colorAvg}}>{averageDifference}</p>
                </div>
                <div className="Statistic">
                    <p className="StatHeader">Cumulative Instances of Overpouring</p>
                    <p className="StatElement" style={{color: colorCum}}>{cumulativePoursAbove}</p>
                </div>
            </div>
            <Table {...getTableProps()} className = "Table-header">
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
                                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    );
                                })} 
                        </tr>)
                    })}
                </tbody>
            </Table>
        </div>
    )
}