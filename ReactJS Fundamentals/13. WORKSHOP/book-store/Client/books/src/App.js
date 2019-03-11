import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from './views/home';
import NotFound from './views/not-found';
import Login from './views/login';
import Header from './components/header';
import Footer from './components/footer';
import {UserProvider, defaultUserState} from './components/contexts/user-context'

class App extends Component {
    constructor(props) {
        super(props);

        const userFromStorage = window.localStorage.getItem('user');
        const parsedUser = userFromStorage ? JSON.parse(userFromStorage) : {};

        this.state = {
            user: {
                ...defaultUserState,
                ...parsedUser,
                userUpdate: this.updateUser
            },
        };
    }

    updateUser = (user) => {
        this.setState({user});
    };

    render() {
        const {user} = this.state;

        return (
            <Router>
                <Fragment>
                    <UserProvider value={user}>
                        <Header/>
                        <Switch>
                            <Route path="/" exact component={Home}/>
                            <Route path="/login" exact component={Login}/>
                            <Route component={NotFound}/>
                        </Switch>
                        <Footer/>
                    </UserProvider>
                </Fragment>
            </Router>
        );
    }
}

export default App;
