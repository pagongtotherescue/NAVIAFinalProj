import { Injectable } from "@angular/core";
import { Post } from "./post.model";

    @Injectable({ providedIn: 'root' })
    export class PostService {
    listOfPosts: Post[] = [
        new Post(
          "Tech Crunch",
          "https://www.hostinger.ph/tutorials/wp-content/uploads/sites/2/2021/12/techcrunch-website-homepage.png",
          "Tech Crunch is a blog that provides technology and startup news, from the latest developments in Silicon Valley to venture",
          "mild",
          new Date(),
          1,
        ),
        new Post(
          "The Verge",
          "https://www.hostinger.ph/tutorials/wp-content/uploads/sites/2/2021/12/the-verge-website-homepage.png",
          "The Verge is a blog focused on examining how technology will change the future. This blog provides news and opinion",
          "Johnny Bravo",
          new Date(),
          1,
          ),
    
        ];
        getPost() {
            return this .listOfPosts;
        }
        deleteButton(index: number) {
            this.listOfPosts.splice(index, 1)
        }
        addPost(post: Post) {
            this.listOfPosts.push(post);
        }
        updatePost(index: number, post: Post) {
            this.listOfPosts[index] = post;
        }
        getSpecPost(index: number){
            return this.listOfPosts[index];
        }
        likePost(index: number) {
            this.listOfPosts[index].numberOfLikes += 1;
        }
        addComment(index: number, comment: string) {
            this.listOfPosts[index].comments.push(comment);
        }
    }