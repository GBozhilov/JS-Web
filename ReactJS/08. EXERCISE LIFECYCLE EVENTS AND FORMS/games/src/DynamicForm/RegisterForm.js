import React from 'react';
import './register.css';

class RegisterForm extends React.Component {
    constructor(propds) {
        super(propds);

        this.state = {
            username: '',
            email: '',
            password: ''
        };

        this.handleRegister = this.handleRegister.bind(this);
        this.handleFormElementChange = this.handleFormElementChange.bind(this);
    }

    handleRegister = (event) => {
        event.preventDefault();
        this.props.registerUser(this.state);
    };

    handleFormElementChange = ({target}) => {
        const {name, value} = target;

        this.setState({
            [name]: value
        });
    };

    render() {
        const {
            username,
            email,
            password
        } = this.state;

        return (
            <div className="Register">
                <h1>Sign Up</h1>
                <form onSubmit={this.handleRegister}>
                    <label>Username</label>
                    <input
                        type="text"
                        onChange={this.handleFormElementChange}
                        name="username"
                        value={username}
                    />
                    <label>Email</label>
                    <input
                        type="email"
                        onChange={this.handleFormElementChange}
                        name="email"
                        value={email}
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        onChange={this.handleFormElementChange}
                        name="password"
                        value={password}
                    />
                    <input type="submit" value="Sign Up"/>
                </form>
            </div>
        )
    }
}

export default RegisterForm;