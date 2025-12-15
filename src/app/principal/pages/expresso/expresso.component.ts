import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { MenuStore } from '../../../store/menu.store';

@Component({
  selector: 'app-expresso',
  imports: [
    MatIconModule,
    TranslateModule
  ],
  templateUrl: './expresso.component.html',
  styleUrl: './expresso.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ExpressoComponent { 
  menuStore = inject(MenuStore);

  constructor(
      private translate: TranslateService,
    ) {
      this.translate.addLangs(['es', 'en']);
      this.translate.setDefaultLang('es');
  
      const browserLang = this.translate.getBrowserLang() ?? '';
      this.translate.use(browserLang.match(/es|en/) ? browserLang : 'es');
    }

}
