/* tslint:disable:no-string-literal */
import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';

import {PostService} from '../../core/services/post.service';
import {CommentService} from '../../core/services/comment.service';
import {PostInfo} from '../../shared/models/Post-Info';
import {CommentInfo} from '../../shared/models/Comment-Info';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  post: PostInfo;
  comments$: Observable<CommentInfo[]>;
  id: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private commentService: CommentService
  ) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.post = this.route.snapshot.data['post'];
    this.comments$ = this.commentService.getAllForPost(this.id);
  }

  postComment(body: Object) {
    this.commentService
      .postComment(body)
      .subscribe(() => {
        this.loadComments();
      });
  }

  loadComments() {
    this.comments$ = this.commentService.getAllForPost(this.id);
  }

  deleteComment(id: string) {
    this.commentService.deleteComment(id)
      .subscribe(() => {
        this.loadComments();
      });
  }
}
