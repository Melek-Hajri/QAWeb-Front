import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth-services/auth-service/auth.service';


import {ChangeDetectionStrategy, signal} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  loginForm: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private service: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    this.service.login(
      this.loginForm.get(['email'])!.value,
      this.loginForm.get(['password'])!.value
    ).subscribe({
      next: (response: any) => {
        console.log(response);
        this.router.navigateByUrl("user/dashboard");
      },
      error: (err: any) => {
        this.snackBar.open('Bad credentials', 'close', {
          duration: 5000,
          panelClass: 'error-snackbar'
        });
      }
    });
  }
}
