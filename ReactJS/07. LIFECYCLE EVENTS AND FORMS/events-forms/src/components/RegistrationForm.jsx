import React, {Component} from 'react';

const camelCased = myString => (
    myString.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
);

class RegistrationForm extends Component {
    state = {
        email: '',
        firstName: '',
        lastName: '',
        password: '',
    };

    handleRegister = (event) => {
        event.preventDefault();
        console.dir(this.state);
    };

    handleFormElementChange = ({target}) => {
        const {value, id} = target;
        const parsedId = camelCased(id);

        this.setState({
            [parsedId]: value
        });
    };

    render() {
        const {
            email,
            firstName,
            lastName,
            password
        } = this.state;

        return (
            <form onSubmit={this.handleRegister}>
                <label htmlFor="email">Email: </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={this.handleFormElementChange}
                    required
                />

                <br/>

                <label htmlFor="first-name">First Name: </label>
                <input
                    type="text"
                    name="firstName"
                    id="first-name"
                    value={firstName}
                    onChange={this.handleFormElementChange}
                    required
                />

                <br/>

                <label htmlFor="last-name">Last Name: </label>
                <input
                    type="text"
                    name="lastName"
                    id="last-name"
                    value={lastName}
                    onChange={this.handleFormElementChange}
                    required
                />

                <br/>

                <label htmlFor="password">Password: </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={this.handleFormElementChange}
                    required
                />

                <br/>

                <button type="submit">Register</button>
            </form>
        );
    }
}

export default RegistrationForm;