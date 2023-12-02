import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BaseLink, Link } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-decades',
  templateUrl: './decades.component.html'
})
export class DecadesComponent implements OnInit {
  @Input() public currentDecade: number | undefined;
  @Input() public decades: number[];
  @Output() public updateDecade = new EventEmitter<number | undefined>();

  public currentUrl = '';
  public links: BaseLink[];

  constructor(private router: Router) {}

  public ngOnInit(): void {
    this.links = [
      {
        isActive: !this.currentDecade,
        label: 'All'
      },
      ...this.decades.map((decade) => ({
        isActive: this.currentDecade === decade,
        label: `${decade}'s`
      }))
    ];

    this.router.events
      .pipe(filter((event) => !!(event instanceof NavigationEnd)))
      .subscribe((event) => (this.currentUrl = (event as NavigationEnd).url));
  }

  public passDecade({ index, label }: Link) {
    this.links = this.links.map((link) => ({ ...link, isActive: false }));
    this.links[index].isActive = true;
    const decade = label === 'All' ? undefined : parseInt(label.replace("'s", ''));
    this.updateDecade.emit(decade);
  }
}
