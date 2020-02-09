import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Mileage} from '../../entities/mileage';
import {User} from '../../entities/user';
import {AuthService} from '../auth/auth.service';
import {Observable} from 'rxjs';
import QuerySnapshot = firebase.firestore.QuerySnapshot;
import * as firebase from 'firebase';
import DocumentData = firebase.firestore.DocumentData;
import Timestamp = firebase.firestore.Timestamp;

@Injectable({
  providedIn: 'root'
})
export class MilDataService {

  private user: User;

  constructor(
    private store: AngularFirestore,
    private auth: AuthService
  ) {
    this.auth.user$.subscribe(res => this.user = res );
  }

  addMilage(mil: number) {
    const data: Mileage = {
      date: Timestamp.now(),
      km: mil,
      user: this.user
    };

    this.store.collection(`mileage`).doc(new Date().toISOString()).set(data);
  }

  async getAllData(): Promise<AngularFirestoreCollection<Mileage>> {
    return  this.store.collection<Mileage>(`mileage`);
  }

}
