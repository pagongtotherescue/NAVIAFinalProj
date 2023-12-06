import { Component } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private authService: AuthService) { }

  register(email: string, password: string, profilePic: any) {
    if (password.length < 6) {
      console.error('Password should be at least 6 characters');
      return;
    }
  
    this.authService.register(email, password, profilePic)
      .then(() => console.log('Registered!'))
      .catch(error => console.error(error));
  }

}