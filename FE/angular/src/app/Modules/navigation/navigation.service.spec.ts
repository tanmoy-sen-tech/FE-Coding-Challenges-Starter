import { Router } from '@angular/router';
import { mockProvider, SpectatorService } from '@ngneat/spectator';
import { createServiceFactory } from '@ngneat/spectator/jest';
import { NavigationService } from './navigation.service';

const mockNavigate = jest.fn().mockResolvedValue([]);
const mockRouter = mockProvider(Router, {
  navigate: mockNavigate
});

describe('NavigationService', () => {
  let spectator: SpectatorService<NavigationService>;
  let service: NavigationService;

  const createService = createServiceFactory({
    service: NavigationService,
    imports: [],
    declarations: [],
    providers: [mockRouter]
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    spectator = createService();
    service = spectator.service;
  });

  test('should create the component', () => {
    expect(service).toBeTruthy();
  });

  describe('goTo', () => {
    test('should pass single argument', () => {
      service.goTo('/');
      expect(mockNavigate).toBeCalledWith(['/']);
    });
    test('should pass multiple arguments', () => {
      service.goTo('/movie', 'tt123');
      expect(mockNavigate).toBeCalledWith(['/movie', 'tt123']);
    });
    test('should throw errors', (done) => {
      const mockError = 'mock error';
      mockNavigate.mockRejectedValueOnce(mockError);
      service.goTo('/').then(
        () => fail('Error not thrown.'),
        () => {
          done();
        }
      );
    });
  });
});
