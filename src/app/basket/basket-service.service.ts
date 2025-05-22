import { inject, Injectable } from '@angular/core';
import { BasketItem } from './basket.types';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { ApiService } from '../shared/services/api.service';
import { Customer } from '../customer/customer.types';

@Injectable({
  providedIn: 'root'
})
export class BasketServiceService {

  constructor() { }

  #items$ = new BehaviorSubject<BasketItem[]>([]);
  items$ = this.#items$.asObservable();

  get total(): Observable<number> {
    return this.#items$.pipe(map(items => items.reduce((total, { price }) => total + price, 0)));
  }

   get numberOfItems$(): Observable<number> {
    return this.items$.pipe(map((items) => items.length));
  }

  private apiService = inject(ApiService);

  basketTotal$ =  this.items$.pipe(map((items) => items.reduce((total: number, { price }) => total + price, 0)));
  
  fetch(): Observable<undefined> {
    return this.apiService.getBasket().pipe(
      tap((items) => this.#items$.next(items)),
      map((items) => undefined));
  }
  

  addItem(productId: string): Observable<BasketItem> {
    return this.apiService.addToBasket(productId).pipe(tap((item) => this.#items$.next([...this.#items$.getValue(), item]))
    );
  }

  checkout(customer: Customer): Observable<{ orderNumber: number }> {
    return this.apiService.checkoutBasket(customer).pipe(tap(() => (this.#items$.next([]))));
  }
}
