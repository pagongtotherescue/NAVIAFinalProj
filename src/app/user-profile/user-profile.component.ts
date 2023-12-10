import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  user: any;
  selectedFile: File | undefined;

  constructor(private authService: AuthService, private router: Router) {
    this.user = this.authService.getCurrentUser();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  updateProfile(formValues: { name?: string, bio?: string }) {
    this.authService.updateUser({
      displayName: formValues.name,
      photoURL: formValues.bio,
      profilePicture: this.selectedFile
    })
    .subscribe({
      next: (updatedUser) => {
        console.log('Profile updated!');
        this.user = updatedUser;
        this.router.navigate(['/post-list']); 
      },
      error: (error: any) => console.error(error)
    });
  }
}