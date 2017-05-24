import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { tokenNotExpired } from 'angular2-jwt';
//import { notifySuccess, notifyError } from './Notification';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { AuthapiService } from './authapi.service';
import { IAuthtoken } from '../../models/authToken';


@Injectable()
export class AuthService {
  // Create Auth0 web auth instance
  // @TODO: Update AUTH_CONFIG and remove .example extension in src/app/auth/auth0-variables.ts.example

  // Create a stream of logged in status to communicate throughout app
  loggedIn: boolean;
  loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);
  authToken : IAuthtoken;

  constructor(private router: Router, private _authapiService: AuthapiService) {
    // If authenticated, set local profile property and update login status subject
    if (this.authenticated) {
      this.setLoggedIn(true);
    }
  }

  setLoggedIn(value: boolean) {
    // Update login status subject
    this.loggedIn$.next(value);
    this.loggedIn = value;
  }

  login(username, password) {
    //debugger;
    //perform the login function and save the token and profile afterwards.
    this._authapiService.performLogin(username, password)
      .subscribe(
        authToken => {
          this.authToken = authToken;
          console.log(authToken);
          if(authToken.status === 'error') {
            console.log('failed authentication...');
          }
          else {
          this._setSession(authToken);
          this.router.navigate(['/home']);
          }
        },
        error => {
          console.log(<any>error);
        }
      )
  }

  private _getProfile() {
    // Use access token to retrieve user's profile and set session
    const profile = localStorage.getItem('profile')
    return profile ? JSON.parse(localStorage.profile) : {}
  }

  private _setSession(result) {
    // Save session data and update login status subject
    localStorage.setItem('access_token', result.token);
    localStorage.setItem('profile', JSON.stringify(result.profile));
    this.setLoggedIn(true);
  }

  logout() {
    // Remove tokens and profile and update login status subject
    localStorage.removeItem('access_token');
    localStorage.removeItem('profile');
    this.router.navigate(['/']);
    this.setLoggedIn(false);
  }

  get authenticated() {
    // Check if there's an unexpired access token
    return tokenNotExpired('access_token');
  }

}