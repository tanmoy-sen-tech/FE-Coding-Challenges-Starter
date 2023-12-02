import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MovieComplete } from '../../../../model/movies-search';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieDetailsComponent {
  @Input() movie: MovieComplete;
  @Input() isDetailsView = true;
}
