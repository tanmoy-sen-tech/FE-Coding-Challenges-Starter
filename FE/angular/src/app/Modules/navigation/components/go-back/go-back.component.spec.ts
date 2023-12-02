import { mockProvider } from '@ngneat/spectator';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { NavigationService } from '../../navigation.service';
import { GoBackComponent } from './go-back.component';

const mockGoTo = jest.fn();
const mockNavigationService = mockProvider(NavigationService, {
  goTo: mockGoTo
});

describe('GoBackComponent', () => {
  let spectator: Spectator<GoBackComponent>;
  let component: GoBackComponent;

  const createComponent = createComponentFactory({
    component: GoBackComponent,
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
      component.navigateTo();
    });
    test('should call navigateService.goTo', () => {
      expect(mockGoTo).toBeCalledWith('/');
    });
  });
});
