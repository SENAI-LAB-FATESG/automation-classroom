import { Routes } from '@angular/router';
import { HomeComponent } from './navegacao/home/home.component';
import { ContatoComponent } from './instituicao/contato/contato.component';
import { SobreComponent } from './instituicao/sobre/sobre.component';
import { UsuarioComponent } from './perfil/usuario/usuario.component';
import { AlterarSenhaComponent } from './perfil/alterar-senha/alterar-senha.component';
import { ConfirmaEmailComponent } from './perfil/confirma-email/confirma-email.component';
import { SenhaSucessoComponent } from './perfil/senha-sucesso/senha-sucesso.component';
import { RecuperarSenhaComponent } from './perfil/recuperar-senha/recuperar-senha.component';
import { AuthGuard } from './Helper';
import { LoginSucessoComponent } from './perfil/login-sucesso/login-sucesso.component';
import { TelaAmbientesComponent } from './ambientes/tela-ambientes/tela-ambientes.component';
import { TelaAmbienteControleComponent } from './ambientes/tela-ambiente-controle/tela-ambiente-controle.component';

export const rootRouterConfig : Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'home', component : HomeComponent },
    { path: 'contato', component : ContatoComponent },
    { path: 'sobre', component : SobreComponent },
    { path: 'usuario', component : UsuarioComponent },
    { path: 'alterar-senha', component : AlterarSenhaComponent, canActivate: [AuthGuard] },
    { path: 'confirma-email', component : ConfirmaEmailComponent },
    { path: 'senha-sucesso', component : SenhaSucessoComponent, canActivate: [AuthGuard] },
    { path: 'recuperar-senha', component : RecuperarSenhaComponent },
    { path: 'login-sucesso', component : LoginSucessoComponent, canActivate: [AuthGuard] },
    { path: 'ambientes', component : TelaAmbientesComponent },
    { path: 'ambientes-controle', component : TelaAmbienteControleComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];