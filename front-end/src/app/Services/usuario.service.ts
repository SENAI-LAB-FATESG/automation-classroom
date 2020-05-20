import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
  }

  getListaUsuario(): Observable<Usuario[]> {
    const url = `${environment.usuariosApiUrl}/User`;
    return this.http.get<Usuario[]>(url);
  }

  getUsuario(id: string): Observable<Usuario> {
    const url = `${environment.usuariosApiUrl}/User/${id}`;
    return this.http.get<Usuario>(url);
  }

  addUsuario(usuario: Usuario): Observable<Usuario> {
    const url = `${environment.usuariosApiUrl}/User/`;
    return this.http.post<Usuario>(url, usuario);
  }

  atualizaUsuario(usuario: Usuario): Observable<Usuario> {
    const url = `${environment.usuariosApiUrl}/User/${usuario.id}`;
    return this.http.put<Usuario>(url, usuario);
  }

  deletaUsuario(id: number): Observable<Usuario> {
    const url = `${environment.usuariosApiUrl}/User/${id}`;
    return this.http.delete<Usuario>(url);
  }

  trocaSenhaUsuario(senha: string): Observable<Usuario> {
    var usuario = JSON.parse(localStorage.getItem("currentUser"));
    const url = `${environment.usuariosApiUrl}/User/ChangePassword/${usuario.user.id}/${senha}`;
    return this.http.put<Usuario>(url, usuario);
  }

  recuperarSenha(email: string): Observable<Usuario> {
    const url = `${environment.usuariosApiUrl}/User/RecoverPassword/${email}`;
    return this.http.get<Usuario>(url);
  }

  confirmaEmail(token: string): Observable<Usuario> {
    const url = `${environment.usuariosApiUrl}/User/ConfirmEmail/${token}`;
    return this.http.get<Usuario>(url);
  }
}