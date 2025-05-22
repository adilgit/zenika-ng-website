import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { PRODUCT_DETAILS_PARAM_KEY } from './app/product-details/product-details.config';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { catalogResolver } from './app/catalog.resolver';
import { basketGuard } from './app/basket.guard';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./app/catalog/catalog.component').then(m => m.CatalogComponent),
    resolve: { products: catalogResolver }
  },
  {
    path: 'basket',
    canActivate: [basketGuard],
    loadComponent: () => import('./app/basket/basket.component').then(m => m.BasketComponent),
  },
  {
    path: 'basketEmpty',
    loadComponent: () => import('./app/basket-empty/basket-empty.component').then(m => m.BasketEmptyComponent),
  },
  {
    path: `products/:${PRODUCT_DETAILS_PARAM_KEY}`,
    loadComponent: () => import('./app/product-details/product-details.component').then(m => m.ProductDetailsComponent),
  },
  {
    path: '**',
    loadComponent: () => import('./app/not-found-component/not-found-component.component').then(m => m.NotFoundComponentComponent),
  }
];
const appConfig = {
  providers: [importProvidersFrom(BrowserModule), provideRouter(routes), provideHttpClient()],
};

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));