import { Component, OnInit } from '@angular/core';
import { OktaAuth } from '@okta/okta-auth-js';
import { OktaAuthStateService } from '@okta/okta-angular';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false;
  userFullName: string = "";

  storage: Storage = sessionStorage;

  constructor(private oktaAuth: OktaAuth, private oktaAuthService: OktaAuthStateService) { }

  ngOnInit(): void {
    // Subscribe to authentication state changes
    this.oktaAuthService.authState$.subscribe(
      result => {
        this.isAuthenticated = result.isAuthenticated!;
        this.getUserDetails();
      }
    );
    
  }

  getUserDetails() {
    if(this.isAuthenticated){
      // fetch the logged in user details(user's claim)
      //
      // user full name is exposed as property name
      this.oktaAuth.getUser().then(
        res => {
          this.userFullName = res.name!;

          // retrieve the user's email for authentication response
          const userEmail = res.email;

          // store the email in the browser storage
          this.storage.setItem("userEmail", JSON.stringify(userEmail));
        }
      );
    }
  }
  
  logout(){
    // terminates the session with Okta and removes current tokens
    this.oktaAuth.signOut();
  }

}
