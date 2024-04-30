import { Component } from '@angular/core';
import { AuthenticationRequest, AuthenticationResponse } from '../../services/models';
import { AuthenticationService } from '../../services/services';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authRequest: AuthenticationRequest = { email: '', password: '' };
  errorMsg: Array<string> = [];


  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService
  ) {
  }


  login() {
    this.errorMsg = [];
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: (res: any) => {

        let parsedRes;
        try {
          parsedRes = JSON.parse(res);
        } catch (e) {
          parsedRes = res;
        }
        console.log("jwt ", res['token'] as string);
        const token = parsedRes.token || parsedRes['token'];
        if (token) {
          this.tokenService.token = token;
          this.router.navigate(['books']);
        } else {
          console.error("Token is undefined in response:", parsedRes);
        }
      },
      error: (err) => {
        console.log(err);
        let passedError = JSON.parse(err.error);
        if (passedError.validationErrors) {
          this.errorMsg = passedError.validationErrors;
        } else {
          this.errorMsg.push(passedError.error);
        }
      }
    });
  }
  register(): void {
    this.router.navigate(['register'])
  }
}
