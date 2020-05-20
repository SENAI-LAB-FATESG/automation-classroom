import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorMsgComponent } from 'src/app/compartilhado/error-msg/error-msg.component';
import { AuthenticationService } from 'src/app/Services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent {

  loading = false;
  submitted = false;
  returnUrl: string;
  error: string;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // redireciona para /contato se já estiver logado
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/contato']);

      // pega a url de retorno do parametro ou coloca para /contato por default
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/contato';
    }
  }

  @ViewChild(ErrorMsgComponent) errorMsgComponent: ErrorMsgComponent;

  validGroup = this.formBuilder.group({
    emailControl: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]), //regex de validação de e-mail
    senhaControl: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]) //regex de validação de senha (1 maiuscula, 1 minuscula, minimo 8 letras e um número)
  });


  get emailControl() {
    return this.validGroup.get('emailControl');
  }

  get senhaControl() {
    return this.validGroup.get('senhaControl');
  }


  // conveniencia para retornar os grupos
  get f() { return this.validGroup.controls; }

  onSubmit() {
    this.submitted = true;

    // para aqui se houver algum campo inválido
    if (this.validGroup.invalid) {
      this.error = 'Preencha corretamente os campos!';
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.emailControl.value, this.f.senhaControl.value)
      .pipe(first())
      .subscribe(
        data => {
          this.error = null;
          this.router.navigate(['/login-sucesso']); //redireciona para /login-sucesso se for autorizado com sucesso
        },
        error => {
          this.error = error; //mostra o erro na tela
          this.loading = false;
        });
  }
}
