import React, { useState, useEffect } from "react";
import callAPI from "../pages/utils";
import Plot from 'react-plotly.js'
import axios from 'axios'

function SmallGraph(props) {
    const {id,height,width,size,color} = props;
	const [isLoading, setIsLoading] = useState(true);
	const [latestPrice, setLatestPrice] = useState(0);
    const [xdata,setXData]=useState([]);
    const [ydata,setYData]=useState([]);

	useEffect(async () => {
        
        let results = {};
        await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=24h&interval=1h`)
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
    }, []);

	
	return (
		<div>
            <Plot
                data={
                    [{
                        x:xdata,
                        y:ydata,
                        type:'scatter',
                        marker: {color:color},
                        name:'Data Testing'
                    }]
                }
                layout={ {width: width, height: height, plot_bgcolor:'transparent',paper_bgcolor:'transparent',font:{color:'#d7d7d7',size:size}} }
                config={{displayModeBar:false}}
             />
        </div>
	);
}

export default SmallGraph;