import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FooterComponent } from "./footer/footer.component";
import { AlertComponent } from "./alert/alert.component";
import { MenuComponent } from "./menu/menu.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FooterComponent, AlertComponent, MenuComponent, RouterModule]
})
export class AppComponent {}
