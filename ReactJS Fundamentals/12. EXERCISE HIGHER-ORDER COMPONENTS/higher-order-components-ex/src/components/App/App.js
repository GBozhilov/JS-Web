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

//const BindingFormWithWarning = warningWrapper(errorHandlingWrapper(BindingForm));

class App extends Component {
    onSubmit(e, data) {
        e.preventDefault();
    }

    render() {
        return (
            <section className="App">
                <BindingForm onSubmit={this.onSubmit} title="Register" value="Register">
                    <input type="text" name="username" placeholder="Username"/>
                    <input type="email" name="email" placeholder="Email"/>
                    <input type="password" name="password" placeholder="Password"/>
                    <input type="password" name="confirmPassword" placeholder="Confirm Password"/>
                </BindingForm>
                <BindingForm onSubmit={this.onSubmit} title="Login" value="Login">
                    <input type="text" name="username" placeholder="Username"/>
                    <input type="password" name="password" placeholder="Password"/>
                </BindingForm>
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
