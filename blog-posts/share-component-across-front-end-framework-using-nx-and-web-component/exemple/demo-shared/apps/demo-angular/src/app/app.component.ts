import { Component } from '@angular/core';

@Component({
  selector: 'demo-shared-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  title = 'demo-angular';
  JSON = JSON;

  person = {
    firstName: 'Jack',
    lastName: 'Doe'
  }

  clicked(event: Event) {
    console.log(event)
  }
}
