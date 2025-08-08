import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './components/header-component/header-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <app-header-component></app-header-component>
    <router-outlet />
  `,
  styleUrl: './app.css'
})
export class App {
  protected title = 'New Angular App';
}
