import { Component, OnInit } from '@angular/core';
import { BackEndService } from '../back-end.service';
import { PostService } from '../post.service'; 
import { AuthService } from '../auth.service'; 
import { Router } from '@angular/router'; 
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  listOfPosts: any;
  isLoggedIn$!: Observable<boolean>; 
  currentUser: any;

  constructor(
    private backEndService: BackEndService,
    private postService: PostService, 
    private authService: AuthService, 
    private router: Router 
  ) {}

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn();
    this.authService.getCurrentUser().then(user => {
      this.currentUser = user;
    });
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