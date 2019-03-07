import React from 'react';

function withDataFromService(Component, initialData, serviceMethod) {
    return class extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                data: initialData,
                error: null
            };
        }

        async componentDidMount() {
            try {
                const data = await serviceMethod();

                this.setState({data});
            } catch (error) {
                this.setState({error});
            }
        }

        render() {
            const {data, error} = this.state;

            if (error) {
                return <span>Something went wrong!</span>
            }

            return (
                <Component data={data} {...this.props}/>
            );
        }
    }
}

export default withDataFromService;