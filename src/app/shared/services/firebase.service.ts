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
      apiKey: 'AIzaSyBOSmH-JkjQs_-9ThxPNnifh3dQtbjf78I',
      authDomain: 'ng-firebase-study.firebaseapp.com',
      databaseURL: 'https://ng-firebase-study.firebaseio.com',
      projectId: 'ng-firebase-study',
      storageBucket: 'ng-firebase-study.appspot.com',
      messagingSenderId: '78958917742',
      appId: '1:78958917742:web:7801f5768496e45152ce7f',
      measurementId: 'G-LCW0V87MN0',
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
