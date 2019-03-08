import React, {Component, Children, cloneElement} from 'react';

class BindingForm extends Component {
    handleChange = (e) => {
        const {name, value} = e.target;

        this.setState({
            [name]: value
        });
    };

    componentWillMount() {
        const {children} = this.props;

        // Dynamically create default state
        children.forEach(child => {
            if (child.type === 'input') {
                this.setState({
                    [child.props.name]: null
                });
            }
        });
    }

    render() {
        const {children, onSubmit, title, value} = this.props;

        return (
            <div>
                <header>
                    <span className="title">{title}</span>
                </header>
                <form onSubmit={e => onSubmit(e, this.state)}>
                    {
                        Children.map(children, child => {
                            if (child.type === 'input') {
                                return cloneElement(child, {onChange: this.handleChange.bind(this), ...child.props});
                            }

                            return child;
                        })
                        // Children.map(children, child => (
                        //     <span onChange={this.handleChange}>{child}</span>
                        // ))
                    }
                    <input type="submit" value={value}/>
                </form>
            </div>
        );
    }
}

export default BindingForm;
