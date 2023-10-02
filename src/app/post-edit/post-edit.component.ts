import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { PostService } from '../post.service';
import { Post } from '../post.model';
import { Params, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
form!: FormGroup;
index: number = 0;
editMode = false;
  constructor(private postService: PostService, private router: Router,
    private actRoute: ActivatedRoute) { }

  ngOnInit(): void {

    let editTitle = '';
    let editImgPath = '';
    let editDescription = '';

    this.actRoute.params.subscribe((params: Params) => {
      if(params['index']) {
        console.log(params['index']);
        this.index = params['index'];

        const editPost = this.postService.getSpecPost(this.index);

        editTitle = editPost.title;
        editImgPath = editPost.imagePath;
        editDescription = editPost.description;

        this.editMode = true;

      }
    }
  );

    this.form = new FormGroup({
      title: new FormControl(editTitle, [Validators.required]),
      imgPath: new FormControl(editImgPath, [Validators.required]),
      description: new FormControl(editDescription, [Validators.required])
    })
  }

  onSubmit(){
    const title = this.form.value.title;
    const imgPath = this.form.value.imgPath;
    const description = this.form.value.description;

    const post: Post = new Post(
      title, imgPath, description, 'mild', new Date()
    );

    if (this.editMode == true) {
      this.postService.updatePost(this.index, post)
    }
    else {
      this.postService.addPost(post);
    }

    this.router.navigate(['post-list']);
  }
}