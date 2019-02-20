import React, {Component, Fragment} from 'react';
import PeopleList from './PeopleList';
//import RandomList from './RandomList';


class General extends Component {
    state = {
        randomList: [1, 2, 3, 4],
        page: 1,
        isLoading: false
    };

    setNextPage = () => {
        this.setState((prevState) => ({
            page: prevState.page + 1
        }))
    };

    render() {
        const {randomList, page, isLoading} = this.state;

        if (isLoading) {
            return <span>Loading...</span>
        }

        return (
            <Fragment>
                <button onClick={this.setNextPage}>Generate More</button>
                <PeopleList page={page}/>
                {/*<RandomList randomList={randomList}/>*/}
            </Fragment>
        );
    }

    componentDidMount() {
        // this.setState((prevState) => ({
        //     randomList: [...prevState.randomList, 5]
        // }));
        setTimeout(() => {
            this.setState({isLoading: true})
        }, 3000);
    }
}

export default General;