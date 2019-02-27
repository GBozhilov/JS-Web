import React, {Component, Fragment, Suspense, lazy} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Book from './components/views/book';

const Home = lazy(() => import('./components/views/home'));
const About = lazy(() => import('./components/views/about'));
const Books = lazy(() => import('./components/views/books'));

class List extends Component {
    state = {
        products: [
            {id: 1, value: 'apple'},
            {id: 2, value: 'orange'},
            {id: 3, value: 'milk'},
            {id: 4, value: 'eggs'},
        ]
    };

    render() {
        const products = this.state.products;

        return (
            <ul>
                {
                    products.map(p => <li key={p.id}>{p.value}</li>)
                }
            </ul>
        );
    }

    componentDidMount() {
        this.setState(({products}) => ({
            products: [...products, {id: 5, value: 'meat'}]
        }));
    }
}

const NavBar = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/foo">Foo</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

const NotFound = () => {
    return (
        <div>
            <h1>Not Found</h1>
        </div>
    );
};

class AppWrapper extends Component {
    render() {
        return (
            <Router>
                <Fragment>
                    <NavBar/>
                    <Suspense fallback={<span>Loading...</span>}>
                        <Switch>
                            <Route path="/" component={Home} exact/>
                            <Route path="/about" component={About}/>
                            <Route path="/books" component={Books}/>
                            <Route component={NotFound}/>
                        </Switch>
                    </Suspense>
                </Fragment>
            </Router>
        );
    }
}

ReactDOM.render(
    <AppWrapper/>,
    document.getElementById('root')
);