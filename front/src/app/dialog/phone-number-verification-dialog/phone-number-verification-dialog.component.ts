import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../serv/auth/auth.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phone-number-verification-dialog',
  templateUrl: './phone-number-verification-dialog.component.html',
  styleUrls: ['./phone-number-verification-dialog.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogActions,
    MatDialogTitle,
    MatDialogContent,
    MatDialogClose,
    MatButtonModule,
    ToastrModule,
  ],
  standalone: true,
})
export class PhoneNumberVerificationDialogComponent {
  verificationForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<PhoneNumberVerificationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private authSelf: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.verificationForm = this.fb.group({
      code: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onVerify(): void {
    if (this.verificationForm.valid) {
      this.authSelf
        .verifyCode(
          this.data.confirmationResult,
          this.verificationForm.value.code
        )
        .then(() => {
          if (this.data.isLogin) {
            this.authSelf.signIn(this.data.confirmationResult, this.verificationForm.value.code);
            this.toastr.success('¡Sesión iniciada de forma correcta!');
            this.dialogRef.close();
            this.router.navigate(['/']);
            return;
          }
          this.dialogRef.close({ code: this.verificationForm.value.code });
          this.toastr.success('¡Telefono verificado de forma correcta!, creando usuario...');
          this.authSelf.signUp(this.data.displayName, this.data.email, this.data.password);
          this.toastr.success('¡Usuario creado de forma correcta!');
          this.router.navigate(['/']);
        })
        .catch((error) => {
          this.toastr.error('¡Error al verificar el telefono!, el código es incorrecto');
        });
    }
  }
}
