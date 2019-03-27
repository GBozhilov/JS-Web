/* tslint:disable:no-string-literal */
import {Component, OnInit} from '@angular/core';
import {MovieService} from '../services/movie.service';
import Movie from '../models/Movie';

@Component({
    selector: 'app-movies',
    templateUrl: './movies.component.html',
    styleUrls: ['./movies.component.css']
})

export class MoviesComponent implements OnInit {
    popularMovies: Movie[];
    inTheaterMovies: Movie[];
    message: null;

    constructor(private moviesService: MovieService) {
    }

    ngOnInit() {
        this.moviesService
            .getPopularMovies()
            .subscribe(data => {
                this.popularMovies = data['results'].slice(0, 6);
            });
        this.moviesService
            .getInTheaterMovies()
            .subscribe(data => {
                this.inTheaterMovies = data['results'].slice(6, 12);
            });
    }

    fromChild(event) {
        this.message = event;
    }
}
