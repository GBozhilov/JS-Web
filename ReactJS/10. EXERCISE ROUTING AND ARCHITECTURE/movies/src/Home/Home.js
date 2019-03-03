import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';

import './Home.css'

class Home extends Component {
    render() {
        let {movies} = this.props;
        movies = movies.map(movie =>
            (<li className="movie" key={movie._id}>
                <h2>{movie.title}</h2>
                <img src={movie.poster} width="250px" height="400px" alt="poster"/>
                <span>
                    <Fragment>
                        <button><Link to={`/trailer/${movie._id}`}>View Trailer</Link></button>
                        <button><Link to={`/story/${movie._id}`}>View Story Line</Link></button>
                    </Fragment>
                </span>
            </li>)
        );

        return (
            <div className="Home">
                <h1>All movies</h1>
                <ul className="movies">
                    {movies}
                </ul>
            </div>
        );
    }
}

export default Home;
