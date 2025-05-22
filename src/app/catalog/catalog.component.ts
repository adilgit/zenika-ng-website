import { ChangeDetectionStrategy, Component, inject, Inject, OnInit } from '@angular/core';
import { Product } from './product/product.types';
import { BasketServiceService } from '../basket/basket-service.service';
import { CatalogServiceService } from './catalog-service.service';
import { WELCOME_MSG } from './InjectionToken';
import { BasketItem } from '../basket/basket.types';
import { catchError, map, Observable, of } from 'rxjs';
import { AlertService } from '../alert/alert.service';
import { AsyncPipe, CurrencyPipe, NgForOf, NgIf } from '@angular/common';
import { ProductComponent } from "./product/product.component";
import { NavigationEnd, NavigationStart, Router, RouterEvent, RouterModule } from '@angular/router';

@Component({
  selector: 'app-catalog',
  standalone: true,
  templateUrl: './catalog.component.html',
  imports: [NgIf, NgForOf, ProductComponent, AsyncPipe, RouterModule, CurrencyPipe], // Import only what is used in the template
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: WELCOME_MSG, useValue: 'Bienvenue sur le catalogue !' }, // <-- fournir la valeur ici
  ]
})
export class CatalogComponent implements OnInit {

  protected welcomeMsg = inject(WELCOME_MSG);
  private basketService = inject(BasketServiceService);
  private catalogService = inject(CatalogServiceService);
  private alertService = inject(AlertService);
  public loading = true;

  public basketItems$ = this.basketService.items$;
  public products$ = this.catalogService.products$;
  public basketTotal$ = this.basketService.basketTotal$;

  public isStockEmpty$ = this.catalogService.isStockEmpty$;

  protected get isStockEmpty(): Observable<boolean> {
    return this.catalogService.isStockEmpty$;
  }

  constructor(router: Router) {
    // router.events.subscribe((event: RouterEvent) => {
    //   if (event instanceof NavigationStart) { this.loading = true; }
    //   else if (event instanceof NavigationEnd) { this.loading = false; }
    // });
  }

  ngOnInit(): void {
    // this.catalogService.fetch().pipe(
    //   catchError((error) => {
    //     this.alertService.addDanger('Erreur lors du chargement des produits');
    //     return of([]); // Return an empty array in case of error
    //   }),
    // ).subscribe({
    //   next: () => this.loading = false,
    //   error: () => this.loading = false,
    //   complete: () => this.loading = false
    // });

    this.basketService.fetch().pipe(
      catchError(err => {
        this.alertService.addDanger('Erreur lors du chargement du panier.');
        return of([]);
      })).subscribe();
  }

  protected addToBasket(product: Product): void {
    this.basketService.addItem(product.id).pipe(
      catchError(err => {
        this.alertService.addDanger('Erreur lors de l\'ajout au panier.');
        return of(null);
      })
    ).subscribe(() => {
      this.decreaseStock(product);
    });
  }

  private decreaseStock(product: Product): void {
    this.catalogService.decreaseStock(product.id);
  }

  protected isAvailable(product: Product): boolean {
    return this.catalogService.isAvailable(product);
  }
}
