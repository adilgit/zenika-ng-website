import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../customer/customer.types';
import { BasketServiceService } from './basket-service.service';
import { Observable } from 'rxjs';
import { AsyncPipe, CurrencyPipe, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [NgForOf, NgIf, CurrencyPipe, AsyncPipe], // Only import what is used in the template

  templateUrl: './basket.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasketComponent {
  protected customer: Customer = { name: '', address: '', creditCard: '' };
  basketItems$;

  constructor(
    private router: Router,
    private basketService: BasketServiceService,
  ) {
    this.basketItems$ = this.basketService.items$;
  }

  protected get basketTotal(): Observable<number> {
    return this.basketService.total;
  }

  protected checkout(event: Event): void {
    event.stopPropagation();
    event.preventDefault();

    this.basketService.checkout(this.customer).subscribe(() => {
      this.router.navigate(['']);
    });
  }
}
