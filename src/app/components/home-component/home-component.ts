import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-component',
  imports: [RouterLink],
  template: `
    <section>
      <div class="home-content">
        <h1>Welcome to the Home Page</h1>
        <p>This is the home component of your Angular application.</p>
        <p>Explore the navigation links to see other components.</p>
        <button routerLink="/category">Go to Category</button>
        <button routerLink="/products">Go to Products</button>  
      </div>
    </section>
  `,
  styleUrls: ['./home-component.css']
})

export class HomeComponent {

}
