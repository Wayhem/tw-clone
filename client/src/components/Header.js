import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
    <div className="ui pointing menu">
        <Link to="/" className="item">
            Twitch Clone
        </Link>
        <div className="right menu">
            <Link to="/" className="item">
                Home
            </Link>
            <Link to="/" className="item">
                Login
            </Link>
        </div>
    </div>
    );
}

export default Header;