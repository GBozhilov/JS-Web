import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  @ViewChild('form')
  htmlForm: NgForm;
  phoneCodes: Array<string> = ['+359', '+971', '+972', '+198', '+701'];
  model = {};

  constructor() {
  }

  ngOnInit() {
  }

  register(form) {
    console.log(form);
  }
}
