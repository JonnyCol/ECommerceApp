import { Component, OnInit } from '@angular/core';
//import { OktaAuthService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { OktaAuthStateService } from '@okta/okta-angular';
import * as OktaSignIn from '@okta/okta-signin-widget';


import ecommConfig from '../../config/ecomm-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  oktaSignin: any;

  constructor(private oktaAuthService: OktaAuthStateService, private oktaAuth: OktaAuth) {
    this.oktaSignin = new OktaSignIn({
      logo: 'assets/images/logo.png',
      features:{
        registration: true
      },
      baseUrl: ecommConfig.oidc.issuer.split('/oauth2')[0],
      clientId: ecommConfig.oidc.clientId,
      redirectUri: ecommConfig.oidc.redirectUri,
      authParams: {
        pkce: true,
        issuer: ecommConfig.oidc.issuer,
        scopes: ecommConfig.oidc.scopes
      }
    });
   }

  ngOnInit(): void {
    this.oktaSignin.remove();

    this.oktaSignin.renderEl({
      // same name as div tag id in login.component
      el: '#okta-sign-in-widget'
      },
      (response:any) => {
        if(response.status === 'SUCCESS'){
          this.oktaAuth.signInWithRedirect();
        }
      },
      (error: any) => {
        throw error;
      } 
    );
  }

}
