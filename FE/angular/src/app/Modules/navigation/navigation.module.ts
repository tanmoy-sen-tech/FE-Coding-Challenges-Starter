import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { GoBackComponent } from './components/go-back/go-back.component';
import { GoDetailsComponent } from './components/go-details/go-details.component';
import { GoImdbComponent } from './components/go-imdb/go-imdb.component';
import { DecadesComponent } from './components/decades/decades.component';

@NgModule({
  declarations: [SidebarComponent, GoBackComponent, GoDetailsComponent, GoImdbComponent, DecadesComponent],
  imports: [CommonModule],
  exports: [SidebarComponent, GoBackComponent, GoDetailsComponent, GoImdbComponent, DecadesComponent]
})
export class NavigationModule {}
