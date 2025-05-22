import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CatalogServiceService } from './catalog/catalog-service.service';
import { catchError, of } from 'rxjs';

export const catalogResolver: ResolveFn<any> = (route, state) => {
  const catalog = inject(CatalogServiceService);
   
  return catalog.fetch().pipe(
    catchError((error) => {
      console.error('Erreur lors du chargement des produits', error);
      return of(false); // Retourner false en cas d'erreur
    }),
  );
};
