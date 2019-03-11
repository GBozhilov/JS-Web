import React from 'react';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer id="footer" className="page-footer mt-4">
            © Book Library {year}
        </footer>
    );

};

export default Footer;