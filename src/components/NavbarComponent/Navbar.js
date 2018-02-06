import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar () {
    return (
        <ul className='Navbar'>
            <li>
                <NavLink exact activeClassName='active' to="/">
                    Home
                </NavLink>
                <NavLink activeClassName='active' to="/Dashboard">
                    Dashboard
                </NavLink>
            </li>
        </ul>
    )
}

export default Navbar;