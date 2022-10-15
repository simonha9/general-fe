import React, { useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';
import './DashboardItem.css'
import Select from '@mui/material/Select';
import { InputLabel, MenuItem } from '@mui/material';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

async function getData(url) {
    var response = await fetch(url)
    var data = await response.json()
    return data
}

const allMonths = [6, 7]
const monthsMap = {
    6: 'July',
    7: 'August'
}

function InternetTrafficDashboardItem( { itrafficUrl, attacklayerUrl } ) {
    const [chartData, setChartData] = useState({
        datasets: []
    })
    const [chartOptions, setChartOptions] = useState({})
    const [allData, setAllData] = useState([])
    const [month, setMonth] = useState(6)


    const redrawChart = (zipped) => {
        let filtered = zipped.filter(z => z[0][1] === month)
        let labels = filtered.map(z => z[0][0])
        var prev = "";
        for (var i = 0; i < labels.length; i++) {
            var splitted = labels[i].split(",")
            if (splitted[0] === prev)
                labels[i] = splitted[1]
            prev = splitted[0]
        }
        if (labels.length > 0) {
            setChartData({
                labels: labels,
                datasets: [
                    {   
                        label: 'Total',
                        data: filtered.map(z => z[1]),
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    },
                    {
                        label: 'Http',
                        data: filtered.map(z => z[2]),
                        borderColor: 'rgb(53, 162, 235)',
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    },
                    {
                        label: 'Layer 3 Attacks',
                        data: filtered.map(z => z[3]),
                        borderColor: 'rgb(124, 252, 0)',
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    },
                ],
            })
        }
    }

    const initialize = () => {
        Promise.all([
            getData(itrafficUrl),
            getData(attacklayerUrl)
        ]).then((res) => {
            let zipped = res[0].data.total.timestamps.map((e, i) => {
                let d = new Date(e)
                return [[d.toLocaleString(), d.getMonth()], res[0].data.total.values[i], res[0].data.http.values[i], res[1].data.total.values[i]]
            })
            setAllData(zipped)
            redrawChart(zipped)
        })
        setChartOptions({
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Internet Traffic and DDOS Attacks',
                },
            },
        })
    }

    useEffect(() => {
        initialize()
    }, [])

    useEffect(() => {
        redrawChart(allData)
    }, [month])
    
  return (
    <>
        <div className='itraffic-chart'>
            <div className='flexbox-container'>
                <div className='flexbox-item-1'>
                    <p>The following chart shows current traffic change for a 30-day trend selected by the month.
                        The legend items at the top are clickable to show/hide the data points for that dataset.  
                        Hovering over a specific point will show the time and value at that point.
                    </p>
                </div>
                <div className='flexbox-item-select'>
                    <InputLabel>Month</InputLabel>
                    <Select
                    value={month}
                    label="Month"
                    onChange={(e) => {
                        setMonth(e.target.value)
                    }}
                    >
                        {allMonths.map(m => {
                            return <MenuItem key={m} value={m}>{monthsMap[m]}</MenuItem>
                        })}
                    </Select>
                </div>
            </div>
            
            <Line options={chartOptions} data={chartData} redraw={true}></Line>
        </div>
         
    </>

  )
}

export default InternetTrafficDashboardItem;