import React from 'react'
import './Loader.css'
function Loader() {
    return (
        <div className='absolute w-1/2 border border-gray-400'>
            <div class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            </div>
        </div>
    )
}

export default Loader
