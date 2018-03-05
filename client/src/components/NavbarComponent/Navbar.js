import React from 'react';
//import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar () {
    return (
         <ul className='Navbar'>
                <ul className="nav nav-pills">
                    <li><a href="/">Home</a></li>
                    <li className="active"><a href="/Dashboard">Dashboard</a></li>
                    <li><a href="#">Trade History</a></li>
                    <li><a href="#">Api Keys</a></li>
                    <li><a href="#">News</a></li>
                    <li><a href="#">Account Settings</a></li>
                </ul>
        </ul>
    )
}

export default Navbar;