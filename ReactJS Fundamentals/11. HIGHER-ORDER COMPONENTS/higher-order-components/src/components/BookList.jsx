import React from 'react';
import BooksService from '../services/books-service';
import DataFromServiceProvider from './render-with-data-from-service.jsx';

//import withDataFromService from './hocs/with-data-from-service';

function BookList({data: books, theme}) {
    if (!books.length) {
        return null;
    }

    return (
        <ul className={theme}>
            {
                books.map(book =>
                    <li key={book.id}>{book.title}</li>
                )
            }
        </ul>
    );
}

const BookListWithServiceDataProvider = ({theme}) => (
    <DataFromServiceProvider
        initialData={[]}
        serviceMethod={new BooksService().getBooks}
        render={(data) => <BookList data={data} theme={theme}/>}
    />
);

export default BookListWithServiceDataProvider;