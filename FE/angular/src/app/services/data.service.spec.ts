import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';
import { mockDecades, mockMovies } from '../test/mockData.stub';

describe('DataService', () => {
  let service: DataService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService],
    });

    service = TestBed.inject(DataService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getFilteredMovies', () => {
    it('should return all movies when decade is not provided', () => {
      const result = service.getFilteredMovies(mockMovies);
      expect(result).toEqual(mockMovies);
    });

    it('should filter movies based on the provided decade', () => {
      const result = service.getFilteredMovies(mockMovies, 2000);
      expect(result).toEqual([mockMovies[0]]);
    });
  });

  describe('getMovie', () => {
    it('should make an HTTP request to get movie details', () => {
      const mockId = 'tt123';

      service.getMovie(mockId).subscribe();

      const req = httpTestingController.expectOne(`${service['serviceUrl']}i=${mockId}`);
      expect(req.request.method).toEqual('GET');

      req.flush({}); // You can provide a mock response here if needed
    });
  });

  describe('getMovies', () => {
    it('should return stored movies if already available', () => {
      service['storedMovies'] = { Search: mockMovies, Decades:mockDecades };

      service.getMovies().subscribe((result) => {
        expect(result).toEqual(service['storedMovies']);
      });

      httpTestingController.expectNone(`${service['serviceUrl']}s=Batman&type=movie`);
    });

  });

  describe('convertToWebP', () => {
    it('should replace ".jpg" with ".webp" in the URL', () => {
      const imageUrl = 'https://example.com/image.jpg';
      const result = service.convertToWebP(imageUrl);
      expect(result).toEqual('https://example.com/image.webp');
    });
  });

});
