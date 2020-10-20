import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authorized',
  templateUrl: './authorized.component.html',
  styleUrls: ['./authorized.component.scss'],
})
export class AuthorizedComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.authService.token()
      .subscribe(token => {
        if (token && token.length > 0) {
          this.router.navigate(['home']);
        }
        else {
          this.router.navigate(['/login']);
        }
      });
  }

}
