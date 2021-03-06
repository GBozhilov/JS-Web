import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {LandingComponent} from './landing/landing.component';
import {MoviesComponent} from './movies/movies.component';
import {MovieService} from './services/movie.service';
import {MovieComponent} from './movie/movie.component';
import {FooterComponent} from './footer/footer.component';
import {MovieDetailsComponent} from './movie-details/movie-details.component';
import {SingleMovieResolver} from './services/resolvers/single-movie.resolver';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingComponent,
    MoviesComponent,
    MovieComponent,
    FooterComponent,
    MovieDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    SingleMovieResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
