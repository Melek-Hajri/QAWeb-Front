import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth-services/auth-service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {

  signupForm: FormGroup = this.fb.group({
    name:['', Validators.required],
    email:['', Validators.required],
    password:['', Validators.required],
    confirmPassword:['', Validators.required],
  });

  constructor(
    private service: AuthService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router 
  ) { }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  ngOnInit() {
    this.signupForm = this.fb.group({
      name:['', Validators.required],
      email:['', Validators.required],
      password:['', Validators.required],
      confirmPassword:['', Validators.required],
    }, { validator: this.confirmationValidator })
  }

  private confirmationValidator(fg: FormGroup) {
    const password = fg.get('password')?.value;
    const confirmPassword = fg.get('confirmPassword')?.value;
    if(password != confirmPassword) {
      fg.get('confirmPassword')?.setErrors({passwordMismatch: true});
    } else {
      fg.get('confirmPassword')?.setErrors(null);
    }
  }

  signup() {
    console.log(this.signupForm?.value);
    this.service.signup(this.signupForm.value).subscribe((response) => {
      console.log(response);
      if (response.id != null) {
        this.snackBar.open(
          "You're registered successfully!",
          'close',
          { duration: 5000 }
        );
        this.router.navigateByUrl('/login');
      } else {
        this.snackBar.open(response.message, 'close', { duration: 5000 })
      }
    }, (error: any) => {
      this.snackBar.open("Registration failed, please try again", 'close', { duration: 5000 });
    })
  }

}
