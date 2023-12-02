import { Router } from '@angular/router';
import { mockProvider, Spectator } from '@ngneat/spectator';
import { createComponentFactory } from '@ngneat/spectator/jest';
import { of } from 'rxjs';
import { DecadesComponent } from './decades.component';

const mockEvents = of([]);
const mockRouter = mockProvider(Router, {
  events: mockEvents
});

describe('DecadesComponent', () => {
  let spectator: Spectator<DecadesComponent>;
  let component: DecadesComponent;
  const createComponent = createComponentFactory({
    component: DecadesComponent,
    imports: [],
    declarations: [],
    providers: [mockRouter],
    shallow: true,
    detectChanges: false
  });

  beforeEach(() => {
    spectator = createComponent({
      props: {
        currentDecade: 2000,
        decades: [1980, 1990, 2000, 2010]
      }
    });
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
    test('should define links', () => {
      expect(component.links?.length).toBeTruthy();
    });
    test('should set currentDecade link to be active', () => {
      expect(component.links.find(({ isActive }) => !!isActive)?.label).toBe(`${component.currentDecade}'s`);
    });
  });

  describe('passDecade', () => {
    let emitSpy: jest.SpyInstance;
    beforeEach(() => {
      emitSpy = jest.spyOn(component.updateDecade, 'emit');
      component.ngOnInit();
      component.passDecade({ label: "1990's", isActive: false, index: 2 });
    });
    test('should update which link is active', () => {
      expect(component.links.find(({ isActive }) => !!isActive)?.label).toBe("1990's");
    });
    test('should emit selected decade', () => {
      expect(emitSpy).toBeCalledWith(1990);
    });
  });
});
