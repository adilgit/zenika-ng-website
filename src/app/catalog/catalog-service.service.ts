import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { BasketItem } from '../basket/basket.types';
import { ApiService } from '../shared/services/api.service';
import { Customer } from '../customer/customer.types';
import { Product } from './product/product.types';

@Injectable({
  providedIn: 'root'
})
export class CatalogServiceService {

  private apiService = inject(ApiService);

   products: Product[] = [];

   get Products(): Product[] {
    return this.products;
    }

   get isStockEmpty(): boolean {
    return this.products.every(({ stock }) => stock === 0);
  }

   addToBasket(product: Product): Observable<BasketItem> {
    return this.apiService.addToBasket(product.id);
  }

   decreaseStock(product: string): void {
    // decrease the stock of the product by 1 using map
    this.products = this.products.map((item : Product) => {
      if (item.id === product) {
        return { ...item, stock: item.stock - 1 };
      }
      return item;
    });
     
  }

  isAvailable(product: Product): boolean {
    return product.stock !== 0;
  }

  fetch(): Observable<Product[]> {
    return this.apiService.getProducts().pipe(tap((items) => (this.products = items)));
  }
  
}
