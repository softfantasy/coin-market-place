import React, { useState, useEffect } from "react";
import callAPI from "../pages/utils";
import Plot from 'react-plotly.js'
import './Graph.css'
import axios from "axios";

function Graph(props) {
    const { id, height, width, size, curr, color } = props;
    const [isLoading, setIsLoading] = useState(true);
    const [interval, setInterval] = useState('7d');
    const [xdata, setXData] = useState([]);
    const [ydata, setYData] = useState([]);

    useEffect(async () => {
        
        let results = {};
        await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${curr}&days=${interval}`)
        .then(async (res)=>{
           results = await res.data 
        })
        .then(async()=>{
            let data = { index: [], price: [] };
            for (const item of results.prices) {
                data.index.push(new Date(item[0]));
                data.price.push(item[1]);
            }
            setIsLoading(false);
            setXData(data.index);
            setYData(data.price);
        })
    }, [curr,interval]);

    const changeInterval = (value) => {
        setInterval(value);
    }

    const btns = [{ title: '1d',period: '1d' }, { title: '7d',period: '7d' }, { title: '14d',period: '14d' }, { title: '1m',period: '30d' }, { title: '2m',period: '60d' }, { title: '4m',period: '120d' },{ title: '6m',period: '180d'},{ title: '1y',period: '370d' }];


    return (
        <div>
            <div className='graph-buttons'>
                {btns.map((item, index) => {
                    return (
                        <button className='graph-btn' onClick={() => {
                            changeInterval(item.period);
                        }} >{item.title}</button>
                    )
                })}
            </div>
            <Plot
                data={
                    [{
                        x: xdata,
                        y: ydata,
                        type: 'scatter',
                        marker: { color: color },
                        name: 'Data Testing'
                    }]
                }
                layout={{ width: width, height: height, plot_bgcolor: 'transparent', paper_bgcolor: 'transparent', font: { color: '#d7d7d7', size: size } }}
                config={{ displayModeBar: false }}
            />
        </div>
    );
}

export default Graph;