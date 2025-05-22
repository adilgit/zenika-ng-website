import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../customer/customer.types';
import { ApiService } from '../shared/services/api.service';
import { BasketItem } from './basket.types';
import { BasketServiceService } from './basket-service.service';

@Component({
  selector: 'app-basket',
  standalone: false,
  templateUrl: './basket.component.html',
})
export class BasketComponent {
  protected customer: Customer = { name: '', address: '', creditCard: '' };
  protected basketItems: BasketItem[] = [];

  protected get basketTotal(): number {
    return this.basketService.total;
  }

  constructor(
    private apiService: ApiService,
    private router: Router,
    private basketService: BasketServiceService // Assuming you meant to inject the basket service here
  ) {
    this.basketService.fetch().subscribe((basketItems) => (this.basketItems = basketItems));
  }

  protected checkout(event: Event): void {
    event.stopPropagation();
    event.preventDefault();

    this.basketService.checkout(this.customer).subscribe(() => {
      this.basketItems = [];
      this.router.navigate(['']);
    });
  }
}
