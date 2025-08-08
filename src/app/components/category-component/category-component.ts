import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { ProductsService} from '../../services/products.service';

@Component({
  selector: 'app-category-component',
  imports: [RouterLink, NgClass],
  template: `
    <section>
      <div class="category-content">
        <h1 class="category-header">{{ title }}</h1>
        <div class="category-list">
          @for (item of categoryList(); track $index) {
            <div class="category-item" [ngClass]="{ 'highlight': item.name === 'Electronics' }">
              <img src="https://dummyjson.com/image/300x200" alt="{{ item.name }}" />
              <h2>{{ item.name }}</h2>
              <p>{{ item.slug }}</p>
              <a [routerLink]="['/category', item.id]">Shop Now</a>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./category-component.css']
})
export class CategoryComponent {

  title = 'Category Component';
  description = 'This component displays category information.';
  categoryList = signal<any[] | null>(null); // Initialize with null
  productsService = inject(ProductsService);

  constructor() {
    console.log('CategoryComponent initialized');
  }

  ngOnInit() {
    console.log('CategoryComponent ngOnInit called');
    this.productsService.getCategories().subscribe((categories: any) => {
      console.log('Fetched categories:', categories);
      this.categoryList.set(categories); // Update the signal with fetched categories
    }, error => {
      console.error('Error fetching categories:', error);
    });
  }
}
