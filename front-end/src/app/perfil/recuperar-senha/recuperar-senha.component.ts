import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { Router } from '@angular/router';
import { ErrorMsgComponent } from 'src/app/compartilhado/error-msg/error-msg.component';
import { MustMatch } from '../usuario/must-match';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: []
})
export class RecuperarSenhaComponent {
  error: string;

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService, private router: Router) { }

  @ViewChild(ErrorMsgComponent) errorMsgComponent: ErrorMsgComponent;

  validGroup = this.formBuilder.group({
    emailControl: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]) //valida e-mail
  });

  onSubmit() {
    // stop here if form is invalid
    if (this.validGroup.invalid) {
      this.error = 'Preencha corretamente os campos!';
      return;
    }
    
    this.recuperarSenha(this.validGroup.get('emailControl').value);
  }

  recuperarSenha(email: string) {
    this.usuarioService.recuperarSenha(email)
      .subscribe(
        () => { this.router.navigateByUrl("/home"); },//volta à tela de login caso o e-mail existir no banco
        () => {
          this.error = 'Falha ao alterar a senha.';
        });
  }

  get f() { return this.validGroup.controls; }

  get emailControl() {
    return this.validGroup.get('emailControl');
  }
}
