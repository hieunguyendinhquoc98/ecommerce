import { Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-login-status',
    templateUrl: './login-status.component.html',
    styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

    isAuthenticated: boolean = false;
    userFullName: string;

    storage: Storage = sessionStorage;

    constructor(private oktaAuthService: OktaAuthService, public router: Router) {
        this.oktaAuthService.$authenticationState.subscribe(
            (result) => {
                this.isAuthenticated = result;
                this.getUserDetails();
            }
        )
    }

    async ngOnInit() {
        this.isAuthenticated = await this.oktaAuthService.isAuthenticated();
    }
    getUserDetails() {
        if (this.isAuthenticated) {
            this.oktaAuthService.getUser().then(
                res => {
                    this.userFullName = res.name;

                    const theEmail = res.email;
                    this.storage.setItem('userEmail', JSON.stringify(theEmail));
                }
            );
        }
    }

    async logout(){
        await this.oktaAuthService.signOut();
        this.router.navigateByUrl('/');
    }

}
