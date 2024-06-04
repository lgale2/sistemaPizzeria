import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { CreateClientComponent } from './components/client/create-client/create-client.component';
import { ListClientComponent } from './components/client/list-client/list-client.component';
import { ListAddressComponent } from './components/address/list-address/list-address.component';
import { CreateAddressComponent } from './components/address/create-address/create-address.component';

const routes: Routes = [
  {path: 'register', component: RegisterUserComponent },
  {path: 'login', component: LoginUserComponent },
  {path: '', component: ListProductComponent },
  {path: 'product-create', component: CreateProductComponent},
  {path: 'product-edit/:id', component: CreateProductComponent},
  {path: 'client', component: ListClientComponent },
  {path: 'client-create', component: CreateClientComponent},
  {path: 'client-edit/:id', component: CreateClientComponent},
  {path: 'address', component: ListAddressComponent },
  {path: 'address-create', component: CreateAddressComponent},
  {path: 'address-edit/:id', component: CreateAddressComponent},
  { path: '**', redirectTo: 'login', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
