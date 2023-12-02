import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesComponent } from './components/movies/movies.component';
import { MovieComponent } from './components/movie/movie.component';
import { NavigationModule } from '../navigation/navigation.module';
import { LoadingSpinnerComponent } from 'src/app/components/loading-spinner/loading-spinner.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';

@NgModule({
  declarations: [MoviesComponent, MovieComponent, MovieDetailsComponent],
  imports: [CommonModule, NavigationModule, LoadingSpinnerComponent]
})
export class MoviesModule {}
