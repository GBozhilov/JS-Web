import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {PostRoutingModule} from './post-routing.module';
import {PostCreateComponent} from './post-create/post-create.component';
import {PostListComponent} from './post-list/post-list.component';
import {PostDetailsComponent} from './post-details/post-details.component';
import {PostEditComponent} from './post-edit/post-edit.component';
import {PostInfoComponent} from '../components/post-info/post-info.component';
import {CommentInfoComponent} from '../comment/comment-info/comment-info.component';
import {CommentCreateComponent} from '../comment/comment-create/comment-create.component';

@NgModule({
  declarations: [
    PostCreateComponent,
    PostDetailsComponent,
    PostEditComponent,
    PostInfoComponent,
    PostListComponent,
    CommentInfoComponent,
    CommentCreateComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PostRoutingModule
  ],
  exports: [
    PostCreateComponent,
    PostDetailsComponent,
    PostEditComponent,
    PostInfoComponent,
    PostListComponent,
  ]
})
export class PostModule {

}
