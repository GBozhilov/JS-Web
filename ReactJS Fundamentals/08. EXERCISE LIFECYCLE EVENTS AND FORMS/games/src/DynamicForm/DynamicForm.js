import React from "react";
import RegisterForm from "./RegisterForm";
import LogInForm from "./LoginForm";
import CreateForm from "../Games/CreateForm";
import AppContent from "../App";

class DynamicForm extends React.Component {
    chooseForm = () => {
        const {user, loginForm} = this.props;

        if (user) {
            return <CreateForm createGame={this.props.createGame}
            />
        } else {
            return loginForm ?
                <LogInForm loginUser={this.props.loginUser}/> :
                <RegisterForm registerUser={this.props.registerUser}/>
        }
    };

    render() {
        return (
            <div>
                <div>
                    {this.chooseForm()}
                </div>
            </div>
        )
    }
}

export default DynamicForm