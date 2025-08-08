import { Routes } from '@angular/router';
import {HomeComponent} from './components/home-component/home-component';
import {CategoryComponent} from './components/category-component/category-component';
import {ProductsComponent} from './components/products-component/products-component'; // Assuming you have a ProductsComponent defined

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'category', component: CategoryComponent },
    { path: 'products', component: ProductsComponent },
];
