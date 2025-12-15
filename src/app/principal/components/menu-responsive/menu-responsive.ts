import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MenuStore } from '../../../store/menu.store';

@Component({
  selector: 'app-menu-responsive',
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule
  ],
  templateUrl: './menu-responsive.component.html',
  styleUrl: './menu-responsive.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class MenuResponsive { 
  menuStore = inject(MenuStore);
  isMenuOpen = signal<boolean>(false);

  constructor(
    private translate: TranslateService,
  ) {
    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');

    const browserLang = this.translate.getBrowserLang() ?? '';
    this.translate.use(browserLang.match(/es|en/) ? browserLang : 'es');
  }

  openMenu() {
    this.isMenuOpen.set(true);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
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

  hideMenu(){
    const menu = document.getElementById("menu-responsive")
    menu?.classList.toggle("hide")
    this.menuStore.setToggle(false)
    this.isMenuOpen.set(false);


  }
}
