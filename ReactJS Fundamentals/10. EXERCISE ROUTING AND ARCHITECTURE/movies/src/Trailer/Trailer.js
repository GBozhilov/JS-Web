import React, {Component} from 'react'
import ReactPlayer from 'react-player';
import {Link} from 'react-router-dom'
import './Trailer.css'

class Trailer extends Component {
    constructor(props) {
        super(props);

        this.id = window.location.pathname.split('/').pop();
        this.state = {
            movie: this.props.movies.find(m => m._id === this.id) || null,
            clicked: false
        }
    }


    render() {
        const {movie} = this.state;
        const {movies} = this.props;

        return (
            <div className="Home">
                <h1>All movies</h1>
                <span>
                    <h2>Trailer of {movie.title}</h2>
                    <div className="trailer">
                        <div className="small">
                            <ReactPlayer url={movie.trailerUrl}/>
                        </div>
                    </div>
                </span>

                <ul className="movies">
                    {
                        movies.map(m => (
                            <li key={m._id} className="movie">
                                <h2>{m.title}</h2>
                                <img src={m.poster} width="250px" height="400px" alt="poster"/>
                                <span>
                                <button onClick={() => {
                                    this.setState({
                                        movie: movies.find(movie => movie._id === m._id)
                                    })
                                }}>View Trailer </button>
                                <button><Link to={`/story/${m._id}`}>View Story Line</Link></button>
                                </span>
                            </li>))
                    }
                </ul>
            </div>
        );
    }
}

export default Trailer;