import { Component } from '@angular/core';
import { RegistrationRequest } from '../../services/models';
import { AuthenticationService } from '../../services/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerRequest: RegistrationRequest = { email: '' , firstname: '' , lastname:'' , password: ''};
  errorMsg: Array<string> = [] ;

  constructor(
   private router: Router,
   private authService: AuthenticationService 
  ) {}

  login() {
    this.router.navigate(['login']);
  }

  register() {
    this.errorMsg = [];
    this.authService.register({
      body: this.registerRequest
    }).subscribe({
      next: () => {
        this.router.navigate(['activate-account'])
      },
      error: (err) => {
        let passedError = JSON.parse(err.error)
        this.errorMsg = passedError.validationErrors
      }
    })
  }
}
