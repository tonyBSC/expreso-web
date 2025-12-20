import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router'

import { InputFormComponent } from '../components/input/input.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { useLoginMutation } from '../services/auth.service';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SnackbarService } from '../../../shared/snackbar/snackbar.service';
import { firstValueFrom } from 'rxjs';
import { AuthStore } from '../../store/auth/auth.store';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InputFormComponent, TranslateModule, MatProgressSpinnerModule],
  standalone: true
})
export class AuthPageComponent{ 
  authStore = inject(AuthStore);
  user = signal<String>("")
  password = signal<String>("")
  loadAuth = signal<Boolean>(false)
  login = useLoginMutation()
  constructor(
    private translate: TranslateService,
    private snackbar: SnackbarService,
    private router: Router,
  ) {
    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');

    const browserLang = this.translate.getBrowserLang() ?? '';
    this.translate.use(browserLang.match(/es|en/) ? browserLang : 'es');
  }

  async validateUser(){
    try{
      const tmp: any = await this.login.mutateAsync({username: this.user(), password: this.password()})
      if(tmp.sucess == false){
        const title = await firstValueFrom(this.translate.get('warning'));
        const message = await firstValueFrom(this.translate.get('error_credentials'));
        this.snackbar.showSnackbar({
          title: title,
          message: message,
          color: 'orange',
          icon: 'priority_high'
        })
      }else{
        this.authStore.setResponse(tmp.result as AuthResponse)
        localStorage.setItem('user', JSON.stringify(tmp.result));
        this.router.navigate(['']); 
      }
      

    }catch(error:  any){
      if (error instanceof HttpErrorResponse) {
        console.log(error)
        this.snackbar.showSnackbar({
          title: error.error.title,
          message: error.error.message,
          color: 'orange',
          icon: 'priority_high'
        })
      } else {
        console.error('Error no HTTP:', error);
      }
    }
  }
}
