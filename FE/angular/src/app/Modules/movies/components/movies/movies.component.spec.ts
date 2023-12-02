import { mockProvider, Spectator } from '@ngneat/spectator';
import { createComponentFactory } from '@ngneat/spectator/jest';
import { of } from 'rxjs';
import { DataService } from  '../../../../services/data.service';
import { MoviesComponent } from './movies.component';
import { mockDecades, mockMovies } from '../../../../test/mockData.stub';


const mockGetMovies = jest.fn().mockReturnValue(of({ Decades: mockDecades, Search: mockMovies }));
const mockGetFilteredMovies = jest.fn().mockReturnValue([mockMovies[0]]);
const mockDataService = mockProvider(DataService, {
  getMovies: mockGetMovies,
  getFilteredMovies: mockGetFilteredMovies
});

describe('MovieComponent', () => {
  let spectator: Spectator<MoviesComponent>;
  let component: MoviesComponent;
  const createComponent = createComponentFactory({
    component: MoviesComponent,
    imports: [],
    declarations: [],
    providers: [mockDataService],
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

  describe('ngOnInit', () => {
    beforeEach(() => {
      component.ngOnInit();
    });
    test('should set decades', () => {
      expect(component.decades).toEqual(mockDecades);
    });
    test('should set movies array', () => {
      expect(component.movies).toEqual(mockMovies);
    });
  });

  describe('displayMovies', () => {
    beforeEach(() => {
      component.ngOnInit();
    });
    describe('WHEN movies are defined', () => {
      beforeEach(() => {
        component.displayMovies();
      });
      test('should set filteredMovies', () => {
        expect(component.filteredMovies).toEqual([mockMovies[0]]);
      });
      describe('AND a decade is passed in', () => {
        beforeEach(() => {
          component.displayMovies(2000);
        });
        test('should set currentDecade', () => {
          expect(component.currentDecade).toEqual(2000);
        });
      });
    });
    describe('WHEN movies are undefined', () => {
      test('should set filteredMovies to an empty array', () => {
        component.movies = [];
        spectator.detectComponentChanges();
        component.displayMovies();
        expect(component.filteredMovies).toEqual([]);
      });
    });
  });
});
