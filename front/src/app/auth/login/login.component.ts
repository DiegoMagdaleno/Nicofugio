import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { Auth, RecaptchaVerifier } from '@angular/fire/auth';
import { AuthService } from '../../serv/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PhoneNumberVerificationDialogComponent } from '../../dialog/phone-number-verification-dialog/phone-number-verification-dialog.component';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements AfterViewInit {
  mode = 'email';
  appVerifier!: RecaptchaVerifier;
  credential: string = '';
  password: string = '';

  constructor(
    private auth: Auth,
    private authSelf: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onCredentialInputChange(event: Event) {
    let text = (event.target as HTMLInputElement).value;
    if (text.match(/^[^@]+@[^@]+\.[a-z]{2,}$/i)) {
      this.mode = 'email';
    } else if (text.match(/^\+\d{10,}$/)) {
      this.mode = 'phone';
    } else {
      this.mode = 'email';
    }
  }

  ngAfterViewInit(): void {
    let container = document.getElementById('captcha-container');
    this.appVerifier = new RecaptchaVerifier(this.auth, container!, {
      size: 'invisible',
    });
    this.appVerifier.render();
  }

  onSubmit() {
    if (this.mode === 'email') {
      this.authSelf
        .logIn(this.credential, this.password)
        .then((credential) => {
          this.toastr.success(
            `Bienvenido de nuevo, ${credential.user.displayName}!`
          );
          this.router.navigate(['/']);
        })
        .catch((error) => {
          this.toastr.error(
            'Error al iniciar sesión. Verifica tus credenciales'
          );
        });
    } else if (this.mode === 'phone') {
      this.authSelf
        .sendVerificationCode(this.credential, this.appVerifier)
        .then((confirmationResult) => {
          const dialogRef = this.dialog
            .open(PhoneNumberVerificationDialogComponent, {
              width: '350px',
              data: {
                phoneNumber: this.credential,
                isLogin: true,
                confirmationResult: confirmationResult,
              },
            })
            .afterClosed()
            .subscribe((result) => {
              console.log('The dialog was closed');
            });
        });
    } else {
      console.error('Invalid mode');
    }
  }
}
