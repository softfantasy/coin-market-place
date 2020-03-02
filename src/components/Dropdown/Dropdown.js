import React, { useState } from 'react'
import MenuItems from './MenuItems'
import {useSelector } from 'react-redux';
import './Dropdown.css'

function Dropdown(props) {
    const {changeCurrency,height} = props;
    const [click, setClick] = useState(false);
    const theme = useSelector(state=>state.theme);
    const handleClick = () => { setClick(!click) };
    const [val,setVal]= useState('usd');


    return (
        <div>
            <button className='dropdown-btn' onClick={handleClick}>{val}</button>
            <ul onClick={handleClick} className={!click ? 'dropdown-menu clicked' : theme ?'dropdown-menu-night':'dropdown-menu-day'}>
                {MenuItems.map((item, index) => {
                    return (
                        <li className='dropdown-menu-list' onClick = {()=>{
                            changeCurrency(item.title,item.symbol);
                            setVal(item.title);
                            console.log(item.title);
                            handleClick();
                        }}>
                            {item.title}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Dropdown
