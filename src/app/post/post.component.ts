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
  editingCommentIndex: number | null = null;
  editingCommentText: string = '';

  constructor(private postService: PostService, private router: Router, private backEndService: BackEndService) {}

  ngOnInit(): void {
    console.log(this.post)
  }
  delete(){
    this.postService.deleteButton(this.index);
    this.backEndService.saveData(); 
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
  startEditingComment(index: number, comment: string) {
    this.editingCommentIndex = index;
    this.editingCommentText = comment;
  }

  saveEditedComment(index: number) {
    this.postService.editComment(this.index, index, this.editingCommentText);
    this.editingCommentIndex = null;
    this.backEndService.saveData();
  }

  deleteComment(index: number) {
    this.postService.deleteComment(this.index, index);
    this.backEndService.saveData();
  }
}
