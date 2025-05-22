import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { BasketServiceService } from '../basket/basket-service.service';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  protected numberOfBasketItems = 0;

  constructor(
    private basketService: BasketServiceService // Assuming you meant to inject the basket service here
  ) {
    // For now, we have an issue: the `numberOfBasketItems` property is not reactive!
    // The property is not updated when we add a product to the bakset or after checkout...
  }
  ngOnInit(): void {
    this.basketService.fetch().subscribe(({ length }) => (this.numberOfBasketItems = length));
  }
}
