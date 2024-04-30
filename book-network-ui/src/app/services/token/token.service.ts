import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  set token(token: string) {
    console.log('Setting token:', token);
    localStorage.setItem('token', token);
  }
  
  get token() {
    const token = localStorage.getItem('token');
    return token as string;
  }

  isTokenNotValid(){
    return !this.isTokenValid();
  }

  private isTokenValid(){
    const token = this.token;
    if(!token){
      return false;
    }

    const jwtHelper =  new JwtHelperService();
    const isTokenExipired =  jwtHelper.isTokenExpired(token);
    if(isTokenExipired){
       localStorage.clear();
       return false;
    }
    return true;
  }
}
