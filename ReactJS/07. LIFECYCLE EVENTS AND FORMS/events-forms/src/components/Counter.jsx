import React, {Component} from 'react';

class Counter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            count: 0,
            initialCount: 0
        };

        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        // No need to bind arrow function
        // this.reset = this.reset.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        if (state.count !== state.initialCount) {
            return {
                count: state.count,
            };
        }

        return {
            count: props.initialCount,
            initialCount: props.initialCount
        };
    }

    increment() {
        this.setState(prevState => ({
            count: ++prevState.count
        }));
    }

    decrement() {
        this.setState(prevState => ({
            count: Math.max(0, --prevState.count)
        }));
    }

    reset = () => this.setState({count: 0});

    render() {
        const {count} = this.state;

        return (
            <div>
                <h2>{count}</h2>
                <button onClick={() => this.increment()}>+</button>
                <button onClick={() => this.decrement()}>-</button>
                <button onClick={() => this.reset()}>Reset</button>
            </div>
        );
    }
}

export default Counter;