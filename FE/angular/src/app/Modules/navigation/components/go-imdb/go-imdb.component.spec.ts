import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { GoImdbComponent, imdbBaseLink } from './go-imdb.component';

let mockWindow: jest.SpyInstance;

describe('GoImdbComponent', () => {
  let spectator: Spectator<GoImdbComponent>;
  let component: GoImdbComponent;

  const createComponent = createComponentFactory({
    component: GoImdbComponent,
    imports: [],
    declarations: [],
    providers: [],
    shallow: true,
    detectChanges: false
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks;
    spectator = createComponent();
    component = spectator.component;
  });

  test('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('navigateTo', () => {
    beforeEach(() => {
      mockWindow = jest.spyOn(window as any, 'open').mockImplementationOnce(() => undefined);
      component.navigateTo('tt1234');
    });
    test('should call window.open', () => {
      expect(mockWindow).toBeCalledWith(imdbBaseLink + 'tt1234', 'imdbWindow');
    });
  });
});
