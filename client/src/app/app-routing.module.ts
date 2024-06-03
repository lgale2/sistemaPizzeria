import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { CreateProductComponent } from './components/create-product/create-product.component';

const routes: Routes = [
  {path: 'register', component: RegisterUserComponent },
  {path: 'login', component: LoginUserComponent },
  {path: '', component: ListProductComponent },
  {path: 'product-create', component: CreateProductComponent},
  {path: 'product-edit/:id', component: CreateProductComponent},
  { path: '**', redirectTo: 'login', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
