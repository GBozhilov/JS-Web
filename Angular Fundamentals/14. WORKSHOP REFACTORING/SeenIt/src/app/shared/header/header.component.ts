import {Component, DoCheck} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements DoCheck {
  username = '';
  isLoggedIn: boolean;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngDoCheck() {
    this.username = localStorage.getItem('username');
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout()
      .subscribe(() => {
        localStorage.clear();
        this.router.navigate(['/login']);
      });
  }
}
