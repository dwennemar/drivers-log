import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map, take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;
  constructor(
    private fireAuth: AngularFireAuth,
    private store: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.fireAuth.authState;
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.fireAuth.auth.signInWithPopup(provider);

    return credential.user;
    // return this.updateUserData(credential.user);
  }

  async emailSignin(email: string, passwd: string) {
    const credential = await this.fireAuth.auth.signInWithEmailAndPassword(email, passwd);
    return credential.user;
  }

  async signOut() {
    await this.fireAuth.auth.signOut();
    return this.router.navigate(['/login']);
  }

  isAuthenticated(): Observable<boolean> {
    return this.user$.pipe(
      take(1),
      map(user => !!user),
      tap(authenticated => authenticated)
    );
  }

  // private updateUserData(user) {
  //   const userRef: AngularFirestoreDocument<any>
  // }
}
