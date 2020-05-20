import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: []
})
export class MenuComponent {
  currentUser: any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authenticationService.logout(); //executa log out e redireciona para a tela de login
    this.router.navigate(['/home']);
  }
}
