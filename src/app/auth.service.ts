import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, switchMap, finalize, mapTo, defaultIfEmpty } from 'rxjs/operators';
import { of, from, firstValueFrom } from 'rxjs';
import firebase from 'firebase/compat/app';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';

type User = firebase.User;
type UserProfile = User & {
  displayName?: string | null;
  photoURL?: string | null;
  coverURL?: string | null;  
  bio?: string;
};

interface UserData {
  displayName?: string;
  photoURL?: string;
  coverURL?: string;  
  bio?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private storage: AngularFireStorage, private db: AngularFirestore) { }

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.afAuth.signOut();
  }

  register(email: string, password: string, name: string, profilePic: any, coverPic: any) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        if (result.user) {
          // Update the user profile with the name
          result.user.updateProfile({
            displayName: name
          });
  
          // Upload the profile picture
          if (profilePic) {
            const profilePicPath = `profilePics/${result.user.uid}`;
            const profilePicRef = this.storage.ref(profilePicPath);
            const profilePicTask = this.storage.upload(profilePicPath, profilePic);
  
            profilePicTask.snapshotChanges().pipe(
              finalize(() => profilePicRef.getDownloadURL().subscribe((url) => {
                if (result.user) {
                  result.user.updateProfile({
                    photoURL: url
                  });
                }
              }))
            ).subscribe();
          }
  
          // Upload the cover picture
          if (coverPic) {
            const coverPicPath = `coverPics/${result.user.uid}`;
            const coverPicRef = this.storage.ref(coverPicPath);
            const coverPicTask = this.storage.upload(coverPicPath, coverPic);
  
            coverPicTask.snapshotChanges().pipe(
              finalize(() => coverPicRef.getDownloadURL().subscribe((url) => {
                // Save the cover photo URL to Firestore
                if (result.user) {
                  const userDoc = this.db.collection('users').doc(result.user.uid);
                  userDoc.get().toPromise().then((docSnapshot) => {
                    if (docSnapshot && docSnapshot.exists) {
                      userDoc.update({ coverURL: url });
                    } else {
                      userDoc.set({ coverURL: url });
                    }
                  });
                }
              }))
            ).subscribe();
          }
        }
        return result;
      });
  }

  isLoggedIn() {
    return this.afAuth.authState.pipe(map(user => !!user));
  }

  async getCurrentUser(): Promise<UserProfile | null> {
    const user = await firstValueFrom(this.afAuth.user.pipe(defaultIfEmpty(null)));
    if (user) {
      const doc = await this.db.collection('users').doc(user.uid).get().toPromise();
      if (doc && doc.exists) {
        const data = doc.data() as UserData;
        return {
          ...user,
          displayName: data.displayName || null,
          photoURL: data.photoURL || null,
          coverURL: data.coverURL || null,  
          bio: data.bio || undefined
        };
      }
    }
    return user;
  }

  updateUser(userDetails: { displayName?: string, photoURL?: string, profilePicture?: File, coverPicture?: File, bio?: string }) {
    return this.afAuth.user.pipe(
      switchMap((user: User | null) => {
        if (user) {
          let updatePromise: Promise<void>;
          if (userDetails.profilePicture) {
            const filePath = `profilePics/${user.uid}`;
            const fileRef = this.storage.ref(filePath);
            const task = this.storage.upload(filePath, userDetails.profilePicture);
  
            updatePromise = task.snapshotChanges().pipe(
              finalize(() => fileRef.getDownloadURL().subscribe((url) => {
                user.updateProfile({
                  displayName: userDetails.displayName,
                  photoURL: url
                });
              })),
              mapTo(void 0)
            ).toPromise();
          } else {
            updatePromise = user.updateProfile({
              displayName: userDetails.displayName,
              photoURL: userDetails.photoURL
            });
          }
  
          // Handle cover photo upload here
          if (userDetails.coverPicture) {
            const coverFilePath = `coverPics/${user.uid}`;
            const coverFileRef = this.storage.ref(coverFilePath);
            const coverTask = this.storage.upload(coverFilePath, userDetails.coverPicture);
  
            coverTask.snapshotChanges().pipe(
              finalize(() => coverFileRef.getDownloadURL().subscribe((url) => {
                // Save the cover photo URL to Firestore
                this.db.collection('users').doc(user.uid).update({ coverURL: url });
              }))
            ).subscribe();
          }
  
          // Handle profile picture upload here
if (userDetails.profilePicture) {
  const filePath = `profilePics/${user.uid}`;
  const fileRef = this.storage.ref(filePath);
  const task = this.storage.upload(filePath, userDetails.profilePicture);

  task.snapshotChanges().pipe(
    finalize(() => fileRef.getDownloadURL().subscribe((url) => {
      // Save the profile photo URL to Firestore
      this.db.collection('users').doc(user.uid).update({ photoURL: url });
    }))
  ).subscribe();
}

        // Save displayName, photoURL, and bio to Firestore
if (userDetails.displayName || userDetails.photoURL || userDetails.bio) {
  const userDoc = this.db.collection('users').doc(user.uid);
  userDoc.get().toPromise().then((docSnapshot) => {
    if (docSnapshot && docSnapshot.exists) {
      const updateData: UserData = {};
      if (userDetails.displayName) updateData.displayName = userDetails.displayName;
      if (userDetails.photoURL) updateData.photoURL = userDetails.photoURL;
      if (userDetails.bio) updateData.bio = userDetails.bio;
      userDoc.update(updateData);
    } else {
      const setData: UserData = {};
      if (userDetails.displayName) setData.displayName = userDetails.displayName;
      if (userDetails.photoURL) setData.photoURL = userDetails.photoURL;
      if (userDetails.bio) setData.bio = userDetails.bio;
      userDoc.set(setData);
    }
  });
}

        return from(updatePromise).pipe(
          switchMap(() => this.afAuth.currentUser),
          map((currentUser) => currentUser ? {
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            email: currentUser.email,
            uid: currentUser.uid
          } : null)
        );
      } else {
        return of(null);
      }
    })
  );
}
}