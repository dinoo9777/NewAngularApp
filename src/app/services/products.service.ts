import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { signal } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  title: string;
  price: number;
  rating: number;
  stock: number;
  brand: string;
  categoryId: number;
  images: string[];
  description: string;
  category: string;
  thumbnail: string;
}
export interface Category {
  id: number;
  name?: string;
}

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  constructor(private http: HttpClient) { }
  // Example method to fetch products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('https://dummyjson.com/products').pipe(
      map((response: any) => response.products)
    );

  }

  getCategories(): Observable<Category[]> {
    return this.http.get<string[]>('https://dummyjson.com/products/categories').pipe(
      map((categories: string[]) => {
        return categories.map((category:any, index) => ({
          id: index + 1,
          name: category.name,
          slug: category.slug,
          url: `https://dummyjson.com/products/category/${category.name}`
        }));
      })
    );
  }

  filterProductsByCategory(categoryName: string): Observable<Product[]> {
    return this.http.get<Product[]>(`https://dummyjson.com/products/category/${categoryName}`).pipe(
      map((response: any) => response.products)
    );
  }
}
