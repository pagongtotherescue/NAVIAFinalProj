import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { BackEndService } from '../back-end.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  listOfPosts: Post[] = [];
  searchTerm: string='';

  constructor(
    private postService: PostService,
    private backEndService: BackEndService
  ) {}

  ngOnInit(): void {
    this.postService.listChangeEvent.subscribe((newlistofPost: Post[]) => {
      this.listOfPosts = newlistofPost;
    });

    this.backEndService.fetchData().subscribe((newlistofPost: Post[]) => {
    });
  }
  get filteredPosts(): Post[] {
    const filteredPosts = this.listOfPosts.filter((post) =>
    post.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    console.log(filteredPosts);
    return filteredPosts;
  }
  logSearchTerm() {
    console.log(this.searchTerm);
  }
}
