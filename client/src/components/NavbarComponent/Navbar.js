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
                <NavLink exact activeClassName='active' to="/">
                    Trade History
                </NavLink>
                <NavLink exact activeClassName='active' to="/">
                    Api Keys
                </NavLink>
                <NavLink exact activeClassName='active' to="/">
                    News
                </NavLink>
                <NavLink exact activeClassName='active' to="/">
                    Account Settings
                </NavLink>
            </li>
        </ul>


    )
}

export default Navbar;
