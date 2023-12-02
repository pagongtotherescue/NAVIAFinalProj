import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) { }

  login(email: string, password: string) {
    this.authService.login(email, password)
      .then(() => {
        console.log('Logged in!');
        this.router.navigate(['/post-list']);
      })
      .catch(error => console.error(error));
  }
}
