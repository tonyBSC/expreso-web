import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { useVericatioAccount } from './verify-account-expresso.service';

@Component({
  selector: 'app-verify-account-expresso',
  imports: [
    MatProgressSpinnerModule,
    MatIconModule, 
  ],
  templateUrl: './verify-account-expresso.component.html',
  styleUrl: './verify-account-expresso.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class VerifyAccountExpressoComponent { 

  private route = inject(ActivatedRoute);

  isVerify = signal<boolean>(false)
  isLoad = signal<boolean>(true)

  // verifyAccount = useVericatioAccount()
  token = this.route.snapshot.queryParamMap.get('token')!;

  // token = computed(() => this.queryParams()?.get('token') ?? '');
  verificationQuery = useVericatioAccount(this.token);
}
