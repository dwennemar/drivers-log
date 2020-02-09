import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Mileage} from '../../entities/mileage';
import {User} from '../../entities/user';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MilDataService {

  private user: User;

  constructor(
    private store: AngularFirestore,
    private auth: AuthService
  ) {
    this.auth.user$.toPromise().then(res => this.user = res);
    console.log(this.user);
  }

  addMilage(mil: number) {
    const data: Mileage = {
      date: new Date(),
      km: mil,
      user: this.user
    };

    this.store.collection(`mileage`).doc(new Date().toISOString()).set(data);
  }


}
