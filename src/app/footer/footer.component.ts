import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  protected fullYear = new Date().getUTCFullYear();

  constructor(
    private apiService: ApiService,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  protected __kaboom__() {
    this.apiService.__kaboom__().subscribe(() => this.document.location.reload());
  }
}
