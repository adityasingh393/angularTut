import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'authenticationApp';

  constructor(private trnaslateService: TranslateService) {
    const userLang = navigator.language || 'en';
    const langCode = userLang.split('-')[0];
    this.trnaslateService.setDefaultLang(langCode);
    this.trnaslateService.use(langCode);
  }
}
