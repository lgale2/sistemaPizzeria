import { Component } from '@angular/core';
import { Address } from '../../../models/address/address';
import { AddressService } from '../../../services/address/address.service';
import { ClientService } from '../../../services/client/client.service';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../../../services/user/storage.service';
import { Router } from '@angular/router';
import { Client } from '../../../models/client/client';

@Component({
  selector: 'app-list-address',
  templateUrl: './list-address.component.html',
  styleUrl: './list-address.component.css'
})
export class ListAddressComponent {
  listAddress: Address[] = [];
  clients: Client[] = [];

  constructor(
    private addressService: AddressService,
    private clientService: ClientService,
    private toastr: ToastrService,
    private storageService: StorageService,
    private router: Router
  ) {}
  isLoggedIn = false;

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.getAddress();

     this.clientService.getClients().subscribe(data=>{
        this.clients = data;
     })
    
    }
  }

  getAddress() {
    this.addressService.getAddress().subscribe(
      (data) => {
        console.log(data);
        this.storageService.getUser();
        this.listAddress = data;
      },
      (error) => {
        this.toastr.error('Denied Access!', 'Error');
        this.router.navigate(['login']);
        console.log(error);
      }
    );
  }

  deleteAddress(Code: any) {
    this.addressService.deleteAddress(Code).subscribe(
      (data) => {
        this.toastr.success('The address was successfully removed', 'Success');
        this.getAddress();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  GetClientName(CodeClient: number){
    const client = this.clients.find(n => n.Code === CodeClient)
    return client ? client.Name: 'Unknown Client';
  }



}
