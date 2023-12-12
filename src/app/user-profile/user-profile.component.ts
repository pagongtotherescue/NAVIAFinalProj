import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: any;
  selectedFile: File | undefined;
  coverSelectedFile: File | undefined;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getCurrentUser().then(user => {
      this.user = user;
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onCoverFileSelected(event: any) { // add this method
    this.coverSelectedFile = event.target.files[0];
  }

  updateProfile(formValues: { name?: string, bio?: string }) {
    this.authService.updateUser({
      displayName: formValues.name,
      bio: formValues.bio,
      profilePicture: this.selectedFile,
      coverPicture: this.coverSelectedFile 
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