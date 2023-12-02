import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { MovieComplete } from '../../../../model/movies-search';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html'
})
export class MoviesComponent implements OnDestroy, OnInit {
  public currentDecade?: number;
  public decades: number[] = [];
  public filteredMovies: MovieComplete[] = [];
  public isLoading = true;
  public movies: MovieComplete[] = [];
  private destroy$ = new Subject<void>();

  constructor(private dataService: DataService) {}

  public ngOnInit(): void {
    this.getMoviesList();
  }

  private getMoviesList() {
    this.dataService
      .getMovies()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.decades = data.Decades;
          this.movies = data.Search;
          this.displayMovies();
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Error fetching movies:', error);
        }
      });
  }

  public displayMovies(decade?: number): void {
    if (!this.movies?.length) {
      this.filteredMovies = [];
      return;
    }

    this.currentDecade = decade;
    this.filteredMovies = this.dataService.getFilteredMovies(this.movies, decade);
  }

  trackByFn(index: number, movie: MovieComplete): string {
    return movie.imdbID;
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
