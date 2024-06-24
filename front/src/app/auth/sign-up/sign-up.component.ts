import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../serv/auth/auth.service';
import {
  Auth,
  ConfirmationResult,
  RecaptchaVerifier,
} from '@angular/fire/auth';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PhoneNumberVerificationDialogComponent } from '../../dialog/phone-number-verification-dialog/phone-number-verification-dialog.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  phoneNumber: string = '';

  passwordPlain: string = '';

  appVerifier!: RecaptchaVerifier;

  constructor(
    public dialog: MatDialog,
    public auth: Auth,
    public authSelf: AuthService,
    private router: Router
  ) {}

  ngAfterViewInit() {
    let container = document.getElementById('captcha-container');
    this.appVerifier = new RecaptchaVerifier(this.auth, container!, {});
    this.appVerifier.render();
  }

  openDialog(confirmationResult: ConfirmationResult): void {
    const dialogRef = this.dialog.open(PhoneNumberVerificationDialogComponent, {
      width: '300px',
      data: {
        phoneNumber: this.phoneNumber,
        confirmationResult: confirmationResult,
        displayName: this.name,
        email: this.email,
        password: this.password,
        isLogin: false,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Verification code: ', result.code);
      }
    });
  }

  onSubmit(signUpForm: NgForm): void {
    if (signUpForm.valid) {
      this.authSelf
        .sendVerificationCode(this.phoneNumber, this.appVerifier)
        .then((confirmationResult) => {
          this.openDialog(confirmationResult);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.markFormGroupTouched(signUpForm);
    }
  }

  createCaptchaVerifier() {
    let container = document.getElementById('captcha-container');
    console.log(container);
    let appVerifier = new RecaptchaVerifier(this.auth, container!);
  }

  private markFormGroupTouched(formGroup: NgForm) {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.controls[key];
      control.markAsTouched();
    });
  }
}
