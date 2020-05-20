import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/Services/usuario.service';

@Component({
  selector: 'app-confirma-email',
  templateUrl: './confirma-email.component.html',
  styleUrls: []
})
export class ConfirmaEmailComponent implements OnInit {
  token: string;
  error: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private usuarioService: UsuarioService) {
                
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
  });
   }

  ngOnInit(): void {
    if (this.token.length > 0)
      this.confirmaEmail(this.token);

    setTimeout(() => this.router.navigateByUrl("/home"), 5000); //após 5 segundos retorna para a página de login
  }

  confirmaEmail(token: string) {
    this.usuarioService.confirmaEmail(token)
      .subscribe(
        () => { this.router.navigateByUrl("/home"); },
        () => {
          this.error = 'Falha ao adicionar o usuario.';
        });
  }

}
