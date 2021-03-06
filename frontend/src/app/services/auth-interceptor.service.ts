import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private oktaAuthService: OktaAuthStateService, private oktaAuth: OktaAuth) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handleAccess(request, next));
      
  }
  private async handleAccess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
    // Only add an access token for secured endpoints
    const securedEndpoints = [environment.jonnycolShopApiUrl + "orders"];

    if(securedEndpoints.some(url => request.urlWithParams.includes(url))){
      // if it does match, then get access token
      const accessToken = await this.oktaAuth.getAccessToken();

      // clone request and add new header with access token
      request = request.clone({
        setHeaders: {
          Authorization: "Bearer " + accessToken
        }
      });
    }
    return next.handle(request).toPromise();
  }
  
}
