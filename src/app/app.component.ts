import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'udemy-angular-project';
  path: string;

  onNavigationClicked(event: string) {
    this.path = event;
  }
}
