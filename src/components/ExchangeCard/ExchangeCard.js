import React from 'react'
import './ExchangeCard.css'

function ExchangeCard(props) {

    const {name,image,score,rank,volume,country}=props;
    return (
        <div className='exchange-card-container'>
            <div className='exchange-rank'>
                <p>{rank}</p>
            </div>
            <div className='exchange-description'>
                <img src={image} />
                <p className='exchange-name'>{name}</p>
            </div>
            <div className='exchange-score'>
                <p>{score}</p>
            </div>
            <div className='exchange-volume'>
                <p>€{volume.toLocaleString()}</p>
            </div>
            <div className='exchange-country'>
                <p>{country}</p>
            </div>
        </div>
    )
}

export default ExchangeCard
