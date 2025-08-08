import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, Observable, single } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCart, selectCartTotal} from '../../store/cart/cart.selector';
import {AsyncPipe, CommonModule} from '@angular/common';
import { CartItem } from '../../store/cart/cart.reducer';

@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [RouterLink, AsyncPipe, CommonModule],
  template: `
    <header>
      <nav>
        <a routerLink="home">Home</a>
        <a routerLink="category">Category</a>
        <a routerLink="products">Products</a>
        <a routerLink="cart" style="margin-left: auto;">Cart {{ cartCount | async }}</a>
      </nav>
    </header>
  `,
  styleUrls: ['./header-component.css']
})
export class HeaderComponent {
  cartCount = new BehaviorSubject<number>(0);
  cart$: Observable<CartItem[]>;
  cartTotal$: Observable<number>;

  constructor(private store: Store) {
    this.cart$ = this.store.select(selectCart);
    this.cartTotal$ = this.store.select(selectCartTotal);
  }
  
  ngOnInit(){
    this.cart$.subscribe(cart => {
      this.cartCount.next(cart.length);
    });
    this.cartTotal$.subscribe(total => console.log('Cart total:', total));
  }
}
