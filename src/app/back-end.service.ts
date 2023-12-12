import { Injectable } from '@angular/core';
import { PostService } from './post.service';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackEndService {

  constructor(private postService: PostService, private http:HttpClient) { }

  saveData() {
    const newlistofPost: Post[] = this.postService.getPost();
    this.http.put('https://crud-e46d7-default-rtdb.asia-southeast1.firebasedatabase.app/post.json', newlistofPost)
  .subscribe({
    next: (res) => {
      console.log(res);
      this.postService.setPosts(newlistofPost);
    },
    error: (error) => {
      console.error('Error while saving data:', error);
    }
  });
  }

  fetchData() {
    return this.http.get('https://crud-e46d7-default-rtdb.asia-southeast1.firebasedatabase.app/post.json')
      .pipe(
        tap((data: any) => {
          console.log('Raw data:', data); 
          let newlistofPost: Post[] = [];
          if (Array.isArray(data)) {
            newlistofPost = data as Post[];
            console.log('Received data:', newlistofPost);
            this.postService.setPosts(newlistofPost);
          } else {
            console.error('No data received or data is not an array.');
          }
        }),
        catchError((error) => {
          console.error('An error occurred while fetching data:', error);
          return [];
        })
      );
  }
  
}
