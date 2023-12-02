import { Component } from '@angular/core';
import { BaseLink } from '../sidebar/sidebar.component';
import { NavigationService } from '../../navigation.service';

@Component({
  selector: 'app-go-back',
  templateUrl: './go-back.component.html'
})
export class GoBackComponent {
  public links: BaseLink[] = [
    {
      label: 'Go Back',
      isActive: true
    }
  ];

  constructor(private navigationService: NavigationService) {}

  public navigateTo() {
    this.navigationService.goTo('/');
  }
}
