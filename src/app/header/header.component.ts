import { Component } from '@angular/core';
import { BackEndService } from '../back-end.service';
import { PostService } from '../post.service'; // Import PostService
import { AuthService } from '../auth.service'; // Import AuthService
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  listOfPosts: any;

  constructor(
    private backEndService: BackEndService,
    private postService: PostService, // Inject PostService
    private authService: AuthService, // Inject AuthService
    private router: Router // Inject Router
  ) {}

  logout() {
    this.authService.logout()
      .then(() => {
        console.log('Logged out!');
        this.router.navigate(['/login']);  // redirect to the login page after logout
      })
      .catch(error => console.error(error));
  }
}