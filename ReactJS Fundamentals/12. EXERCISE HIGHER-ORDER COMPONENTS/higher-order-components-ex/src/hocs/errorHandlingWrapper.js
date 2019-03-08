import React, {Component} from 'react';

function errorHandlingWrapper(WrappedComponent) {
    return class ErrorHandlingWrapper extends Component {
        constructor(props) {
            super(props);

            this.state = {
                hasError: false
            };
        }

        componentDidCatch(error, info) {
            console.log(error);
            console.log(info);
        }

        static getDerivedStateFromError(error) {
            return {hasError: true};
        }

        render() {
            const {hasError} = this.state;

            if (hasError) {
                return <h1>Something went wrong with {WrappedComponent.name}</h1>;
            }

            return <WrappedComponent {...this.props} />;
        }
    };
}

export default errorHandlingWrapper;