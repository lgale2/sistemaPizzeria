import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { ProductTsService } from '../../services/product/product.ts.service';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../../services/user/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css',
})
export class ListProductComponent {
  listProducts: Product[] = [];

  constructor(
    private productService: ProductTsService,
    private toastr: ToastrService,
    private storageService: StorageService,
    private router: Router
  ) {}
  isLoggedIn = false;
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.getProducts();
    }
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      (data) => {
        console.log(data);
        this.storageService.getUser();
        this.listProducts = data;
      },
      (error) => {
        this.toastr.error('Denied Access!', 'Error');
        this.router.navigate(['login']);
        console.log(error);
      }
    );
  }

  deleteProduct(Code: any) {
    this.productService.deleteProduct(Code).subscribe(
      (data) => {
        this.toastr.success('The product was successfully removed', 'Success');
        this.getProducts();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
