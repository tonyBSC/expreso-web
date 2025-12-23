import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import {MatRippleModule} from '@angular/material/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { InputFormComponent } from "../../../auth/components/input/input.component";
import { useResetPasswordMutation } from './reset-password.service';

@Component({
  selector: 'app-reset-password-expresso',
  imports: [
    MatProgressSpinnerModule,
    MatIconModule,
    MatRippleModule,
    InputFormComponent,
    TranslateModule,
    ReactiveFormsModule
],
  templateUrl: './reset-password-expresso.html',
  styleUrl: './reset-password-expresso.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class ResetPasswordExpressoComponent { 
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);

  isVerify = signal<boolean>(false)
  isLoad = signal<boolean>(true)

  showPassword = signal<boolean>(false)
  showValidatePassword = signal<boolean>(false)
  successChangePassword = signal<any>(null)

  newPassword = signal<String>("")
  validatePassword = signal<String>("")

  token = this.route.snapshot.queryParamMap.get('token')!;
  mutation = useResetPasswordMutation(this.token);


  constructor(
    private translate: TranslateService,
  ) {
    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');

    const browserLang = this.translate.getBrowserLang() ?? '';
    this.translate.use(browserLang.match(/es|en/) ? browserLang : 'es');

    console.log("token: ", this.token)
  }

  form = this.fb.nonNullable.group({
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/)
      ]
    ],
    validatePassword: ['']
  });

  submit(){
    const params = {
      password: this.form.controls.password.value
    }
    this.mutation.mutate( params,
      {
        onSuccess: (data: any) =>{
          console.log(data)
          if(data.hasOwnProperty('success')){
            if(data['success'] == true){
              this.successChangePassword.set(true)
            }else{
              this.successChangePassword.set(false)
            }
          }
        },
        onError:(data: any) =>{
          console.log(data)
          if(data.hasOwnProperty('success')){
            this.successChangePassword.set(true)
          }
        }
      }
    );
    console.log(params)
  }
}
