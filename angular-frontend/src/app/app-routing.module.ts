import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { MembersPageComponent } from './components/members-page/members-page.component';
import { LoginComponent } from './components/login/login.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';


export function onAuthRequired(oktaAuth, injector) {
    const router = injector.get(Router);

    // Redirect the user to your custom login page, for protected page
    router.navigate(['/login']);
  }

const routes: Routes = [
    //for Okta
    {path: 'login/callback', component: OktaCallbackComponent},
    {path: 'login', component: LoginComponent},
    {path:
        'order-history',
        component: OrderHistoryComponent,
        canActivate: [OktaAuthGuard],
        data: {
            onAuthRequired
        }
    },

    //for common routings
    {path: 'search/:keyword', component: ProductListComponent},
    {path: 'shopping-details', component: CartDetailsComponent},
    {path:'checkout', component: CheckoutComponent},
    {path: 'category/:id', component: ProductListComponent},
    {path: 'category', component: ProductListComponent},
    {path: 'products', component: ProductListComponent},
    {path: 'products/:id', component: ProductDetailsComponent},
    {path: '', redirectTo: '/products', pathMatch: 'full'},
    {path: '**', redirectTo: '/products', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
