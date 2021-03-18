import ReactDOM from 'react-dom';
import React, {useState, useEffect} from "react";
import Table from 'react-bootstrap/Table'
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom'
import {Bar} from 'react-chartjs-2';
import { useTable, useSortBy } from 'react-table'


export default function Bartender(props) {

    const [data, setData] = useState({average_mlpp:5, cumulative_mlpp:0, top3_MLPP:[0, 0, 0], over_pouring_percentage: 0 });

    let topOverpouring = {
        labels: ['Shift 1', 'Shift 2', 'Shift 3'],
        datasets: [
          {
            label: 'Number of Overpouring Instances',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: data.top3_MLPP,
          }
        ]
    }

    let averageDifference = data.average_mlpp;
    let cumulativePoursAbove = data.cumulative_mlpp;
    let overpourPercent = data.over_pouring_percentage;

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
    function updateData() {
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
        .then(obj => console.log(obj.body));
    }

    function colorMapper(input, max) {
        input = Math.min(input, max);
        let redness = 255 - ((255 / max) * input);
        return "rgb(255, " + redness + ", " +  redness + ")";
    }

    useEffect(() => {
        updateData();
    }, []);

    let colorAvg = colorMapper(Math.abs(averageDifference), 5);
    let colorCum = colorMapper(cumulativePoursAbove, 10);
    let colorPer = colorMapper(overpourPercent, 100);

    return(
        <div className="Inventory">
            <Button className = "HelpButton"> ? </Button>
            <Link to = "/statistics">
                <Button className = "BackAdminButton">Back to Statistics</Button>
            </Link>
            <h1 className = "Table_Text"> Bartender Insights </h1>
            {/*onClick should lead to a popup to select time. Selecting time updates the data*/ }
            <Button className = "filterButton" onClick={() => setData([Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)])}>
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
                <div className="Statistic">
                    <p className="StatHeader">Average Difference Between Pours and MLPP</p>
                    <p className="StatElement" style={{color: colorAvg}}>{averageDifference}</p>
                </div>
                <div className="Statistic">
                    <p className="StatHeader">Cumulative Instances of Overpouring</p>
                    <p className="StatElement" style={{color: colorCum}}>{cumulativePoursAbove}</p>
                </div>
                <div className="Statistic">
                    <p className="StatHeader">Percentage of Pours Over MLPP</p>
                    <p className="StatElement" style={{color: colorPer}}>{overpourPercent}%</p>
                </div>
            </div>
        </div>
    )
}