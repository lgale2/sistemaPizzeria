import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from '../../../models/address/address';
import { AddressService } from '../../../services/address/address.service';
import { StorageService } from '../../../services/user/storage.service';
import { Client } from '../../../models/client/client';
import { ClientService } from '../../../services/client/client.service';


@Component({
  selector: 'app-create-address',
  templateUrl: './create-address.component.html',
  styleUrl: './create-address.component.css'
})
export class CreateAddressComponent {
  clients: Client[] = [];
  addressForm: FormGroup;
  title = 'Create address';
  id: string | null;

  constructor(
    private addressService: AddressService,
    private clientService: ClientService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute,
    private storageService: StorageService
  ) {
    this.addressForm = this.fb.group({
      Address: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      Client: [''],
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  isLoggedIn = false;

  ngOnInit(): void {
    this.edit();
    this.clientService.getClients().subscribe(data=>{
      this.clients = data;
   })
  }

  addAddress() {
    const ADDRESS: Address = {
      Address: this.addressForm.get('Address')?.value,
      Client: this.addressForm.get('Client')?.value
    };

    if (this.id !== null) {
      this.addressService.updateAddress(this.id, ADDRESS).subscribe(
        (data) => {
          console.log(data.id);
          console.log(data);
          this.toastr.success('Address Updated Successfully', 'Success');
          this.router.navigate(['/address']);
        },
        (error) => {
          console.log(error);
          this.addressForm.reset();
        }
      );
    } else {
      console.log(ADDRESS);
      this.addressService.saveAddress(ADDRESS).subscribe(
        (data) => {
          this.toastr.success('Address Saved Successfully', 'Success');
          this.router.navigate(['/address']);
        },
        (error) => {
          console.log(error)
          this.toastr.error('Denied Access!', 'Error');
          this.router.navigate(['login']);
        }
      );
    }
  }

  edit() {
    if(this.id !== null){
      this.title = "Edit Address";
      this.addressService.getAddressId(this.id).subscribe(
        (data) => {
          console.log(data);
          this.addressForm.patchValue({
            Address: data.Address,
            Client: data.Client,
          });
        }, 
        error => {
          this.router.navigate(['login']);
        }
      );
    }
  }

  GetClientName(CodeClient: number){
    const client = this.clients.find(n => n.Code === CodeClient)
    return client ? client.Name: 'Unknown Client';
  }


}
