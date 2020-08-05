import { Injectable } from '@angular/core';
import { Product } from '../models/products';
import { Observable, of } from 'rxjs/index';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  BASE_URL = 'https://ng-firebase-study.firebaseio.com';
  UID = 'IIItvp6KwCTpHyQT5tawmx5o7B0';
  TOKEN =
    'eyJhbGciOiJSUzI1NiIsImtpZCI6ImFmMDg2ZmE4Y2Q5NDFlMDY3ZTc3NzNkYmIwNDcxMjAxMTBlMDA1NGEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbmctZmlyZWJhc2Utc3R1ZHkiLCJhdWQiOiJuZy1maXJlYmFzZS1zdHVkeSIsImF1dGhfdGltZSI6MTU5NjYyMzI5NiwidXNlcl9pZCI6IklJSXR2cDZLd0NUcEh5UVQ1dGF3bXg1bzdCMDMiLCJzdWIiOiJJSUl0dnA2S3dDVHBIeVFUNXRhd214NW83QjAzIiwiaWF0IjoxNTk2NjIzMjk2LCJleHAiOjE1OTY2MjY4OTYsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ0ZXN0QGV4YW1wbGUuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.EBtTwynwfunXDG3L3RnVW3wl0djrjMW-irajg9SQfWLv_mee0YV725jA1NDqoO4HgxlIGtl_jNWQ8hXsuMVem9it9tMvt-31ClTadk49HCU4f5tyeUTwVUvh7cAOAcZUPj3u7znrHk7SIS6R9qhms0mlwPrpgD0Z37gBB_D_yq7eQWfX7qT1bXbedQ7DEv1lYSBaZLkMhBAKRCnxGuPg_y0MshuqMZcOSLul8uP7WYrft-lICHqQr-YU7yNJpyN4f26KywUCGN6Z8optI6qG-oxgSA4MRV2GvTH-NzjCztf4QhMQjIzuJGus3B_P5WnUodvWIFbB6_DGLGP5rUosRg';
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
