import { Component, OnDestroy, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { IdleService } from '@app/service/idle.service';
import { AlertLevel, AuthService, UiCoreService } from '@cccteam/ccc-lib';
import { environment } from '@env';
import { PaneComponent } from '@shared/pane/pane.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [PaneComponent, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
})
export class LoginComponent implements OnDestroy {
  private ui = inject(UiCoreService);
  private auth = inject(AuthService);
  private route = inject(ActivatedRoute);
  private idle = inject(IdleService);
  private authService = inject(AuthService);
  private dialog = inject(MatDialog);

  constructor() {
    this.dialog.closeAll();

    this.route.queryParams.subscribe((params) => {
      if (params['message']) {
        this.ui.publishError({ message: params['message'], level: AlertLevel.ERROR, link: '' });
      }
    });
    this.authService.logout().subscribe();
    this.idle.stop();
  }

  ngOnDestroy(): void {
    // Ineffective for OIDC, but necessary for other auth methods
    this.idle.start();
  }

  authenticate(): void {
    const encodedUrl = encodeURIComponent(this.getAndResetRedirectUrl());
    window.location.href = `${this.authService.loginRoute()}?returnUrl=${encodedUrl}`;
  }

  /**
   * Retrieves the current redirect url and then resets it in the state.
   * @returns string with the redirect url.
   */
  getAndResetRedirectUrl(): string {
    const redirectUrl = this.auth.redirectUrl();
    this.auth.redirectUrl.set(environment.baseUrl);
    if (redirectUrl === '') {
      return environment.baseUrl;
    }
    return redirectUrl;
  }
}
