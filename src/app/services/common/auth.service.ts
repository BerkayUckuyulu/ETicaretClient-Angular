import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper: JwtHelperService) { }

  identityCheck() {
    const token: string = localStorage.getItem("accessToken");
    let isExpired: Boolean = true;
    try {
      isExpired = this.jwtHelper.isTokenExpired(token);

    } catch {
      isExpired = true
    }

    _isAuthenticated = !isExpired;
  }

  get _isAuthenticated(): boolean {
    return _isAuthenticated;
  }

}

export let _isAuthenticated: boolean;
