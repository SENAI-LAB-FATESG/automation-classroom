import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { JwtInterceptor, ErrorInterceptor } from './Helper';
import { MenuComponent } from './navegacao/menu/menu.component';
import { SobreComponent } from './instituicao/sobre/sobre.component';
import { ContatoComponent } from './instituicao/contato/contato.component';
import { UsuarioComponent } from './perfil/usuario/usuario.component';
import { AlterarSenhaComponent } from './perfil/alterar-senha/alterar-senha.component';
import { HomeComponent } from './navegacao/home/home.component';
import { rootRouterConfig } from './app.routes';
import { ErrorMsgComponent } from './compartilhado/error-msg/error-msg.component';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { ConfirmaEmailComponent } from './perfil/confirma-email/confirma-email.component';
import { SenhaSucessoComponent } from './perfil/senha-sucesso/senha-sucesso.component';
import { RecuperarSenhaComponent } from './perfil/recuperar-senha/recuperar-senha.component';
import { LoginSucessoComponent } from './perfil/login-sucesso/login-sucesso.component';
import {WebcamModule} from 'ngx-webcam';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { TelaAmbientesComponent } from './ambientes/tela-ambientes/tela-ambientes.component';
import { TelaAmbienteControleComponent } from './ambientes/tela-ambiente-controle/tela-ambiente-controle.component'

const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    SobreComponent,
    ContatoComponent,
    UsuarioComponent,
    AlterarSenhaComponent,
    HomeComponent,
    ErrorMsgComponent,
    ConfirmaEmailComponent,
    SenhaSucessoComponent,
    RecuperarSenhaComponent,
    LoginSucessoComponent,
    TelaAmbientesComponent,
    TelaAmbienteControleComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false}),
    ReactiveFormsModule,
    HttpClientModule,
    WebcamModule,
    NgxMaskModule.forRoot(maskConfigFunction)
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/'},
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
