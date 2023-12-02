import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface BaseLink {
  isActive: boolean;
  label: string;
}

export interface Link extends BaseLink {
  index: number;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() public links: BaseLink[];
  @Output() public linkClicked = new EventEmitter<Link>();

  public onClick(link: BaseLink, index: number) {
    this.linkClicked.emit({ ...link, index });
  }
}
