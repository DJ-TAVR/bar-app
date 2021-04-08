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
    const [showTable, setShowTable] = React.useState(false);
    const [chartData, setChartData] = React.useState({
        low_stock: "",
        toal_revenue: 0,
        most_overpoured:[],
        percent_revenue: [] });
    const [tableData, setTableData] = React.useState([createData('adsf889', "Tanqueray", "Gin", 2, 100)]);
    let brandsOverpour = [];
    let topOverpours = [];
    let brandsRevenue = [];
    let topRevenue = [];

    function createData(key, brand, type, revenue, stock) {
      return {key, brand, type, revenue, stock};
    }

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
    
    // Temp until API call
    function updateChartData() {
      setChartData({
        low_stock: "Miller Lite",
        toal_revenue: 850,
        most_overpoured:[{
            brand: "Miller Lite",
            amount_overpoured: 5
          }, {
            brand: "Tanqueray",
            amount_overpoured: 2
          }, {
            brand: "Poopy",
            amount_overpoured: 2
          }, {
            brand: "Jim Beam",
            amount_overpoured: 1
          }, {
            brand: "Captain Morgan",
            amount_overpoured: 1
        }],
        percent_revenue: [{
            brand: "Miller Lite",
            percent: 50
          }, {
            brand: "Tanqueray",
            percent: 25
          }, {
            brand: "Poopy",
            percent: 10
          }, {
            brand: "Jim Beam",
            percent: 5
          }, {
            brand: "Captain Morgan",
            percent: 2
          }, {
            brand: "Other",
            percent: 3
        }] 
      });
    }

    // Temp until API call
    function updateTableData() {
      setTableData([
        createData('adsf889', "Tanqueray", "Gin", 2, 100),
        createData('qwerty123', 'Miller Lite', 'Beer', 3, 200),
        createData('wowow', 'Poopy', 'Beer', 3, 150),
        createData('taipdsd', 'Captain Morgan', 'Rum', 1, 250),
        createData('naiknaik', 'Jim Beam', 'Whiskey', 1, 150)
      ]);
    }

    useEffect(() => {
        updateChartData();
    }, []);

    useEffect(() => {
      updateTableData();
    }, []);

    for (let data of chartData.most_overpoured) {
      brandsOverpour.push(data.brand);
      topOverpours.push(data.amount_overpoured);
    }
    for (let data of chartData.percent_revenue) {
      brandsRevenue.push(data.brand);
      topRevenue.push(data.percent);
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

    let revenuePercent = {
      labels: brandsRevenue,
      datasets: [
          {
            data: topRevenue,
            backgroundColor: ["rgba(46,226,157,255)", "rgba(0,177,233,255)", "rgba(26,96,251,255)",
                              "rgba(116,70,216,255)", "rgba(76,44,108,255)", "rgba(41,103,104,255)"]
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
                      InputLabelProps = {{
                        shrink: true,
                        className: classes.input
                      }}
                      InputProps={{
                        className: classes.input,
                      }}/>
                  </div>
                </div>
              </form>
            </div>
            <br/>
            <div className="Grid">
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
              <Doughnut 
                className ="Chart"
                data={revenuePercent}
                options={{
                  title:{
                    display:true,
                    text: "Percentage of Revenue",
                    fontSize:20,
                    },
                  animation: {
                    animateScale: true,
                    animateRotate: true
                    }
              }}/>
              <div className="Statistic">
                <p className="StatHeader">Low Stock Alert!</p>
                <p className="StatElement" style={{color: "#c954ff"}}>{chartData.low_stock}</p>
              </div>
              <div className="Statistic">
                <p className="StatHeader">Total Revenue</p>
                <p className="StatElement" style={{color: "#2ee29d"}}>{chartData.toal_revenue}</p>
              </div>
              <p/>
            </div>
            <Button onClick = {toggle}>Switch to Drink Table</Button>
          </div>
        </div>
      ) || showTable && (
        <div class = "row">
          <CustomSidebar isAuth = {props.isAuth} setIsAuth = {props.setIsAuth} csrfToken = {props.csrfToken} setCSRFToken = {props.setCSRFToken}/>
          <div class = "stay wide center">
            <h1 className = "Table_Text"> Inventory Insights </h1>
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
                        }}/>
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
                        }}/>
                    </div>
                  </div>
                </form>
              </div>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">Unique Key</TableCell>
                      <TableCell align = "right">Brand</TableCell>
                      <TableCell align = "right">Type</TableCell>
                      <TableCell align="right">Revenue</TableCell>
                      <TableCell align="right">Bottles Left</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableData.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell align="right">{row.key}</TableCell>
                        <TableCell align="right">{row.brand}</TableCell>
                        <TableCell align="right">{row.type}</TableCell>
                        <TableCell align="right">{row.revenue}</TableCell>
                        <TableCell align="right">{row.stock}</TableCell>
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

    function toggle(){
        setShowTable(!showTable);
    }
}