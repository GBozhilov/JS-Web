import React, {Component} from 'react';

class BindingForm extends Component {
    handleChange = (e) => {
        console.log(`${e.target.name} => ${e.target.value}`);
    };

    render() {
        return (
            <div>
                <h1>Binding Form</h1>
                {this.props.children}
            </div>
        );
    }
}

export default BindingForm;
