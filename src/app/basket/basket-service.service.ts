import { inject, Injectable } from '@angular/core';
import { BasketItem } from './basket.types';
import { Observable, tap } from 'rxjs';
import { ApiService } from '../shared/services/api.service';
import { Customer } from '../customer/customer.types';

@Injectable({
  providedIn: 'root'
})
export class BasketServiceService {

  constructor() { }

  items: BasketItem[] = [];

  get total(): number {
    return this.items.reduce((total, { price }) => total + price, 0);
  }

  get numberOfItems(): number {
    return this.items.length;
  }

  private apiService = inject(ApiService);

  fetch(): Observable<BasketItem[]> {
    return this.apiService.getBasket().pipe(tap((items) => (this.items = items)));
  }

  addItem(productId: string): Observable<BasketItem> {
    return this.apiService.addToBasket(productId).pipe(tap((item) => this.items.push(item)));
  }

  checkout(customer: Customer): Observable<{ orderNumber: number }> {
    return this.apiService.checkoutBasket(customer).pipe(tap(() => (this.items = [])));
  }
}
