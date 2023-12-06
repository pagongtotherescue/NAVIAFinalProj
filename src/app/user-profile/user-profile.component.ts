import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  user: any;

  constructor(private authService: AuthService) {
    this.user = this.authService.getCurrentUser();
  }
  updateProfile(formValues: { name?: string, bio?: string }) {
    this.authService.updateUser({
      displayName: formValues.name,
      photoURL: formValues.bio
    })
    .subscribe({
      next: () => console.log('Profile updated!'),
      error: (error: any) => console.error(error)
    });
  }
}