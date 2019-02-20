import React, {Component} from 'react';

const isEqual = require('react-fast-compare');

class PeopleList extends Component {
    state = {
        people: [],
        isLoading: true,
        error: false
    };

    shouldComponentUpdate(nextProps, nextState) {
        const haveNextPropsChanged = !isEqual(this.props, nextProps);
        const hasNextStateChanged = !isEqual(this.state, nextState);

        return haveNextPropsChanged || hasNextStateChanged;
    }

    render() {
        const {people, isLoading, error} = this.state;

        if (error) {
            return <span>Something went wrong :(</span>;
        }

        if (isLoading) {
            return <span>Loading...</span>;
        }

        return (
            <ul>
                {
                    people.map(person => (
                        <li>
                            Name: {person.name}, Height: {person.height}
                        </li>
                    ))
                }
            </ul>
        );
    }

    getPeople = (page) => {
        return fetch(`https://swapi.co/api/people?page=${page}`)
            .then(res => res.json())
            .then(data => data.results)
            .then(people => this.setState((prevState) => ({
                people: [...prevState.people, ...people],
                isLoading: false,
            })))
            .catch(error => {
                console.error(error);
                this.setState({
                    error: true
                });
            });
    };

    componentDidMount() {
        const {page} = this.props;

        this.getPeople(page)
    }

    componentDidUpdate(prevProps, prevState) {
        const {page: currentPage} = this.props;
        const {page: lastPage} = prevProps;

        if (currentPage !== lastPage) {
            this.getPeople(currentPage)
        }
    }
}

export default PeopleList;