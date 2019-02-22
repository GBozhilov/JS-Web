import React, {Component} from 'react';
import './App.css';
import AppHeader from "./App/AppHeader";
import AppContent from "./App/AppContent";
import AppFooter from "./App/AppFooter";


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            games: [],
            hasFetched: false,
            loginForm: false,
            showSnack: false,
            message: null
        }
    }

    postToAuth(user, url) {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then((body => {
                const {errors} = body;

                if (errors) {
                    errors.forEach(err => console.log(err));
                    return;
                }

                const {username, userId, message} = body;

                localStorage.setItem('username', username);
                localStorage.setItem('userId', userId);

                this.setState({
                    user: username,
                    message,
                    showSnack: true
                });
            }))
            .catch(err => console.log(err));
    }

    registerUser(user) {
        this.postToAuth(user, 'http://localhost:9999/auth/signup');
    }

    loginUser(user) {
        this.postToAuth(user, 'http://localhost:9999/auth/signin');
    }

    logout(event) {
        localStorage.clear();
        this.setState({
            user: null,
            message: 'Successfully logged out.',
            showSnack: true
        });
    }

    componentWillMount() {
        const user = localStorage.getItem('username');

        if (user) {
            this.setState({user});
        }

        this.fetchGames();
    }

    createGame(data) {
        fetch('http://localhost:9999/feed/game/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then((body => {
                const {errors} = body;

                if (errors) {
                    errors.forEach(err => console.log(err));
                }

                this.fetchGames();
            }))
            .catch(err => console.log(err));
    }

    fetchGames() {
        fetch('http://localhost:9999/feed/games')
            .then(rowData => rowData.json())
            .then(({games, message}) => {
                this.setState({
                    games,
                    message,
                    showSnack: true
                });
            })
            .catch(err => console.log(err));
    }

    switchForm() {
        this.setState(prevState => ({
            loginForm: !prevState.loginForm
        }))
    }

    render() {
        return (
            <main>
                <AppHeader
                    user={this.state.user}
                    logout={this.logout.bind(this)}
                    switchForm={this.switchForm.bind(this)}
                    loginForm={this.state.loginForm}
                />
                <AppContent
                    registerUser={this.registerUser.bind(this)}
                    loginUser={this.loginUser.bind(this)}
                    games={this.state.games}
                    createGame={this.createGame.bind(this)}
                    user={this.state.user}
                    loginForm={this.state.loginForm}
                />
                <AppFooter
                    showSnack={this.state.showSnack}
                    message={this.state.message}
                />
            </main>
        )
    }
}

export default App;


