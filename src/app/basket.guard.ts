import { CanActivateFn, Router } from '@angular/router';
import { BasketServiceService } from './basket/basket-service.service';
import { inject } from '@angular/core';
import { map, take } from 'rxjs';

export const basketGuard: CanActivateFn = (route, state) => {
  const basketService = inject(BasketServiceService);
  const router = inject(Router);

  return basketService.items$.pipe(
    take(1),
    map(items => {
      if (items.length > 0) {
        return true;
      } else {
        router.navigate(['basketEmpty']);
        return false;
      }
    })
  );
};
