import {User} from './user';
import Timestamp = firebase.firestore.Timestamp;
import * as firebase from 'firebase';

export interface Mileage {

  date: Timestamp;
  km: number;
  user: User;
}
