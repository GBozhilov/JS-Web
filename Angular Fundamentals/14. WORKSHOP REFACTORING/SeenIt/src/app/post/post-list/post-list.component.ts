/* tslint:disable:no-string-literal */
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, UrlSegment, Router} from '@angular/router';
import {Observable} from 'rxjs';

import {PostService} from '../../core/services/post.service';
import {PostInfo} from '../../shared/models/Post-Info';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  allPosts$: Observable<PostInfo[]>;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.route.url.subscribe((segmentArr: UrlSegment[]) => {
      const segment = segmentArr[0];

      if (!segment) {
        this.allPosts$ = this.postService.getAll();
      } else {
        this.allPosts$ = this.postService.getUserPosts();
      }
    });
  }

  onDeletePost(id: string) {
    this.postService.deletePost(id)
      .subscribe(() => {
        this.allPosts$ = this.postService.getAll();
      });
  }
}
