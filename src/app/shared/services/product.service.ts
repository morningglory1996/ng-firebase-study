import { Injectable } from '@angular/core';
import { Product } from '../models/products';
import { Observable, of } from 'rxjs/index';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products = [
    new Product(1, 'Angular入門書1', 3800, 'これはAngular入門書1です'),
    new Product(2, 'Angular入門書2', 410, 'これはAngular入門書2です'),
    new Product(3, 'Angular入門書3', 680, 'これはAngular入門書3です'),
  ];

  constructor() {}

  list(): Observable<Product[]> {
    return of(this.products);
  }

  get(id: number): Observable<Product> {
    return of(this.products[id - 1]);
  }
}
