import { Component, Input } from '@angular/core';

export const imdbBaseLink = 'https://www.imdb.com/title/';

@Component({
  selector: 'app-go-imdb',
  templateUrl: './go-imdb.component.html'
})
export class GoImdbComponent {
  @Input() public imdbId: string;

  public navigateTo(id: string) {
    window.open(imdbBaseLink + id, 'imdbWindow');
  }
}
