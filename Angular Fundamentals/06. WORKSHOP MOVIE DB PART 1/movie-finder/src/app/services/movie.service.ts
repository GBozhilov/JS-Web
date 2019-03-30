import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import Movie from '../models/Movie';
import {map} from 'rxjs/operators';
import MovieDetails from '../models/MovieDetails';

const BASE_URL = 'https://api.themoviedb.org/3/';
const POPULAR = 'discover/movie?sort_by=popularity.desc';
const IN_THEATERS = 'discover/movie?primary_release_date.gte=2019-03-01&primary_release_date.lte=2019-04-30';
const KIDS = 'discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc';
const BEST_DRAMA = 'discover/movie?with_genres=18&primary_release_year=2018';
const API_KEY = '&api_key=3eda4a41730a48fb1715286f21f9d731';
const API_KEY_ALT = '?api_key=3eda4a41730a48fb1715286f21f9d731';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient) {

  }

  getPopularMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(BASE_URL + POPULAR + API_KEY)
      .pipe(
        map(data => data['results'].slice(0, 6))
      );
  }

  getInTheaterMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(BASE_URL + IN_THEATERS + API_KEY)
      .pipe(
        map(data => data['results'].slice(6, 12))
      );
  }

  getKidsMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(BASE_URL + KIDS + API_KEY)
      .pipe(
        map(data => data['results'].slice(0, 6))
      );
  }

  getBestDramaMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(BASE_URL + BEST_DRAMA + API_KEY)
      .pipe(
        map(data => data['results'].slice(0, 6))
      );
  }

  getMovieById(id: string) {
    return this.http.get<MovieDetails>(BASE_URL + `movie/${id}` + API_KEY_ALT);
  }
}
