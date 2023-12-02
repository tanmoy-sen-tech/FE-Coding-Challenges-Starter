import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { DataService } from '../../../../services/data.service';
import { MovieComplete } from '../../../../model/movies-search';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html'
})
export class MovieComponent implements OnInit {
  public movieId = '';
  public movie$: Observable<MovieComplete>;

  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService) {}

  public ngOnInit(): void {
    this.getMovieDetails();
  }

  private getMovieDetails(): void {
    this.movie$ = this.activatedRoute.paramMap.pipe(
      switchMap((params) => {
        this.movieId = params.get('id') || '';
        return this.dataService.getMovie(this.movieId).pipe(
          catchError((error) => {
            console.error('Error fetching movie details:', error);
            return of({} as MovieComplete);
          })
        );
      })
    );
  }
}
