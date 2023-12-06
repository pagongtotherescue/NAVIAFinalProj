import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import firebase from 'firebase/compat/app';
type User = firebase.User;
import { defaultIfEmpty } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { from, mapTo } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private storage: AngularFireStorage) { }

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.afAuth.signOut();
  }

  register(email: string, password: string, profilePic: any) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        if (result.user && profilePic) {
          const filePath = `profilePics/${result.user.uid}`;
          const fileRef = this.storage.ref(filePath);
          const task = this.storage.upload(filePath, profilePic);
  
          task.snapshotChanges().pipe(
            finalize(() => fileRef.getDownloadURL().subscribe((url) => {
              if (result.user) {
                result.user.updateProfile({
                  photoURL: url
                });
              }
            }))
          ).subscribe();
        }
        return result;
      });
  }

  isLoggedIn() {
    return this.afAuth.authState.pipe(map(user => !!user));
  }
  getCurrentUser(): Promise<User | null> {
    return firstValueFrom(this.afAuth.user.pipe(defaultIfEmpty(null)));
  }
  updateUser(userDetails: { displayName?: string, photoURL?: string }) {
    return this.afAuth.user.pipe(
      switchMap((user: User | null) => user ? from(user.updateProfile(userDetails)).pipe(mapTo(userDetails)) : of(null))
    );
  }
}