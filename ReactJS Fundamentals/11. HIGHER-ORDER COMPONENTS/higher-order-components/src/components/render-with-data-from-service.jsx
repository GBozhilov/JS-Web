import React, {Component} from 'react';

class DataFromServiceProvider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: props.initialData,
            isLoading: false,
            error: null
        };
    }

    componentDidMount() {
        const {serviceMethod} = this.props;

        try {
            this.setState({isLoading: true}, async () => {
                const data = await serviceMethod();

                this.setState({
                    data,
                    isLoading: false
                });
            });
        } catch (error) {
            this.setState({
                error,
                isLoading: false
            });
        }
    }

    render() {
        const {data, error} = this.state;
        const {render} = this.props;

        if (error) {
            return <span>Something went wrong!</span>
        }

        return render(data);
    }
}

export default DataFromServiceProvider;