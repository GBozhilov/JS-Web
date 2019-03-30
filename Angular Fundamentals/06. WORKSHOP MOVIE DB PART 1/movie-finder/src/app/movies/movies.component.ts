import {Component, OnDestroy, OnInit} from '@angular/core';
import {MovieService} from '../services/movie.service';
import Movie from '../models/Movie';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-movies',
    templateUrl: './movies.component.html',
    styleUrls: ['./movies.component.css']
})

export class MoviesComponent implements OnInit, OnDestroy {
    popularMovies: Movie[];
    inTheaterMovies: Movie[];
    popularKidsMovies: Movie[];
    bestDramaMovies: Movie[];
    message: null;
    popularMoviesSub: Subscription;

    constructor(private moviesService: MovieService) {
    }

    ngOnInit(): void {
        this.popularMoviesSub = this.moviesService
            .getPopularMovies()
            .subscribe(data => {
                this.popularMovies = data;
            });
        this.moviesService
            .getInTheaterMovies()
            .subscribe(data => {
                this.inTheaterMovies = data;
            });
        this.moviesService
            .getKidsMovies()
            .subscribe(data => {
                this.popularKidsMovies = data;
            });
        this.moviesService
            .getBestDramaMovies()
            .subscribe(data => {
                this.bestDramaMovies = data;
            });
    }

    fromChild(event) {
        this.message = event;
    }

    ngOnDestroy(): void {
        this.popularMoviesSub.unsubscribe();
    }
}
