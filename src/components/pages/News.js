import React, { useState, useEffect } from 'react'
import callAPI from './utils'
import NewsCard from '../NewsCard/NewsCard';
import { useSelector } from 'react-redux';
import './News.css'
import Loader from '../Loader/Loader'
import axios from 'axios';


function News() {

    const [newsArray,setNewsArray]=useState([]);
    const theme = useSelector(state=>state.theme);
    
    

    useEffect( async () => {
       await axios.get('https://newsapi.org/v2/everything?q=Bitcoin&from=2021-07-31&apiKey=a0c370ca24664ceaa7a6e01c580b143b')
       .then(response => {
            setNewsArray(response.data.articles);
            console.log(response);
          })
          .catch(error=>console.log(error))
    },[])
    console.log(newsArray)



    return (
        <div className={theme?'news-container-night':'news-container-day'}>
        <h1>Top News</h1>
        {newsArray.length===0 && <Loader/>}
            {newsArray && newsArray.map((item,index)=>{
                return(
                    <NewsCard title={item.title} 
                    domain={item.source.name} 
                    publishedAt={item.published_at} 
                    key={index}
                    image={item.urlToImage}
                    description={item.description}
                    url={item.url}
                    />
                )
            })}
        </div>
        
    )
}

export default News
