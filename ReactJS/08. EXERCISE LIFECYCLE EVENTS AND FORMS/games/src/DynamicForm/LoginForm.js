import React from 'react';
import './login.css';

class LogInForm extends React.Component {
    constructor(propds) {
        super(propds);

        this.state = {
            username: '',
            password: ''
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleFormElementChange = this.handleFormElementChange.bind(this);
    }

    handleLogin = (event) => {
        event.preventDefault();
        this.props.loginUser(this.state);
    };

    handleFormElementChange = ({target}) => {
        const {name, value} = target;

        this.setState({
            [name]: value
        });
    };

    render() {
        const {username, password} = this.state;

        return (
            <div className="Login">
                <h1>Login</h1>
                <form onSubmit={this.handleLogin}>
                    <label>Usersname</label>
                    <input
                        type="text"
                        onChange={this.handleFormElementChange}
                        name="username"
                        value={username}
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        onChange={this.handleFormElementChange}
                        name="password"
                        value={password}
                    />
                    <input type="submit" value="Login"/>
                </form>
            </div>
        )
    }
}

export default LogInForm;
