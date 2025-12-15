import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Factory para crear TranslateHttpLoader
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslateModule, HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(private translate: TranslateService) {
    const availableLangs = ['en', 'es'];
    const browserLang = translate.getBrowserLang();
    const selected = availableLangs.includes(browserLang ?? '') ? browserLang : 'en';

    translate.addLangs(availableLangs);
    translate.setDefaultLang('en');
    translate.use(selected!);
  }
  protected title = 'Aquasonic';
}
