import { EventEmitter, Injectable } from '@angular/core';
import { Post } from './post.model';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class PostService{

  constructor(private authService: AuthService) { }

  listChangeEvent: EventEmitter<Post[]>  = new EventEmitter();
    listOfPosts: Post[] = [
        // new Post(
        //   "Tech Crunch",
        //   "https://www.hostinger.ph/tutorials/wp-content/uploads/sites/2/2021/12/techcrunch-website-homepage.png",
        //   "Tech Crunch is a blog that provides technology and startup news, from the latest developments in Silicon Valley to venture",
        //   "mild",
        //   new Date(),
        //   1,
        // ),
        // new Post(
        //   "The Verge",
        //   "https://www.hostinger.ph/tutorials/wp-content/uploads/sites/2/2021/12/the-verge-website-homepage.png",
        //   "The Verge is a blog focused on examining how technology will change the future. This blog provides news and opinion",
        //   "Johnny Bravo",
        //   new Date(),
        //   1,
        //   ),
    
        ];
        async addPost(post: Post) {
          const currentUser = await this.authService.getCurrentUser();
          post.author = currentUser?.displayName || 'Anonymous'; // Modified line
        
          if (this.listOfPosts === null) {
            this.listOfPosts = []; // Initialize the array if it's null
          }
          this.listOfPosts.push(post);
          this.listChangeEvent.emit(this.listOfPosts);
        }
      
        getPost(){
          return this.listOfPosts;
        }
        deleteButton(index: number){
          this.listOfPosts.splice(index, 1)
        }
        updatePost(index: number, post: Post){
          this.listOfPosts[index] = post;
        }
        getSpecPost(index: number){
        return this.listOfPosts[index];
        }
          LikePost(index: number){
          this.listOfPosts[index].numberOfLikes += 1;
          }
          disLikePost(index: number){
            if (this.listOfPosts[index].numberOfDislikes === undefined) {
              this.listOfPosts[index].numberOfDislikes = 0;
            }
            this.listOfPosts[index].numberOfDislikes += 1;
          }  
          addComment(index: number, comment: string){
            if (!Array.isArray(this.listOfPosts[index].comments)) {
              this.listOfPosts[index].comments = [];
            }
            this.listOfPosts[index].comments.push(comment);
          }
            setPosts(newlistofPost: Post[]) {
            this.listOfPosts = newlistofPost;
            this.listChangeEvent.emit(newlistofPost);
            }
            editComment(postIndex: number, commentIndex: number, newCommentText: string) {
              this.listOfPosts[postIndex].comments[commentIndex] = newCommentText;
              this.listChangeEvent.emit(this.listOfPosts);
            }
            
            deleteComment(postIndex: number, commentIndex: number) {
              this.listOfPosts[postIndex].comments.splice(commentIndex, 1);
              this.listChangeEvent.emit(this.listOfPosts);
            }
            }
