import React from 'react'
import './NewsCard.css'

function NewsCard(props) {

    const {title,domain,published_at,key,image,description,url}=props;

    return (
        <div className='news-card'>
            <a href={url}><h3 className='card-heading'>{title}</h3></a>
            <div className='card-details'>
            <div>
                <img className='card-image' src={image} />
            </div>
            <div className='card-para'>
                <p>{description}</p>
            </div>
            </div>
            <div className='card-source'>
                <p>{domain}</p>
            </div>
            
        </div>
    )
}

export default NewsCard
