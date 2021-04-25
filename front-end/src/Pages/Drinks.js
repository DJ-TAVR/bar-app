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


export default function Drinks(props) {

    const classes = useStyles();
    const [startDate, setStartDate] = React.useState("2021-03-15 02:00:00");
    const [endDate, setEndDate] = React.useState("2021-04-25 08:00:00");
    const [showTable, setShowTable] = React.useState(false);
    const [overpoured, setOverpoured] = React.useState([]);
    const [revenue, setRevenue] = React.useState([]);
    const [lowest, setLowest] = React.useState("");
    const [tableData, setTableData] = React.useState([]);
    let brandsOverpour = [];
    let topOverpours = [];

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

    function handleStartDate(e){
      var dateVal = e.target.value.replaceAll("T", " ");
      dateVal = dateVal + ":00";
      setStartDate(dateVal);
    }

    function handleEndDate(e){
      var dateVal = e.target.value.replaceAll("T", " ");
      dateVal = dateVal + ":00";
      setEndDate(dateVal);
    }

    function updateOverpoured() {
      let csrf = getCookie('csrftoken');
        fetch("http://localhost:8000/sticker/overpoured_drinks/", {
            method: "POST",
            headers: {
                "X-CSRFToken": csrf ,
                "Content-Type": "application/json"
            },
            credentials: "include",
            body:  JSON.stringify({
              start_time: startDate, 
              end_time:   endDate
            })
        }).then(r =>  r.json().then(data => ({status: r.status, body: data})))
        .then(obj => setOverpoured(obj.body));
    }

    function updateRevenue() {
      let csrf = getCookie('csrftoken');
        fetch("http://localhost:8000/sticker/revenue_results/", {
            method: "POST",
            headers: {
                "X-CSRFToken": csrf ,
                "Content-Type": "application/json"
            },
            credentials: "include",
            body:  JSON.stringify({
              start_time: startDate, 
              end_time:   endDate
            })
        }).then(r =>  r.json().then(data => ({status: r.status, body: data})))
        .then(obj => setRevenue(obj.body));
    }

    function updateLowest() {
      let csrf = getCookie('csrftoken');
        fetch("http://localhost:8000/inventory/get_drink_lowest_stock/", {
            headers: {
                "X-CSRFToken": csrf ,
            },
            credentials: "include"
        }).then(r =>  r.json().then(data => ({status: r.status, body: data})))
        .then(obj => setLowest(obj.body[0].name));
    }

    function updateTableData() {
      let csrf = getCookie('csrftoken');
        fetch("http://localhost:8000/inventory/get_drinks/", {
            headers: {
                "X-CSRFToken": csrf ,
            },
            credentials: "include"
        }).then(r =>  r.json().then(data => ({status: r.status, body: data})))
        .then(obj => setTableData(obj.body));
    }

    function toggle(){
      setShowTable(!showTable);
    }

    function updateChartData() {
      updateOverpoured();
      updateRevenue();
      updateLowest();
      updateTableData();
    }

    useEffect(() => {
      updateChartData();
    }, []);

    let tempOverpoured = []; // Temp until API works correctly
    for (let data of tempOverpoured) {
      brandsOverpour.push(data.brand);
      topOverpours.push(data.amount_overpoured);
    }

    let overpourBar = {
      labels: brandsOverpour,
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

    return(
      (!showTable && (
        <div class = "row">
          <CustomSidebar isAuth = {props.isAuth} setIsAuth = {props.setIsAuth} csrfToken = {props.csrfToken} setCSRFToken = {props.setCSRFToken}/>
            <div class = "stay widex center">
            <p/>
            <p/>
            <p/>
            <h1 className = "Table_Text"> Inventory Insights </h1>
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
                      }}/>
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
                      }}/>
                    <Button className = "spaceLeft" onClick = {updateChartData}>Confirm Dates</Button>
                  </div>
                </div>
              </form>
            </div>
            <br/>
            <div className="Grid2">
              <Bar
                className ="Chart"
                data={overpourBar}
                options={{
                  title:{
                    display:true,
                    text:'Drinks with Greatest Overpouring Instances',
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
              <div className="Statistic">
                <p className="StatHeadTop">Low Stock Alert!</p>
                <p className="StatElmTop" style={{color: "#c954ff"}}>{lowest}</p>
              </div>
              <div className="Statistic">
                <p className="StatHeader">Total Revenue</p>
                <p className="StatElement" style={{color: "#2ee29d"}}>{revenue.valueOfDrinksPoured}</p>
              </div>
              <div className="Statistic">
                <p className="StatHeader">Lost Revenue</p>
                <p className="StatElement" style={{color: "#2ee29d"}}>{revenue.totalLostRevenue}</p>
              </div>
              <p/>
            </div>
            <Button className = "up" onClick= {toggle}>Switch to Drink Table</Button>
          </div>
        </div>
      ) || showTable && (
        <div class = "row">
          <CustomSidebar isAuth = {props.isAuth} setIsAuth = {props.setIsAuth} csrfToken = {props.csrfToken} setCSRFToken = {props.setCSRFToken}/>
          <div class = "stay wide center">
            <h1 className = "Table_Text"> Inventory Insights </h1>
            <br/>
            <div class = "tableDiv">
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align = "right">Brand</TableCell>
                      <TableCell align = "right">Type</TableCell>
                      <TableCell align = "right">Size</TableCell>
                      <TableCell align = "right">Price</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Revenue</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableData.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell align="right">{row.name}</TableCell>
                        <TableCell align="right">{row.type}</TableCell>
                        <TableCell align="right">{row.size}</TableCell>
                        <TableCell align="right">{row.price}</TableCell>
                        <TableCell align="right">{row.quantity}</TableCell>
                        <TableCell align="right">{row.revenue}</TableCell>
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
}