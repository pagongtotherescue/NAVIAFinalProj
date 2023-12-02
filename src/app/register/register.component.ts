import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private authService: AuthService) { }

  register(email: string, password: string) {
    if (password.length < 6) {
      console.error('Password should be at least 6 characters');
      return;
    }
  
    this.authService.register(email, password)
      .then(() => console.log('Registered!'))
      .catch(error => console.error(error));
  }
}