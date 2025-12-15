import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


import { InputFormComponent } from "../../../auth/components/input/input.component";
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { useSendEmailMutation } from './contact-us.service';

@Component({
  selector: 'app-contac-us',
  standalone: true,
  imports: [
    FormsModule,
    MatProgressSpinnerModule,
    InputFormComponent,
    MatButtonModule,
    TranslateModule
  ],
  templateUrl: './contac-us.component.html',
  styleUrl: './contac-us.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContacUsComponent {
  subject = signal<String>("")
  email = signal<String>("")
  message = signal<string>("")
  isSend = signal<boolean>(false)

  isDisabled = computed(() =>
    !this.subject().trim() ||
    !this.email().trim() ||
    !this.message().trim()
  );

  sendEmail = useSendEmailMutation()

  constructor(
    private translate: TranslateService,
  ) {
    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');

    const browserLang = this.translate.getBrowserLang() ?? '';
    this.translate.use(browserLang.match(/es|en/) ? browserLang : 'es');
  }

  async send(){
    this.isSend.set(true)
    const params = {"subject": this.subject(), "email": this.email(), "message": this.message()};
    const resp: any = await this.sendEmail.mutateAsync(params)
    if(resp.hasOwnProperty('success')){
      console.log("mensaje enviado")
    }
    this.isSend.set(true)

  }
}
