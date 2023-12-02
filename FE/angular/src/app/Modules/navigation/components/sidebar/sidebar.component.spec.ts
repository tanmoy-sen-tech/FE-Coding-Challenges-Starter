import { Spectator } from '@ngneat/spectator';
import { createComponentFactory } from '@ngneat/spectator/jest';
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let spectator: Spectator<SidebarComponent>;
  let component: SidebarComponent;
  const createComponent = createComponentFactory({
    component: SidebarComponent,
    imports: [],
    declarations: [],
    providers: [],
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

  describe('onClick', () => {
    const baseLink = { label: "1990's", isActive: false };
    const linkIndex = 2;
    let emitSpy: jest.SpyInstance;
    beforeEach(() => {
      emitSpy = jest.spyOn(component.linkClicked, 'emit');
      component.onClick(baseLink, linkIndex);
    });
    test('should emit completed link', () => {
      expect(emitSpy).toBeCalledWith({ ...baseLink, index: linkIndex });
    });
  });
});
