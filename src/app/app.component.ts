import { Component } from '@angular/core';
import { faCoffee, faSatellite } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'employee-management';
  faCoffee = faCoffee;
  faSatellite = faSatellite;
}
