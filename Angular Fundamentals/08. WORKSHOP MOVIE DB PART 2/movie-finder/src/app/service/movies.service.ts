import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

// tslint:disable-next-line:max-line-length
const apiKey = "3eda4a41730a48fb1715286f21f9d731";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  formattedDateGte = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDay() + 1}`;
  formattedDateLte = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDay() + 1}`;
  path = "https://api.themoviedb.org/3/";
  popular = "discover/movie?sort_by=popularity.desc";
  theaters = `discover/movie?primary_release_date.gte=${this.formattedDateGte}&primary_release_date.lte=${this.formattedDateLte}`;
  bestDrama = `discover/movie?with_genres=18&sort_by=vote_average.desc&vote_count.gte=10`;
  kidsPopular = `discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc`;
  movie = `movie/`;
  search = `search/movie?&query=`;
  authentication = "&api_key=";
  authenticationForMovie = "?api_key=";

  constructor(private http: HttpClient) {
  }

  public getPopular() {
    return this.http.get(this.path + this.popular + this.authentication + apiKey);
  }

  public getTheaters() {
    return this.http.get(this.path + this.theaters + this.authentication + apiKey);
  }

  public getKidsPopular() {
    return this.http.get(this.path + this.kidsPopular + this.authentication + apiKey);
  }

  public getBestDrama() {
    return this.http.get(this.path + this.bestDrama + this.authentication + apiKey);
  }

  public getMovie(id: string) {
    return this.http.get(this.path + this.movie + id + this.authenticationForMovie + apiKey);
  }

  public findAMovie(searchQuery: string) {
    return this.http.get(this.path + this.search + searchQuery + this.authentication + apiKey);
  }
}
