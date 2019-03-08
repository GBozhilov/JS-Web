import React, {Component} from 'react';
import './App.css';
import Article from '../Article/Article';
import RegisterForm from '../RegisterForm/RegisterForm';
import Navigation from '../Navigation/Navigation';
import warningWrapper from '../../hocs/warningWrapper';
import errorHandlingWrapper from '../../hocs/errorHandlingWrapper';
import BindingForm from '../BindingForm/BindingForm';

const ArticleWithWarning = warningWrapper(errorHandlingWrapper(Article));
const RegisterFormWithWarning = warningWrapper(errorHandlingWrapper(RegisterForm));
const NavigationWithWarning = warningWrapper(errorHandlingWrapper(Navigation));

class App extends Component {
    render() {
        return (
            <section className="App">
                <BindingForm/>
                <Article/>
                <RegisterForm/>
                <Navigation/>
                <ArticleWithWarning/>
                <RegisterFormWithWarning/>
                <NavigationWithWarning/>
            </section>
        );
    }
}

export default App;
