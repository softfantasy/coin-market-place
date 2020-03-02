import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ExchangeCard from '../ExchangeCard/ExchangeCard'
import './Exchange.css'
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import Header from '../Header/Header';

function Exchange() {

    const [data,setData]=useState([]);
    const theme = useSelector(state=>state.theme);
    const [search, setSearch] = useState('');

    useEffect(() => {
        axios.get('https://api.coingecko.com/api/v3/exchanges')
            .then(res => {
                setData(res.data)
            })
            .catch(error => console.log(error));
    }, [])

    console.log(data);


    const handleChange = event => {
        setSearch(event.target.value);
        console.log(search);
    }

    const filteredData = data.filter(dataItem =>
        dataItem.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className={theme?'exchange-container-night':'exchange-container-day'}>
        {filteredData.length===0 && <Loader/>}
        { filteredData.length>0 && <h1 className='exchange-top-heading'>Top Cryptocurrency Exchanges Ranking by Trust Score</h1>}
        { filteredData.length>0 &&  
            <div className='exchange-filter'>
                 <Header handleChange={handleChange} />
             </div>}
        { filteredData.length>0 && <div className='exchange-heading'>
            <p className='rank-heading'>#</p>
            <p className='name-heading'>Name</p>
            <p className='score-heading'>Trust Score</p>
            <p className='volume-heading'>24h Volume</p>
            <p className='country-heading'>Country</p>
        </div>}
            {
                filteredData.map((item,index)=>{
                    return(
                        <ExchangeCard name ={item.name} image={item.image} score={item.trust_score} rank={item.trust_score_rank} volume={item.trade_volume_24h_btc} country={item.country}/>
                    )
                })
            }
        </div>
    )
}

export default Exchange
