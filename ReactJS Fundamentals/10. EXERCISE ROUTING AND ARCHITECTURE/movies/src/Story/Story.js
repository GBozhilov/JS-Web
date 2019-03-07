import React, {Component, Fragment} from 'react'
import {Link} from 'react-router-dom'

class Story extends Component {
    constructor(props) {
        super(props);

        this.id = window.location.pathname.split('/').pop();
        this.state = {
            movie: this.props.movies.find(m => m._id === this.id) || null
        }
    }


    render() {
        return (
            <div className="Home">
                <h1>All movies</h1>
                <span>
                    <h2>Story line of {this.state.movie.title}</h2>
                    <p>{this.state.movie.storyLine}</p>
                </span>
                <ul className="movies">
                    {
                        this.props.movies.map(m => (
                            <li key={m._id} className="movie">
                                <h2>{m.title}</h2>
                                <img src={m.poster} width="250px" height="400px" alt="poster"/>
                                <span>
                            <Fragment>
                                <button><Link to={`/trailer/${m._id}`}>View Trailer</Link></button>
                                <button onClick={() => {
                                    this.setState({
                                        movie: this.props.movies.find(movie => movie._id === m._id)
                                    })
                                }}>View Story Line</button>
                            </Fragment>
                            </span>
                            </li>))
                    }

                </ul>
            </div>
        );
    }
}

export default Story;