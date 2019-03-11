import React, {Component, Fragment} from 'react';

import BookCard from './book-card';
import Loading from './loading';
import BooksService from '../services/books-service'

class TopRatedBookCards extends Component {
    state = {
        books: [],
        isLoading: false,
    };

    static service = new BooksService();

    render() {
        const {books, isLoading} = this.state;

        if (isLoading) {
            return <Loading/>;
        }

        if (!books.length && !isLoading) {
            return (
                <div>
                    <br/>
                    <h2>No Books :(</h2>
                </div>
            );
        }

        return (
            <Fragment>
                <h2>Top Rated</h2>
                <div className="row">
                    <div className="card-deck space-top">
                        {
                            books.map(book => <BookCard key={book.id} {...book}/>)
                        }
                    </div>
                </div>
            </Fragment>
        );
    }

    async componentDidMount() {
        try {
            const books = await TopRatedBookCards.service.getTopRatedBooks();

            this.setState({books})
        } catch (error) {
            console.error(error);
        }
    }
}

export default TopRatedBookCards;