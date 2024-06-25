import { Injectable } from '@angular/core';
import { Auth, ConfirmationResult, RecaptchaVerifier, signInWithEmailAndPassword, signInWithPhoneNumber, updateEmail, updatePassword, updateProfile } from '@angular/fire/auth';
import { Firestore, collection, doc, docData, DocumentReference, DocumentData } from '@angular/fire/firestore';
import { firstValueFrom } from 'rxjs';

interface Item {
  isAdmin: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private firestore: Firestore) { }

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

  async checkUserIsAdmin(userUID: string): Promise<boolean> {
    const userDoc = doc(this.firestore, 'users', userUID) as DocumentReference<Item>;
    const userDocData$ = docData(userDoc);

    try {
      const user = await firstValueFrom(userDocData$);
      return user ? user.isAdmin : false;
    } catch (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
  }
}
