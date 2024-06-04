import { Component } from '@angular/core';
import { Client } from '../../../models/client/client';
import { ClientService } from '../../../services/client/client.service';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../../../services/user/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrl: './list-client.component.css',
})
export class ListClientComponent {
  listClients: Client[] = [];

  constructor(
    private clientService: ClientService,
    private toastr: ToastrService,
    private storageService: StorageService,
    private router: Router
  ) {}
  isLoggedIn = false;

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.getClients();
    }
  }

  getClients() {
    this.clientService.getClients().subscribe(
      (data) => {
        console.log(data);
        this.storageService.getUser();
        this.listClients = data;
      },
      (error) => {
        this.toastr.error('Denied Access!', 'Error');
        this.router.navigate(['login']);
        console.log(error);
      }
    );
  }

  deleteClient(Code: any) {
    this.clientService.deleteClient(Code).subscribe(
      (data) => {
        this.toastr.success('The client was successfully removed', 'Success');
        this.getClients();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
