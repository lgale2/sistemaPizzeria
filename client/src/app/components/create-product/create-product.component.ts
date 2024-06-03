// Importa el operador "+" para convertir una cadena en número
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../models/product';
import { ProductTsService } from '../../services/product/product.ts.service';
import { StorageService } from '../../services/user/storage.service';
import { error } from 'console';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {
  productForm: FormGroup;
  title = 'Create product';
  id: string | null; 

  constructor(
    private productService: ProductTsService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute,
    private storageService: StorageService,
  ){
    this.productForm = this.fb.group({
      Name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      Price: ['', Validators.required],
      Unit: ['', Validators.required],
      Tax: ['', Validators.required]
    });
    
    this.id = this.aRouter.snapshot.paramMap.get('id');

   
  }

  isLoggedIn = false;

  ngOnInit(): void {
   

    this.edit()
  }

  addProduct() {
    const PRODUCT: Product = {
      Name: this.productForm.get('Name')?.value,
      Price: this.productForm.get('Price')?.value,
      Unit: this.productForm.get('Unit')?.value,
      Tax: this.productForm.get('Tax')?.value
    }

    if(this.id !== null){
      this.productService.updateProduct(this.id, PRODUCT).subscribe(
        data => {
          console.log(data.id)
          console.log(data);
          this.toastr.success("Product Updated Successfully", "Success")
          this.router.navigate(['/']);
        }, (error) => {
          console.log(error);
          this.productForm.reset()
        }
      )
    }
    else {
      console.log(PRODUCT);
      this.productService.saveProduct( PRODUCT).subscribe(
        data => {
          this.toastr.success("Product Saved Successfully", "Success")
          this.router.navigate(['/']);
        },
        (error) => {
          this.toastr.error("Denied Access!", "Error");
          this.router.navigate(['login']);
        }
      )
    }
  }

  edit() {
    if(this.id !== null){
      this.title = "Edit Product";
      this.productService.getProductId(this.id).subscribe(
        (data) => {
          console.log(data);
          this.productForm.patchValue({
            Name: data.Name,
            Price: data.Price,
            Unit: data.Unit,
            Tax:  data.Tax
          });
        }, 
        error => {
          this.toastr.error("Denied Access!", "Error");
          this.router.navigate(['login']);
        }
      );
    }
  }
}
