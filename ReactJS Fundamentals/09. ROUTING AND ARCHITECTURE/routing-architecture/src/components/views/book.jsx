import React, {Component} from 'react';

const getBookData = (id) => {
    const books = [
        {
            1: {
                title: 'Lotr',
                author: 'Tolkien',
                publishDate: '1986',
            }
        }
    ];

    const book = books.find(book => book.hasOwnProperty(id))[id];

    return Promise.resolve(book);
};

class Book extends Component {
    state = {
        title: '',
        author: '',
        publishDate: ''
    };

    render() {
        const {author, title, publishDate} = this.state;

        return (
            <div>
                Title: <span>{title}</span>
                Author: <span>{author}</span>
                Publish Date: <span>{publishDate}</span>
            </div>
        );
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        const book = await getBookData(id);
        this.setState(book);
    }

}

export default Book;