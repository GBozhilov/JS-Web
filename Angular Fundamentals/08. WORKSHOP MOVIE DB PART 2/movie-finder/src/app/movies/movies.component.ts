import { MoviesService } from "../service/movies.service";
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  public popular: any;
  public theaters: any;
  public kidsPopular: any;
  public bestDrama: any;
  public searchResults: any;
  constructor(private moviesService: MoviesService) { }

  search(searchQuery) {
    const searchTerm = searchQuery.search;
    if (searchTerm) {
      this.moviesService.findAMovie(searchTerm).subscribe(data => {
        this.searchResults = data;
      });
    }
  }

  ngOnInit() {
    this.moviesService.getPopular().subscribe(data => {
      this.popular = data;
    });
    this.moviesService.getTheaters().subscribe(data => {
      this.theaters = data;
    });
    this.moviesService.getKidsPopular().subscribe(data => {
      this.kidsPopular = data;
    });
    this.moviesService.getBestDrama().subscribe(data => {
      this.bestDrama = data;
    });
  }

}
