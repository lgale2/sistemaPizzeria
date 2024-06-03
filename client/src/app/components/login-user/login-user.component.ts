import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthTsService } from '../../services/user/auth.ts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../models/user';
import { StorageService } from '../../services/user/storage.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.css',
})
export class LoginUserComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthTsService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute,
    private storageService: StorageService
  ) {
    this.loginForm = this.fb.group({
      UserName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      Password: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
    });
  }
  isLoggedIn = false;
  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
    }
  }

  loginUser() {
    const LOGIN: User = {
      UserName: this.loginForm.get('UserName')?.value,
      Password: this.loginForm.get('Password')?.value,
    };
    this.authService.login(LOGIN.UserName, LOGIN.Password).subscribe(
      (data) => {
        this.storageService.saveUser(data);
        this.toastr.success('Logged-in user', 'Successful');
        this.router.navigate(['/']);
      },
      (error) => {
        if (error.status === 401) {
          this.toastr.error('Incorrect password', 'Error');
        } else {
          this.toastr.error('An error occurred', 'Error');
        }
        this.loginForm.reset();
      }
    );
  }
}
