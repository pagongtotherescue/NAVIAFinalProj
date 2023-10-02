import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostComponent } from './post/post.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

const routes : Routes = [
  {path: '', redirectTo: 'authentication', pathMatch: 'full'},
  { path : 'post-list', component : PostListComponent },
  { path : 'post-add', component : PostEditComponent },
  { path : 'authentication', component : AuthComponent },
  { path : 'post-edit/:index', component: PostEditComponent }
]
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    PostEditComponent,
    PostListComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
