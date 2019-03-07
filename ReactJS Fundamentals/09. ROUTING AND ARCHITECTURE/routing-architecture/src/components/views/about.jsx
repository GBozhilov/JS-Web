import React from 'react';
import {Route} from 'react-router-dom';

const Contact = () => {
    return (
        <div>This Is The Contact Page</div>
    );
};

const AboutContent = () => {
    return (
        <h1>This Is About Page</h1>
    );
};

const About = (props) => {
    const {path} = props.match;

    return (
        <div>
            <Route path={`${path}`} component={AboutContent} exact/>
            <Route path={`${path}/contact`} component={Contact} exact/>
        </div>
    )
        ;
};

export default About;