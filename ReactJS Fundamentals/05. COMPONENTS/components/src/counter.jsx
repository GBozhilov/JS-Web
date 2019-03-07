import React, {Component} from 'react';
import ReactDOM from 'react-dom';


class Counter extends Component {
    constructor(props) {
        super(props);
        const {identifier} = this.props;

        this.state = {
            count: Number(window.localStorage.getItem(`${identifier}-count`)) || 0
        };

        this.increaseCounter = this.increaseCounter.bind(this);
        this.decreaseCounter = this.decreaseCounter.bind(this);
        this.resetCounter = this.resetCounter.bind(this);
    }

    increaseCounter() {
        const {identifier} = this.props;

        this.setState({
            count: ++this.state.count
        }, () => {
            const updateCount = this.state.count;
            window.localStorage.setItem(`${identifier}-count`, `${updateCount}`);
        });
    }

    decreaseCounter() {
        const {identifier} = this.props;

        this.setState({
            count: --this.state.count
        }, () => {
            const updateCount = this.state.count;
            window.localStorage.setItem(`${identifier}-count`, `${updateCount}`);
        });
    }

    resetCounter() {
        const {identifier} = this.props;

        this.setState({
            count: 0
        }, () => {
            const updateCount = this.state.count;
            window.localStorage.setItem(`${identifier}-count`, `${updateCount}`);
        });
    }

    render() {
        const {count} = this.state;

        return (
            <div>
                <h1>{count}</h1>
                <button onClick={this.increaseCounter}>+</button>
                <button onClick={this.decreaseCounter}>-</button>
                <button onClick={this.resetCounter}>Reset</button>
            </div>
        );
    }
}

ReactDOM.render(
    [
        <Counter identifier="first-counter"/>,
        <Counter identifier="second-counter"/>,
        <Counter identifier="third-counter"/>
    ],
    document.getElementById('root')
);

export  default Counter;