import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { Toolbar } from 'primeng/toolbar';
@Component({
  selector: 'app-navbar',
  imports: [Toolbar, ImageModule ],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent { }
