import { Component } from '@angular/core';
import { AuthTsService } from '../../services/user/auth.ts.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  showNavbar = false;
  constructor(
    public authService: AuthTsService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      this.showNavbar =
        this.router.url !== '/register' && this.router.url !== '/login';
    });
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.toastr.success('Successfully closed the session', 'Success');
      this.router.navigate(['/login']);
    });
  }
}
