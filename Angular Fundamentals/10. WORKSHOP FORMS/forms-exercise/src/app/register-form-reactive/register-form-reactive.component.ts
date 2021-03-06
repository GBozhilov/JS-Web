import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register-form-reactive',
  templateUrl: './register-form-reactive.component.html',
  styleUrls: ['./register-form-reactive.component.css']
})
export class RegisterFormReactiveComponent implements OnInit {
  form: FormGroup;
  phoneCodes: Array<string> = ['+359', '+971', '+972', '+198', '+701'];

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      fullName: ['', [Validators.required, Validators.pattern(/[A-Z][a-z]+\s[A-Z][a-z]+/)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/\d{9}/)]],
      jobTitle: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,16}$/)]],
      confirmPassword: ['', Validators.required],
    });
  }

  register() {
    console.log(this.form);
  }

  get f() {
    return this.form.controls;
  }
}
