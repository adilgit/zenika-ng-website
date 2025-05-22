import { Component, inject, Inject, OnInit } from '@angular/core';
import { Product } from './product/product.types';
import { BasketServiceService } from '../basket/basket-service.service';
import { CatalogServiceService } from './catalog-service.service';
import { WELCOME_MSG } from './InjectionToken';
import { BasketItem } from '../basket/basket.types';

@Component({
  selector: 'app-catalog',
  standalone: false,
  templateUrl: './catalog.component.html',
  providers: [
    { provide: WELCOME_MSG, useValue: 'Bienvenue sur le catalogue !' }, // <-- fournir la valeur ici
  ]
})
export class CatalogComponent implements OnInit {

  protected welcomeMsg = inject(WELCOME_MSG);
  private basketService = inject(BasketServiceService);
  private catalogService = inject(CatalogServiceService);

  protected products: Product[] = [];
  private basketItems: BasketItem[] = [];

  protected get isStockEmpty(): boolean {
    return this.catalogService.isStockEmpty;
  }

  protected get basketTotal(): number {
      return this.basketItems.reduce((total: number, { price }) => total + price, 0);
  }

  constructor(
  ) {

  }

  ngOnInit(): void {
    this.catalogService.fetch().subscribe((products) => (this.products = products));
    this.basketService.fetch().subscribe((basketItems) => (this.basketItems = basketItems));
  }

  protected addToBasket(product: Product): void {
    this.catalogService.addToBasket(product).subscribe((basketItem) => {
      this.basketItems.push(basketItem);
      this.decreaseStock(product);
    });
  }

  private decreaseStock(product: Product): void {
    this.catalogService.decreaseStock(product.id);
    this.products = this.catalogService.Products;
  }

  protected isAvailable(product: Product): boolean {
    return this.catalogService.isAvailable(product);
  }
}
