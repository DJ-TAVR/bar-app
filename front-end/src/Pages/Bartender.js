import ReactDOM from 'react-dom';
import React, {useState, useEffect} from "react";
import Table from 'react-bootstrap/Table'
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom'
import {Bar} from 'react-chartjs-2';


export default function Bartender(props) {

    const [data, setData] = useState([12, 10, 7]);

    let topOverpouring = {
        labels: ['Shift 1', 'Shift 2', 'Shift 3'],
        datasets: [
          {
            label: 'Number of Overpouring Instances',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: data,
          }
        ]
    }

    return(
        <div className="Inventory">
            <Button className = "HelpButton"> ? </Button>
            <Link to = "/statistics">
                <Button className = "BackAdminButton">Back to Statistics</Button>
            </Link>
            <h1 className = "Table_Text"> Bartender Insights </h1>
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
            </div>
            {/* Demonstrating dynamic data changes, change when endpoints are done, of course. */}
            <Button className = "filterButton" onClick={() => setData([Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)])}>
                Filters: 3/16/2018; Shift(9AM-12PM);...
            </Button>
            <Table className = "Table-header">
            <colgroup>
            <col className = "green"/>
            </colgroup>
            <thead>
                <tr>
                <th>Employee Name</th>
                <th>Amount Poured(L)</th>
                <th>Amount Required(L)</th>
                <th>Overpoured(L)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                
                <td>John Doe</td>
                <td>9</td>
                <td>6</td>
                <td>3</td>
                </tr>
                
                
                <tr>
                <td>Jane Doe</td>
                <td>7</td>
                <td>6</td>
                <td>1</td>
                </tr>

                <tr>
                <td>Toph Beifong</td>
                <td>12</td>
                <td>7</td>
                <td>5</td>
                </tr>

                <tr>
                <td>Katara</td>
                <td>10</td>
                <td>10</td>
                <td>0</td>
                </tr>
                
                <tr>
                <td>Zuko</td>
                <td>11</td>
                <td>9</td>
                <td>2</td>
                </tr>

                <tr>
                <td>Aang</td>
                <td>6</td>
                <td>4</td>
                <td>2</td>
                </tr>

                <tr>
                <td>Sokka</td>
                <td>13</td>
                <td>10</td>
                <td>3</td>
                </tr>

                <tr>
                <td>Suki</td>
                <td>8</td>
                <td>7</td>
                <td>1</td>
                </tr>


            </tbody>
            </Table>
        
        </div>
    )
}