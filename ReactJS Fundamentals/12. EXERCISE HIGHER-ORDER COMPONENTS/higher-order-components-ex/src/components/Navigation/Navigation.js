import React, {Component} from 'react';
import './Navigation.css';

class Navigation extends Component {
    render() {
        return (
            <nav>
                <header>
                    <span className="title">Navigation</span>
                </header>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/catalog">Catalog</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact Us</a></li>
                </ul>
            </nav>
        );
    }
}

export default Navigation;
