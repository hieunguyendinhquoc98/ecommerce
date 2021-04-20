import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import * as OktaSignIn from '@okta/okta-signin-widget';
import myAppConfig from '../../config/my-app-config';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    authService: any;
    oktaSignin: any = new OktaSignIn({
        el: '#okta-sign-in-widget',
        logo: 'assets/images/logo.png',
        features: {
            registration: true
        },
        baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0],
        clientId: myAppConfig.oidc.clientId,
        redirectUri: myAppConfig.oidc.redirectUri,
        authParams: {
            pkce: true
        },
        scopes: myAppConfig.oidc.scopes
    });

    constructor(private oktaAuthService: OktaAuthService, router: Router) {
        this.authService = oktaAuthService
     }
    ngOnInit(): void {

        this.oktaSignin.remove();

        this.oktaSignin.showSignInAndRedirect().catch( err => {
            throw(err);
        });
    }

}
