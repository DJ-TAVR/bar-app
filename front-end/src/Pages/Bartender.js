import ReactDOM from 'react-dom';
import React, {useState, useEffect} from "react";
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom'
import {Bar, Doughnut, defaults} from 'react-chartjs-2';
import { useTable, useSortBy } from 'react-table'
import CustomSidebar from '../Components/CustomSidebar'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

defaults.global.defaultFontColor = 'white';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    multilineColor:{
        color:'white'
    }, 
    
    input: {
        color: "white"
      },
  });
  
  function createData(start, end, presence, liters, instances) {
    return { start, end, presence, liters, instances };
  }

  const rows = [
    createData('2021/11/15 5:00:00', "2021/11/15 7:00:00", "John Ego, Bill Paston", 10, 5),
    createData('2021/11/15 25:00:00', '2021/11/15 25:00:00', 'William Billiam, Silly Sam', 20, 1)
  ];


export default function Bartender(props) {

    const classes = useStyles();

    const [startDate, setStartDate] = React.useState("2021-03-15 02:00:00")
    const [endDate, setEndDate] = React.useState("2021-03-22 08:00:00")
    const [showTable, setShowTable] = React.useState(false)
    const [chartData, setChartData] = React.useState({
        average_mlpp:0,
        cumulative_mlpp:0,
        top3_MLPP:[],
        over_pouring_percentage: 0 });

    const [tableData, setTableData] = React.useState([]);

    let timeRanges = [];
    let topOverpours = [];

    for (let data of chartData.top3_MLPP) {
        let timeRange = data.start_time + " - " + data.percentage_overpour;
        timeRanges.push(timeRange);
        topOverpours.push(data.percentage_overpour);
    }

    let topOverpouring = {
        labels: timeRanges,
        datasets: [
          {
            label: 'Number of Overpouring Instances',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: topOverpours,
            backgroundColor: "rgba(133,77,255,255)"
          }
        ]
    }

    let overpourPercent = {
        labels: ["Percentage of Pours that are Overpours", "Percentage of Pours that are Non-overpours"],
        datasets: [
            {
                data: [chartData.over_pouring_percentage, 100 - chartData.over_pouring_percentage],
                backgroundColor: ['rgba(133,77,255,255)', 'rgba(46,226,157,255)'],
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
                start_time: startDate,
                end_time: endDate
            })
        }).then(r =>  
            r.json().then(data => ({status: r.status, body: data})))
        .then(obj => {
            setChartData({
                average_mlpp: obj.body.average_mlpp,
                cumulative_mlpp: obj.body.cumulative_mlpp,
                top3_MLPP: obj.body.top3_MLPP,
                over_pouring_percentage: obj.body.over_pouring_percentage
            })
            console.log(obj.body)
            console.log(startDate)
            console.log(endDate)
        });
    }

    // Temp until API works
    function updateTableData() {
        setTableData([
            {
                startTime: "2021/11/15 5:00:00",
                endTime: "2021/11/15 7:00:00",
                bartenders: "John Ego, Bill Paxton",
                liters: "10",
                instances: "5"
            },
            {
                startTime: "2021/11/15 18:00:00",
                endTime: "2021/11/15 25:00:00",
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
        updateTableData();
    }, []);

    // let {
    //     getTableProps,
    //     getTableBodyProps,
    //     headerGroups,
    //     rows,
    //     prepareRow,
    // } = useTable({ columns, data: tableData }, useSortBy);

    let colorAvg = colorMapper(Math.abs(averageDifference), 5);
    let colorCum = colorMapper(cumulativePoursAbove, 10);

    return(
            (!showTable && (
            <div class = "row">
            <CustomSidebar isAuth = {props.isAuth} setIsAuth = {props.setIsAuth} csrfToken = {props.csrfToken} setCSRFToken = {props.setCSRFToken}/>
            <div class = "stay widex center">
            <p/>
            <p/>
            <p/>
            <h1 className = "Table_Text"> Bartender Insights </h1>
            <div>
            <form>
                <div class = "realRow">
                <div class = "spaceRight">
      <TextField
      defaultValue = "YYYY-MM-DD"
        id="datetime-local"
        label="Start Date"
        type="datetime-local"
        onChange = {(e) => handleStartDate(e)}
        InputLabelProps = {{
            shrink: true,
            className: classes.input
        }}
        InputProps={{
            className: classes.input,
        }}
      />
      </div>
      <div>
       <TextField
      
      defaultValue = "YYYY-MM-DD"
        id="datetime-local"
        label="End Date"
        type="datetime-local"
        onChange = {(e) => handleEndDate(e)}
        InputLabelProps = {{
            shrink: true,
            className: classes.input
        }}
        InputProps={{
            className: classes.input,
        }}
      />
      <Button className = "spaceLeft" onClick = {confirmChanges}>Confirm Dates</Button>
      </div>
      </div>
    </form>
            </div>
            <br/>
            {/*onClick should lead to a popup to select time. Selecting time updates the data*/ }
            {/* <Button className = "filterButton" onClick={() => setChartData([Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)])}>
                Filters: 3/16/2018; Shift(9AM-12PM);...
            </Button> */}
            <div className="Grid">
                <Bar className ="Chart"
                data={topOverpouring}
                options={{
                    title:{
                        display:true,
                        text:'Shifts with Greatest Overpouring Instances',
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
                <p/>
            </div>
            <Button onClick = {toggle}>Switch to Shift Table</Button>

            </div>
            </div>
    ) || showTable && (
        <div class = "row">
            <CustomSidebar isAuth = {props.isAuth} setIsAuth = {props.setIsAuth} csrfToken = {props.csrfToken} setCSRFToken = {props.setCSRFToken}/>
            <div class = "stay wide center">
            <h1 className = "Table_Text"> Bartender Insights </h1>
            <br/>
            <div class = "tableDiv">
            <div>
            <form>
                <div class = "realRow">
                <div class = "spaceRight">
                    
      <TextField
      defaultValue = "YYYY-MM-DD"
        id="datetime-local"
        label="Start Date"
        type="datetime-local"
        InputLabelProps = {{
            shrink: true,
            className: classes.input
        }}
        InputProps={{
            className: classes.input,
        }}
      />
      </div>
      <div>
       <TextField
      
      defaultValue = "YYYY-MM-DD"
        id="datetime-local"
        label="End Date"
        type="datetime-local"
        InputLabelProps = {{
            shrink: true,
            className: classes.input
        }}
        InputProps={{
            className: classes.input,
        }}
      />
      <Button className = "spaceLeft" onClick = {confirmChanges}>Confirm Dates</Button>
      </div>
      </div>
    </form>
            </div>
                <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align = "center">Shift Start</TableCell>
            <TableCell align = "center">Shift End</TableCell>
            <TableCell align="right">Bartenders Present</TableCell>
            <TableCell align="right">Liters Overpoured</TableCell>
            <TableCell align="right"># Overpouring Instances</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row" align = "center">
                {row.start}
              </TableCell>
              <TableCell align="center">{row.end}</TableCell>
              <TableCell align="right">{row.presence}</TableCell>
              <TableCell align="right">{row.liters}</TableCell>
              <TableCell align="right">{row.instances}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
                </div>
                <br/>
                <Button onClick = {toggle}>Switch to Statistics</Button>
            </div>
        </div>
    ))
    )

    function handleStartDate(e){
        var dateVal = e.target.value.replaceAll("T", " ")
        dateVal = dateVal + ":00"
        setStartDate(dateVal)
    }

    function handleEndDate(e){
        var dateVal = e.target.value.replaceAll("T", " ")
        dateVal = dateVal + ":00"
        setEndDate(dateVal)
    }

    function confirmChanges(){
        updateChartData()
    }

    function toggle(){
        setShowTable(!showTable);
    }
}