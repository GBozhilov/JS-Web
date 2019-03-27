import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import Movie from '../models/Movie';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '?api_key=3eda4a41730a48fb1715286f21f9d731';

@Injectable({
    providedIn: 'root'
})
export class MovieService {
    constructor(private http: HttpClient) {

    }

    getPopularMovies(): Observable<Movie[]> {
        return this.http.get<Movie[]>(BASE_URL + '/movie/popular' + API_KEY);
    }

    getInTheaterMovies(): Observable<Movie[]> {
        return this.http.get<Movie[]>(BASE_URL + '/discover/movie' + API_KEY + '&with_release_type=2|3');
    }
}
