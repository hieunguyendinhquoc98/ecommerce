import { ProductService } from './services/product.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductCategoryComponent } from './components/product-category/product-category.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import {
    OKTA_CONFIG,
    OktaAuthModule,
    OktaCallbackComponent,
    OktaAuthGuard
    } from '@okta/okta-angular';

import myAppConfig from './config/my-app-config';
import { AuthRoutingModule } from './auth-routing.module';
import { MembersPageComponent } from './components/members-page/members-page.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { Oauth2Interceptor } from './interceptors/oauth2.interceptor';

const oktaConfig = {
    issuer: myAppConfig.oidc.issuer,
    redirectUri: myAppConfig.oidc.redirectUri,
    clientId: myAppConfig.oidc.clientId,
    pkce: true
}
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent,
    MembersPageComponent,
    OrderHistoryComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    OktaAuthModule,
    AuthRoutingModule
  ],
  providers: [ProductService, { provide: OKTA_CONFIG, useValue: oktaConfig },
                {provide: HTTP_INTERCEPTORS, useClass: Oauth2Interceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
