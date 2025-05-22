import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { BasketServiceService } from '../basket/basket-service.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [AsyncPipe, RouterModule, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  private basketService = inject(BasketServiceService);

  constructor() {
    this.basketService.fetch().subscribe();
  }

  get numberOfBasketItems$(): Observable<number> {
    return this.basketService.numberOfItems$;
  }

}
