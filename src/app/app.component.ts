import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterModule, MapComponent, SidebarComponent]
})
export class AppComponent {
  title = 'Map Explorer';
}
