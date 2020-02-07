import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router) {
    this.auth.isAuthenticated().subscribe(authState => {
      if (authState) {
        this.router.navigate(['']);
      }
    });
  }

  ngOnInit() {
  }

  async loginWithGoogle() {
    if (await this.auth.googleSignin()) {
      this.router.navigate(['']);
    }
  }

  async loginWithEmail(email: string, passwd: string) {
    if (await this.auth.emailSignin(email, passwd)) {
      this.router.navigate(['']);
    }
  }
}
