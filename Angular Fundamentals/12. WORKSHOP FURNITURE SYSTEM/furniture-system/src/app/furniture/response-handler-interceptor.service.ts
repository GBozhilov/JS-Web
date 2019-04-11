import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {tap, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResponseHandlerInterceptorService implements HttpInterceptor {

  constructor(public toastr: ToastrService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(tap((success) => {
      if (success instanceof HttpResponse) {
        const url = success.url;
        console.log(success);

        if (url.endsWith('login') ||
          url.endsWith('register') ||
          url.endsWith('create') ||
          url.includes('delete')
        ) {
          const message = success.body.message;
          this.toastr.success(message);
        }
      }
    }), catchError(err => {
      const message = err.error.message;
      this.toastr.error(message, 'Error');
      throw err;
    }));
  }
}
