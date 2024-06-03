import { Component } from '@angular/core';
import { AuthTsService } from '../../services/user/auth.ts.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css',
})
export class RegisterUserComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthTsService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute
  ) {
    this.registerForm = this.fb.group({
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

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  registerUser() {
    const USER: User = {
      UserName: this.registerForm.get('UserName')?.value,
      Password: this.registerForm.get('Password')?.value,
    };
    this.authService.register(USER.UserName, USER.Password).subscribe(
      (data) => {
        this.toastr.success('Registered User!', 'Successful');
        this.router.navigate(['login']);
      },
      (error) => {
        if (error.status === 400) {
          this.toastr.error('Existing user', 'Error');
        } else {
          this.toastr.error('An error occurred', 'Error');
        }
        this.registerForm.reset();
      }
    );
  }
}
