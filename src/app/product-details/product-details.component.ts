import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../catalog/product/product.types';
import { ApiService } from '../shared/services/api.service';
import { PRODUCT_DETAILS_PARAM_KEY } from './product-details.config';
import { Observable } from 'rxjs';
import { AsyncPipe, CurrencyPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
    imports: [NgIf, CurrencyPipe, AsyncPipe], // <-- Ajoute NgIf et CurrencyPipe

  templateUrl: './product-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailsComponent {
  protected product?: Product;

  productDetails$ = new Observable<Product>;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.productDetails$ =   this.apiService
      .getProduct(this.activatedRoute.snapshot.params[PRODUCT_DETAILS_PARAM_KEY]);
  }
}
