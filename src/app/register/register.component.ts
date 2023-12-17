import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private authService: AuthService) { }

  register(email: string, password: string, name: string, profilePic: any, coverPic: any) {
    if (password.length < 6) {
      console.error('Password should be at least 6 characters');
      return;
    }
  
    this.authService.register(email, password, name, profilePic, coverPic)
      .then(() => console.log('Registered!'))
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          window.alert('The email address is already in use by another account.');
        } else {
          console.error(error);
        }
      });
  }
}