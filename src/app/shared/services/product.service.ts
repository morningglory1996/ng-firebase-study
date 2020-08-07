import { Injectable } from '@angular/core';
import { Product } from '../models/products';
import { Observable, of } from 'rxjs/index';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  BASE_URL = '';
  UID = '';
  TOKEN = '';
  products = [
    new Product(
      'Qa02DqVPnZ9cNyAVmqVz',
      'Angular入門書1',
      3800,
      'これはAngular入門書1です'
    ),
    new Product(
      'VOGtPCgn5viQ1nhHztJr',
      'Angular入門書2',
      410,
      'これはAngular入門書2です'
    ),
    new Product(
      'd7uC9qQCEGEB1dIu2gJj',
      'Angular入門書3',
      680,
      'これはAngular入門書3です'
    ),
  ];

  constructor(private http: HttpClient) {}

  list(): Observable<Product[]> {
    return this.http
      .get(`${this.BASE_URL}/users/${this.UID}/products.json`, {
        params: { auth: this.TOKEN },
      })
      .pipe(
        map((response: any) => {
          if (response) {
            return Object.keys(response).map((key: string) => {
              const prd = response[key];
              return new Product(key, prd.name, prd.price, prd.description);
            });
          } else {
            return [];
          }
        })
      );
  }

  get(key: string): Observable<Product> {
    return this.http
      .get(`${this.BASE_URL}/users/${this.UID}/products/${key}.json`, {
        params: { auth: this.TOKEN },
      })
      .pipe(
        map((response: any) => {
          return new Product(
            key,
            response.name,
            response.price,
            response.description
          );
        })
      );
  }

  update(product: Product): Observable<void> {
    return this.http
      .patch(
        `${this.BASE_URL}/users/${this.UID}/products/${product.key}.json`,
        {
          name: product.name,
          price: product.price,
          description: product.description,
        },
        { params: { auth: this.TOKEN } }
      )
      .pipe(map(() => {}));
  }

  create(product: Product): Observable<void> {
    return this.http
      .post(`${this.BASE_URL}/users/${this.UID}/products.json`, product, {
        params: { auth: this.TOKEN },
      })
      .pipe(map((response: any) => (product.key = response.name)));
  }

  delete(key: string): Observable<void> {
    return this.http
      .delete(`${this.BASE_URL}/users/${this.UID}/products/${key}.json`, {
        params: { auth: this.TOKEN },
      })
      .pipe(map(() => {}));
  }
}
