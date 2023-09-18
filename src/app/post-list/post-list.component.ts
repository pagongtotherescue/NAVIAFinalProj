import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  listOfPosts: Post[] = [
    new Post(
      "Tech Crunch",
      "https://www.hostinger.ph/tutorials/wp-content/uploads/sites/2/2021/12/techcrunch-website-homepage.png",
      "Tech Crunch is a blog that provides technology and startup news, from the latest developments in Silicon Valley to venture",
      "mild",
      new Date()
    ),
    new Post(
      "The Verge",
      "https://www.hostinger.ph/tutorials/wp-content/uploads/sites/2/2021/12/the-verge-website-homepage.png",
      "The Verge is a blog focused on examining how technology will change the future. This blog provides news and opinion",
      "Johnny Bravo",
      new Date()
    )
  ];
  
constructor() { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

ngInit(): void {

}
}
