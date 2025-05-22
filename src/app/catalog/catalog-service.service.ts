import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { BasketItem } from '../basket/basket.types';
import { ApiService } from '../shared/services/api.service';
import { Customer } from '../customer/customer.types';
import { Product } from './product/product.types';

@Injectable({
  providedIn: 'root'
})
export class CatalogServiceService {

  private apiService = inject(ApiService);

  #products$ = new BehaviorSubject<Product[]>([]);
  products$ = this.#products$.asObservable();

  isStockEmpty$ = this.products$.pipe(
    map(products => products.every(({ stock }) => stock === 0))
  );
 
  decreaseStock(productId: string): void {
    const currentProducts = this.#products$.getValue();
    const updatedProducts = currentProducts.map((item: Product) => {
      if (item.id === productId) {
        return { ...item, stock: item.stock - 1 };
      }
      return item;
    });
    this.#products$.next(updatedProducts); // Update the BehaviorSubject
  }

  isAvailable(product: Product): boolean {
    return product.stock !== 0;
  }

  fetch(): Observable<undefined> {
    return this.apiService.getProducts().pipe(
      tap((items) => this.#products$.next(items)), // Update the BehaviorSubject
      map((items) => undefined) // Return undefined to match the expected return type
    );

  }
}
