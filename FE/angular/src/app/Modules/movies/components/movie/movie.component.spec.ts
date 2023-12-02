import { ActivatedRoute } from '@angular/router';
import { mockProvider, Spectator } from '@ngneat/spectator';
import { createComponentFactory } from '@ngneat/spectator/jest';
import { DataService } from '../../../../services/data.service';
import { MovieComponent } from './movie.component';
import { of } from 'rxjs';

const mockActivatedRoute = mockProvider(ActivatedRoute, {
  paramMap: of({
    get: jest.fn(() => 'sampleMovieId'),
  }),
});
const mockDataService = mockProvider(DataService, {
  getMovie: jest.fn()
});

describe('MovieComponent', () => {
  let spectator: Spectator<MovieComponent>;
  let component: MovieComponent;
  const createComponent = createComponentFactory({
    component: MovieComponent,
    imports: [],
    declarations: [],
    providers: [mockActivatedRoute, mockDataService],
    shallow: true,
    detectChanges: false
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  test('should create the component', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });
});
