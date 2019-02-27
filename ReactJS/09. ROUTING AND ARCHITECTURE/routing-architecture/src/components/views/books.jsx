import React, {Component} from 'react';
import {Route} from "react-router-dom";
import Book from './book';

const BooksList = ({books}) => {
    return (
        <ul>
            {
                books.map(b => <li key={b.id}>{b.title}</li>)
            }
        </ul>
    );
};

class Books extends Component {
    state = {
        books: [
            {id: 1, title: 'LOTR'},
            {id: 2, title: 'HP'},
            {id: 3, title: 'GOT'},
        ]
    };

    render() {
        const {books} = this.state;
        const {path} = this.props.match;

        return (
            <div>
                <aside>
                    Here is an ad for you
                </aside>
                <Route path={path} render={() => <BooksList books={books}/>} exact/>
                <Route path={`${path}/:id`} component={Book} exact/>
            </div>
        );
    }
}

export default Books;