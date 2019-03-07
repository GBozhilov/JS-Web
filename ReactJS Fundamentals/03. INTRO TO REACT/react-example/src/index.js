import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const handleNavLinkClick = (event) => {
    event.preventDefault();
    console.log(event.target.innerHTML);
};

const Navigation = () => {
    return (
        <nav className="site-nav">
            <ul>
                <li><a href="/" onClick={handleNavLinkClick}>Home</a></li>
                <li><a href="/contact" onClick={handleNavLinkClick}>Contact Us</a></li>
                <li><a href="/about" onClick={handleNavLinkClick}>About</a></li>
            </ul>
        </nav>
    );
};

ReactDOM.render(
    <Navigation/>,
    document.getElementById('root')
);