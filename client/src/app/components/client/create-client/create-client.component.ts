import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from '../../../models/client/client';
import { ClientService } from '../../../services/client/client.service';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrl: './create-client.component.css'
})
export class CreateClientComponent {
  clientForm: FormGroup;
  title = 'Create Client';
  id: string | null;

  constructor(
    private clienteService: ClientService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute,
  ){
    this.clientForm = this.fb.group({
      Name:['', [Validators.required, Validators.minLength(3),Validators.maxLength(100),]],
      Phone: [ '',[Validators.required,Validators.minLength(8),Validators.maxLength(100),]]
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  isLoggedIn = false;

  ngOnInit(): void {
    this.edit();
  }

  addClient() {
    const CLIENT: Client = {
      Name: this.clientForm.get('Name')?.value,
      Phone: this.clientForm.get('Phone')?.value
    };

    if (this.id !== null) {
      this.clienteService.updateClient(this.id, CLIENT).subscribe(
        (data) => {
          console.log(data.id);
          console.log(data);
          this.toastr.success('Client Updated Successfully', 'Success');
          this.router.navigate(['/client']);
        },
        (error) => {
          this.toastr.error('Denied Access!', 'Error');
          this.router.navigate(['login']);
        }
      );
    } else {
      console.log(CLIENT);
      this.clienteService.saveClient(CLIENT).subscribe(
        (data) => {
          this.toastr.success('Client Saved Successfully', 'Success');
          this.router.navigate(['/client']);
        },
        (error) => {
          this.toastr.error('Denied Access!', 'Error');
          this.router.navigate(['login']);
        }
      );
    }
  }

  edit() {
    if (this.id !== null) {
      this.title = 'Edit Client';
      this.clienteService.getClientId(this.id).subscribe(
        (data) => {
          console.log(data);
          this.clientForm.patchValue({
            Name: data.Name,
            Phone: data.Phone,
          });
        },
        (error) => {
          this.clientForm.reset();
          this.router.navigate(['login']);
        }
      );
    }
  }

}
