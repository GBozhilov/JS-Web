/* tslint:disable:no-string-literal */
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {PostInfo} from '../../shared/models/Post-Info';
import {PostService} from '../services/post.service';

@Injectable({
  providedIn: 'root'
})
export class SinglePostResolver implements Resolve<PostInfo> {
  constructor(private postService: PostService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PostInfo> {
    const id = route.params['id'];
    return this.postService.getById(id);
  }
}
