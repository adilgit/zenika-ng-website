import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AlertService } from './alert.service';
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  standalone: true,
    imports: [NgFor, AsyncPipe], // Only import NgForOf for *ngFor

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
  protected alerts$ = inject(AlertService).alerts$;
}
