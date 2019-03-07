import React, {Component} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Route, Switch, Redirect} from 'react-router-dom';

import Home from './Home/Home';
import Register from './Register/Register';
import Login from './Login/Login';
import Create from './Create/Create';
import Header from './Header/Header';
import Story from './Story/Story';
import Trailer from './Trailer/Trailer';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: null,
            isAdmin: false,
            movies: [],
            isFetched: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(e, data, isSignUp) {
        e.preventDefault();

        const ending = isSignUp ? 'up' : 'in';
        const url = 'http://localhost:9999/auth/sign' + ending;

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        })
            .then(rawData => rawData.json())
            .then(({username, message, isAdmin}) => {
                if (username) {
                    this.setState({
                        username,
                        isAdmin
                    });

                    toast.success(message, {
                        closeButton: false,
                        autoClose: 2000
                    });

                    localStorage.setItem('username', username);
                    localStorage.setItem('isAdmin', isAdmin);
                } else {
                    toast.error(message, {
                        closeButton: false,
                        autoClose: 2000
                    });
                }
            });
    }

    handleCreateSubmit(e, data) {
        e.preventDefault();

        const url = 'http://localhost:9999/feed/movie/create';

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        })
            .then(rawData => rawData.json())
            .then(({errors, message}) => {
                if (errors) {
                    toast.error(message, {
                        closeButton: false,
                        autoClose: 2000
                    });
                } else {
                    toast.success(message, {
                        closeButton: false,
                        autoClose: 2000
                    });
                }
            });
    }

    render() {
        const {username, isAdmin, movies} = this.state;

        return (
            <div className="App">
                <ToastContainer/>
                <Header username={username} isAdmin={isAdmin}/>
                <Switch>
                    <Route
                        path="/"
                        exact
                        render={
                            () => <Home
                                movies={movies}
                            />
                        }
                    />
                    <Route
                        path="/register"
                        render={
                            () => <Register
                                handleSubmit={this.handleSubmit}
                                handleChange={this.handleChange}
                            />
                        }
                    />
                    <Route
                        path="/login"
                        render={
                            () => <Login
                                handleSubmit={this.handleSubmit}
                                handleChange={this.handleChange}
                            />
                        }
                    />
                    <Route
                        path="/create"
                        render={
                            () =>
                                isAdmin ?
                                    <Create
                                        handleCreateSubmit={this.handleCreateSubmit}
                                        handleChange={this.handleChange}
                                    />
                                    :
                                    <Redirect
                                        to={{pathname: '/login'}}
                                    />
                        }
                    />
                    <Route path="/trailer/" component={() => <Trailer movies={movies}/>}/>
                    <Route path="/story/" component={() => <Story movies={movies}/>}/>
                    <Route render={() => <h1>Not Found</h1>}/>
                </Switch>
            </div>
        );
    }

    componentWillMount() {
        const isAdmin = localStorage.getItem('isAdmin') == 'true';
        const username = localStorage.getItem('username');

        if (username) {
            this.setState({
                username,
                isAdmin
            });
        }

        if (!this.state.isFetched) {
            fetch('http://localhost:9999/feed/movies')
                .then((rawData) => rawData.json())
                .then(({movies, message}) => {
                    this.setState({
                        username,
                        isAdmin,
                        movies,
                        isFetched: true
                    });
                    toast.success(message, {
                        closeButton: false,
                        autoClose: 2000
                    })
                })
        }
    }
}

export default App;
