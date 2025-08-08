import { Component, inject, signal, Input} from '@angular/core';
import { ProductsService, Product, Category } from '../../services/products.service';
import { CurrencyPipe,NgClass} from '@angular/common';
import { addItem , CartItem} from '../../store/cart/cart.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-products-component',
  imports: [CurrencyPipe, NgClass],
  template: `
    <section class="products-section">
      <div class="products-container">

        <div class="category-content">
          <h2>Categories
            @if (isFiltered()) {
              <button class="clear-filter" (click)="clearCategoryFilter()">Clear X</button>
            }
          </h2>
          <ul class="categories">
            @for (category of categories(); track $index) {
              <li class="" [ngClass]="{ 'active': isFilteredCategory() === category.name }" (click)="handleCategoryChange(category.name)">{{ category.name }}</li>
          }
        </ul>
      </div>
      <div class="products-content">
        <div class="products-grid">
          @if (products().length === 0) {
            <div class="no-products">No Product Found.</div>
          }
          @for (product of products(); track $index) {
            <div class="product-item">
              <img [src]="product.thumbnail" alt="{{ product.title }}" />
              <h2>{{ product.title }}</h2>
              <div class="product-details">
                <span [style]="{ 'background': 'gray', 'color': 'white','font-size': '0.7em','padding': '0.1em 0.2em','border-radius': '0.2em','margin-bottom': '0.3em',display: 'inline-block' }">{{ product.category }}</span>
                <p>Price: {{ product.price | currency }}
                  <button (click)="addToCart(product)" class="add-to-cart" style="width:100%;padding: 0.2em 0.5em;background: black;color: white;border: none;border-radius: 0.2em;cursor: pointer;margin-top: 0.5em;">Buy Now</button>
                </p>
              </div>
            </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./products-component.css']
})
export class ProductsComponent {
  @Input() item!: CartItem;

  isFiltered = signal(false);
  isFilteredCategory = signal<string | null>(null);
  products = signal<Product[]>([]);
  categories = signal<any[]>([]);
  productsService = inject(ProductsService);
  constructor( private store: Store) {
    console.log('ProductsComponent initialized');
  }

  ngOnInit() {
    console.log('ProductsComponent ngOnInit called');
    this.productsService.getProducts().subscribe((products: Product[]) => {
      console.log('Fetched products:', products);
      this.products.set(products); // Update the signal with fetched products
    }, error => {
      console.error('Error fetching products:', error);
    });

    this.productsService.getCategories().subscribe((categories: Category[]) => {
      console.log('Fetched categories:', categories);
      this.categories.set(categories); // Update the signal with fetched categories
    }, error => {
      console.error('Error fetching categories:', error);
    });
  }

  handleCategoryChange(categoryName: string) {
    this.isFiltered.set(true);
    this.isFilteredCategory.set(categoryName);
    this.productsService.filterProductsByCategory(categoryName).subscribe((filteredProducts: Product[]) => {
      this.products.set(filteredProducts);
    });
  }

  clearCategoryFilter() {
    console.log('Clearing category filter');
    this.productsService.getProducts().subscribe((products: Product[]) => {
      console.log('Fetched products:', products);
      this.isFiltered.set(false);
      this.isFilteredCategory.set(null);
      this.products.set(products);
    });
  }
  addToCart(product: Product) {
    console.log('Adding product to cart:', product);
    this.store.dispatch(addItem({ item: { ...product, quantity: 1 } }));
    // Logic to add the product to the cart
    // This could involve dispatching an action to the store or calling a service method
  }
}
