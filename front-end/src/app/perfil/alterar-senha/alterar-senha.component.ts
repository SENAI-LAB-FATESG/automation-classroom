import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormControl, SelectMultipleControlValueAccessor } from '@angular/forms';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { Router } from '@angular/router';
import { ErrorMsgComponent } from 'src/app/compartilhado/error-msg/error-msg.component';
import { MustMatch } from '../usuario/must-match';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthenticationService } from 'src/app/Services';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: []
})
export class AlterarSenhaComponent {
  error: string;

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService, private router: Router, private authenticationService: AuthenticationService) { }

  @ViewChild(ErrorMsgComponent) errorMsgComponent: ErrorMsgComponent;

  validGroup = this.formBuilder.group({
    senhaAtualControl: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]),
    senhaControl: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]),
    confirmarSenhaControl: new FormControl('', [
      Validators.required])
  },
    {
      validator: MustMatch('senhaControl', 'confirmarSenhaControl') //compara os campos e retorna true se forem iguais
    });


  onSubmit() {
    // para aqui se houver algum campo inválido
    if (this.validGroup.invalid) {
      this.error = 'Preencha corretamente os campos!';
      return;
    }

    var usuarioJSON = JSON.parse(localStorage.getItem("currentUser")); //pega as informações do usuario logado(menos a senha)

    this.checaSenha(usuarioJSON.user.id); //usa o id do usuario para pesquisar a senha e verificar se está correta
  }

  checaSenha(id: string) {
    this.usuarioService.getUsuario(id)
      .subscribe(
        (usuario: Usuario) => { 
          if (usuario.password != this.validGroup.get("senhaAtualControl").value) {
            this.error = "Senha incorreta!";
          }
          else {
            this.trocaSenha(this.validGroup.get('senhaControl').value);
          }
        },
        () => { this.error = "Falha ao verificar a senha" }
      )
  }

  trocaSenha(senha: string) {
    this.usuarioService.trocaSenhaUsuario(senha)
      .subscribe(
        () => { this.router.navigateByUrl("/senha-sucesso"); }, //redireciona para /senha-sucesso caso tenha trocado a senha com sucesso
        () => {
          this.error = 'Falha ao alterar a senha.';
        });
  }

  get f() { return this.validGroup.controls; }

  get senhaAtualControl() {
    return this.validGroup.get('senhaAtualControl');
  }

  get senhaControl() {
    return this.validGroup.get('senhaControl');
  }

  get confirmarSenhaControl() {
    return this.validGroup.get('confirmarSenhaControl');
  }
}
