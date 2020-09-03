import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import {Observable, of, } from 'rxjs';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {User} from '../../entities/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;

  constructor(
    private fireAuth: AngularFireAuth,
    private store: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.fireAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.store.doc<User>(`user/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async googleSignin(): Promise<void> {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.fireAuth.signInWithPopup(provider);

    return this.updateUserData(credential.user);
  }

  async emailSignin(email: string, passwd: string): Promise<void> {
    const credential = await this.fireAuth.signInWithEmailAndPassword(email, passwd);
    return this.updateUserData(credential.user);
  }

  async signOut() {
    await this.fireAuth.signOut();
    return this.router.navigate(['/login']);
  }

  isAuthenticated(): Observable<boolean> {
    return this.user$.pipe(
      take(1),
      map(user => !!user),
      tap(authenticated => authenticated)
    );
  }

  private updateUserData(user): Promise<void> {
    const userRef: AngularFirestoreDocument<User> = this.store.doc(`user/${user.uuid}`);
    const data = {
      email: user.email,
      uuid: user.uid
    };

    return userRef.set(data, {merge: true});
  }
}
