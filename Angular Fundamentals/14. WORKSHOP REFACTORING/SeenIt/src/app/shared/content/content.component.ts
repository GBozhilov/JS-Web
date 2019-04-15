import {Component, DoCheck, OnInit} from '@angular/core';

import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, DoCheck {
  isLoggedIn: boolean;

  constructor(private authService: AuthService) {}

  ngDoCheck(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  ngOnInit(): void {
  }
}
