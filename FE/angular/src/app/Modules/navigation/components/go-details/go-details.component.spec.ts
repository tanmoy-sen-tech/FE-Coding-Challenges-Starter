import { mockProvider } from '@ngneat/spectator';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { NavigationService } from '../../navigation.service';
import { GoDetailsComponent } from './go-details.component';

const mockGoTo = jest.fn();
const mockNavigationService = mockProvider(NavigationService, {
  goTo: mockGoTo
});

describe('GoDetailsComponent', () => {
  let spectator: Spectator<GoDetailsComponent>;
  let component: GoDetailsComponent;

  const createComponent = createComponentFactory({
    component: GoDetailsComponent,
    imports: [],
    declarations: [],
    providers: [mockNavigationService],
    shallow: true,
    detectChanges: false
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  test('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('navigateTo', () => {
    beforeEach(() => {
      component.navigateTo('tt1234');
    });
    test('should call navigateService.goTo', () => {
      expect(mockGoTo).toBeCalledWith('/movie', 'tt1234');
    });
  });
});
