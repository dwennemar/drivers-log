import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Mileage} from '../../entities/mileage';
import {User} from '../../entities/user';
import {AuthService} from '../auth/auth.service';

import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class MilDataService {

  private user: User;

  constructor(
    private store: AngularFirestore,
    private auth: AuthService
  ) {
    this.auth.user$.subscribe(res => this.user = res);
  }

  addMilage(mil: number) {
    const data: Mileage = {
      date: firebase.firestore.Timestamp.now(),
      km: mil,
      user: this.user
    };

    this.store.collection(`mileage`).doc(new Date().toISOString()).set(data);
  }

  async getAllData(): Promise<AngularFirestoreCollection<Mileage>> {
    return this.store.collection<Mileage>('mileage', ref => ref.orderBy('km', 'desc'));
  }
}
