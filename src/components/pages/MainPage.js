import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Coin from '../Coin/Coin'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import {useSelector,useDispatch} from 'react-redux';
import {toggle} from '../../actions'
import './MainPage.css'
import Dropdown from '../Dropdown/Dropdown'
import Loader from '../Loader/Loader'

function App() {

    const theme =useSelector(state=>state.theme);
    const dispatch = useDispatch();



    const [coins, setCoins] = useState([])
    const [search, setSearch] = useState('');
    const page = useSelector(state=>state.page);
    const [currency,setCurrency]= useState('usd');
    const [sign,setSign]=useState('$')
    

    const changeCurrency =(item,sign) =>{
        setCurrency(item);
        console.log(item);
        setSign(sign);
    }


    useEffect(() => {
        axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=20&page=${page}&sparkline=false`)
            .then(res => {
                setCoins(res.data)
            })
            .catch(error => console.log(error));
    }, [page,currency])




    const handleChange = event => {
        setSearch(event.target.value);
    }



    const themeChange = () =>{
        dispatch(toggle());
    }



    const filteredCoins = coins.filter(coin =>
        coin.name.toLowerCase().includes(search.toLowerCase())
    )



    return (


        <div className={theme ? 'main-page-night':'main-page-day'}>

        {  coins.length>0 &&  <div className='top-section'>
            <div className='filter-section'>
            <Header handleChange={handleChange} />
            <div className='dropdown-menu'>
                 <Dropdown changeCurrency={changeCurrency} height={240}/>
            </div>
            </div>
            
            <div className='theme-section'>
                <button className={theme ? 'top-section-btn':'inactive'} onClick={themeChange}><i class="fas fa-sun"></i></button>
                <button className={!theme ? 'top-section-btn':'inactive'} onClick={themeChange}><i class="fas fa-moon"></i></button>
            </div>
        </div>}
            



            {coins.length>0 &&<div className='coin-table-heading'>


                <div className='coin-heading'>
                    <p className='coin-heading-cell-index'>#</p>
                    <p className='coin-heading-cell-name'>Coin</p>
                </div>



                <div className='coin-data-heading'>
                    <p className='coin-data-heading-cell-price'>Price</p>
                    <p className='coin-data-heading-cell-24h'>24h</p>
                    <p className='coin-data-heading-cell-24h-volume'>24h Volume</p>
                    <p className='coin-data-heading-cell-mkt-cap'>Mkt Cap</p>
                    <p className='coin-data-heading-cell-total-volume'>Total Volume</p>
                    <p className='coin-data-heading-cell-circulating-supply'>Last 24h</p>
                </div>


            </div>}

            

            {coins.length>0 && filteredCoins.map(coin => {
                return (
                    <Coin key={coin.id}
                        id={coin.id}
                        marketcapRank={coin.market_cap_rank}
                        name={coin.name}
                        image={coin.image}
                        symbol={coin.symbol}
                        volume={coin.total_volume}
                        price={coin.current_price}
                        priceChange_24={coin.price_change_percentage_24h}
                        marketcap={coin.market_cap}
                        circulatingSupply={coin.circulating_supply}
                        total_volume={coin.total_volume}
                        sign={sign}
                    />
                )
            })}



            {coins.length>0 && <Footer />}
            {coins.length===0 && <Loader/>}
            


        </div>
    )
}

export default App