import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../codebase/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _authService: AuthService) { }

  ngOnInit() {
  }

  private username : string = 'ope.akinnawo@gmail.com';
  private password : string = 'password12';

  private login(): void {
    this._authService.login(this.username, this.password);
  }
}
