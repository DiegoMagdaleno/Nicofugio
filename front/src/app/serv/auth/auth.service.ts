import { Injectable } from '@angular/core';
import { Auth, ConfirmationResult, RecaptchaVerifier, signInWithEmailAndPassword, signInWithPhoneNumber, updateEmail, updatePassword, updateProfile } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

  async sendVerificationCode(phoneNumber: string, appVerifier: RecaptchaVerifier) {
    return signInWithPhoneNumber(this.auth, phoneNumber, appVerifier);
  }

  async verifyCode(confirmationResult: ConfirmationResult, code: string) {
    return confirmationResult.confirm(code);
  }

  async signUp(displayName: string, email: string, password: string) {
    let user = this.auth.currentUser;
    updateProfile(user!, { displayName: displayName });
    updateEmail(user!, email);
    updatePassword(user!, password);
    return user;
  }

  async signIn(confirmationResult: ConfirmationResult, code: string) {
    return confirmationResult.confirm(code);
  }
  
  async logIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
}
