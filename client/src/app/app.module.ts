import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { HttpInterceptorProviders } from './_helpers/http.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './app/navbar/navbar.component';
import { CreateClientComponent } from './components/client/create-client/create-client.component';
import { ListClientComponent } from './components/client/list-client/list-client.component';
import { ListAddressComponent } from './components/address/list-address/list-address.component';
import { CreateAddressComponent } from './components/address/create-address/create-address.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterUserComponent,
    LoginUserComponent,
    CreateProductComponent,
    ListProductComponent,
    NavbarComponent,
    CreateClientComponent,
    ListClientComponent,
    ListAddressComponent,
    CreateAddressComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
  provideClientHydration(),
  HttpInterceptorProviders,
  provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
