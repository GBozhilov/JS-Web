import {Component, EventEmitter, Input, Output} from '@angular/core';

import {CommentInfo} from '../../shared/models/Comment-Info';

@Component({
  selector: 'app-comment-info',
  templateUrl: './comment-info.component.html',
  styleUrls: ['./comment-info.component.css']
})
export class CommentInfoComponent {
  @Input() commentInfo: CommentInfo;
  @Output() deleteCommentEmitter = new EventEmitter<string>();

  isAuthor(commentInfo: CommentInfo) {
    return commentInfo._acl.creator === localStorage.getItem('userId');
  }

  deleteComment(id: string) {
    this.deleteCommentEmitter.emit(id);
  }
}
