import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service'; 
import { Router } from '@angular/router';
import { BackEndService } from '../back-end.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{
  @Input() index: number = 0;
  @Input() post?: Post;
  commentText: any;
  isHovered = false;
  searchText: string = '';
  
  constructor(private postService: PostService, private router: Router, private backEndService: BackEndService) {

   }

  ngOnInit(): void {
    console.log(this.post)
  }
  delete(){
    this.postService.deleteButton(this.index);
    this.backEndService.saveData(); // Save the updated post to the database
  }

  onEdit(){
    this.router.navigate(['/post-edit', this.index]);
  }
  onClick(){
    this.postService.LikePost(this.index);
    this.backEndService.saveData(); 
  }
  onDislikeClick(){
  this.postService.disLikePost(this.index);
  this.backEndService.saveData();
  }
  addComment(commentText: string){
    if (commentText.trim() !=='') { 
      this.postService.addComment(this.index, commentText);
      this.commentText = '';
      this.backEndService.saveData();
    }
  }
  search() {
    const filteredPosts = this.postService.getPost().filter(post => 
        post.title.includes(this.searchText) || 
        post.description.includes(this.searchText)
    );
    console.log(filteredPosts);
}
}

