import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MenuStore } from '../../../store/menu.store';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-navbar',
  imports: [
    MatIconModule,
    RouterModule,
    MatButtonModule,
    TranslateModule,
    CommonModule
],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class Navbar {
  menuStore = inject(MenuStore);
  // toggle = signal<Boolean>(false) 
  constructor(
    private translate: TranslateService,
  ) {
    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');

    const browserLang = this.translate.getBrowserLang() ?? '';
    this.translate.use(browserLang.match(/es|en/) ? browserLang : 'es');
  }

  showMenu(){
    const menu = document.getElementById("menu-responsive")
    menu?.classList.toggle("hide")
    this.menuStore.setToggle(!this.menuStore.toggle())
  }

  setTranslate(){
    this.translate.use(!this.menuStore.translate() ? 'en' : 'es')
    this.menuStore.setTransalte(!this.menuStore.translate())
  }

  setDarkmode(){
    !this.menuStore.darkmode()
      ? document.body.setAttribute('data-theme', "dark")
      : document.body.setAttribute('data-theme', "light"); 
    this.menuStore.setDarkMode(!this.menuStore.darkmode())
  }

  

}
