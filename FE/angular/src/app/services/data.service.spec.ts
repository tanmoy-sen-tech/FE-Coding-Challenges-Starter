import { HttpClient } from '@angular/common/http';
import { mockProvider, SpectatorService } from '@ngneat/spectator';
import { createServiceFactory } from '@ngneat/spectator/jest';
import { of } from 'rxjs';
import { DataService } from './data.service';
import { mockMovies } from '../test/mockData.stub';

const mockGet = jest.fn().mockReturnValue(of([]));
const mockHttpClient = mockProvider(HttpClient, {
  get: mockGet
});

const serviceUrl = 'https://www.omdbapi.com/?apikey=f59b2e4b&';


describe('DataService', () => {
  let spectator: SpectatorService<DataService>;
  let service: DataService;
  const createService = createServiceFactory({
    service: DataService,
    imports: [],
    declarations: [],
    providers: [mockHttpClient]
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    spectator = createService();
    service = spectator.service;
  });

  test('should create the service', () => {
    expect(service).toBeTruthy();
  });

  describe('getFilteredMovies', () => {
    describe('WHEN decade is undefined', () => {
      test('should return all movies', () => {
        expect(service.getFilteredMovies(mockMovies)).toEqual(mockMovies);
      });
    });
    describe('WHEN decade is defined', () => {
      test('should return only movies from that decade', () => {
        expect(service.getFilteredMovies(mockMovies, 2010)).toEqual([mockMovies[1]]);
      });
    });
  });

  describe('getMovie', () => {
    const mockMovie = mockMovies[0];
    beforeEach(() => {
      mockGet.mockReturnValueOnce(of(mockMovie));
      service.getMovie(mockMovie.imdbID);
    });
    test('should call http.get', () => {
      expect(mockGet).toBeCalledWith(`${serviceUrl}i=${mockMovie.imdbID}`);
    });
  });

  describe('getMovies', () => {
    beforeEach(() => {
      mockGet.mockReturnValueOnce(of({ Response: 'True', Search: mockMovies, totalResults: '2' }));
      mockGet.mockReturnValue(of(mockMovies[1]));
      service.getMovies();
    });
    test('should call http.get', () => {
      expect(mockGet).toBeCalledWith(`${serviceUrl}s=Batman&type=movie`);
    });
  });

  describe('convertToWebP', () => {
    test('should replace ".jpg" with ".webp" in the URL', () => {
      const imageUrl = 'https://example.com/image.jpg';
      const result = service.convertToWebP(imageUrl);
      expect(result).toEqual('https://example.com/image.webp');
    });
  });
});
