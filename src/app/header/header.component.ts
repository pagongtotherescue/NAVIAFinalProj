import { Component } from '@angular/core';
import { BackEndService } from '../back-end.service';
import { PostService } from '../post.service'; // Import PostService

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  listOfPosts: any;

  constructor(
    private backEndService: BackEndService,
    private postService: PostService // Inject PostService
  ) {}
  }
