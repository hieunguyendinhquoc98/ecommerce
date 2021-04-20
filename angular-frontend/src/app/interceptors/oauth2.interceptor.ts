import { OktaAuthService } from '@okta/okta-angular';
import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable, from } from 'rxjs';

@Injectable()
export class Oauth2Interceptor implements HttpInterceptor {

    constructor(private oktaAuth: OktaAuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.handleAccess(request, next));
      }

    private async handleAccess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
        const allowedOrigins = ['http://localhost:8080/api/v1/orders'];
        if (allowedOrigins.some(url => request.urlWithParams.includes(url))) {
            const accessToken = await this.oktaAuth.getAccessToken();
            request = request.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + accessToken
                },
            });
        }
        return next.handle(request).toPromise();
    }
}
