import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {

    const theme = useSelector(state=>state.theme);

    return (
        <nav className={theme?'navbar-night':'navbar-day'}>
            <Link to='/' className='navbar-logo' >
                Coinmarketplace
            </Link>
            <ul className='nav-menu'>
                <li className='nav-item'>
                    <Link to='/' className='nav-links' >
                        Coins
                    </Link>
                </li>
                <li className='nav-item' >
                    <Link to='/exchange' className='nav-links'>
                        Exchange
                    </Link>
                </li>
                {/* <li className='nav-item'>
                    <Link to='/news' className='nav-links'>
                        News
                    </Link>
                </li> */}
            </ul>
        </nav>
    )
}
export default Navbar;