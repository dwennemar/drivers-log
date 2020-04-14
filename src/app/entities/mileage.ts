import {User} from './user';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

export interface Mileage {

  date: firebase.firestore.Timestamp;
  km: number;
  user: User;
}
