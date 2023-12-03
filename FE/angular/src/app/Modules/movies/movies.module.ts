import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesComponent } from './components/movies/movies.component';
import { MovieComponent } from './components/movie/movie.component';
import { NavigationModule } from '../navigation/navigation.module';
import { LoadingSpinnerComponent } from 'src/app/components/loading-spinner/loading-spinner.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MovieRoutingModule } from './movie-routing.module';

@NgModule({
  declarations: [MoviesComponent, MovieComponent, MovieDetailsComponent],
  imports: [CommonModule, MovieRoutingModule, NavigationModule, LoadingSpinnerComponent]
})
export class MoviesModule {}
