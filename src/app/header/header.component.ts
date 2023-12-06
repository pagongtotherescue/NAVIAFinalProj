import { Component, OnInit } from '@angular/core';
import { BackEndService } from '../back-end.service';
import { PostService } from '../post.service'; // Import PostService
import { AuthService } from '../auth.service'; // Import AuthService
import { Router } from '@angular/router'; // Import Router
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  listOfPosts: any;
  isLoggedIn$!: Observable<boolean>; // Use the "!" post-fix expression to tell TypeScript that this variable will be definitely assigned

  constructor(
    private backEndService: BackEndService,
    private postService: PostService, // Inject PostService
    private authService: AuthService, // Inject AuthService
    private router: Router // Inject Router
  ) {}

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout()
      .then(() => {
        console.log('Logged out!');
        this.router.navigate(['/login']); 
      })
      .catch(error => console.error(error));
  }
}