import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header>
      <nav>
        <a routerLink="home">Home</a>
        <a routerLink="category">Category</a>
        <a routerLink="products">Products</a>
      </nav>
    </header>
  `,
  styleUrls: ['./header-component.css']
})
export class HeaderComponent {}
