import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  EMAIL = 'test@example.com';
  PASSWORD = 'password';

  constructor() {
    const config = {
      apiKey: '',
      authDomain: '',
      databaseURL: '',
      projectId: '',
      storageBucket: '',
      messagingSenderId: '',
      appId: '',
      measurementId: '',
    };
    firebase.initializeApp(config);
    this.signInOrcreateUser(this.EMAIL, this.PASSWORD);
  }

  signInOrcreateUser(email, password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential: UserCredential) => {
        console.log(userCredential.user.uid);
        firebase
          .auth()
          .currentUser.getIdToken()
          .then((token: string) => {
            console.log(token);
          });
      })
      .catch(() => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((userCredential: UserCredential) => {
            firebase
              .auth()
              .currentUser.getIdToken()
              .then((token: string) => {
                console.log(token);
              });
          });
      });
  }
}
