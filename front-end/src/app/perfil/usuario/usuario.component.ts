import { Component, ViewChild } from '@angular/core';
import { Validators, FormControl, FormGroup, ValidationErrors, AbstractControl, FormBuilder, NgForm } from '@angular/forms';
import { MustMatch } from './must-match';
import { Usuario } from 'src/app/interfaces/usuario';
import { ErrorMsgComponent } from 'src/app/compartilhado/error-msg/error-msg.component';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { Router } from '@angular/router';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: []
})
export class UsuarioComponent {
  error: string;

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService, private router: Router) { }

  @ViewChild(ErrorMsgComponent) errorMsgComponent: ErrorMsgComponent;

  // altera o estado da webcam true = mostrando
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];

  // ultima imagem
  public webcamImage: WebcamImage = null;

  // tira foto
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

  public ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
  }

  public cameraWasSwitched(deviceId: string): void {
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }
  
  validGroup = this.formBuilder.group({
    emailControl: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
    celularControl: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[1-9]{2}9[7-9]{1}[0-9]{3}[0-9]{4}$/)]),//regex que valida celulares
    senhaControl: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]),
    confirmarSenhaControl: new FormControl('', [
      Validators.required]),
    nomeControl: new FormControl('', [
      Validators.required]),
    cepControl: new FormControl('', [
      Validators.required]),
    logradouroControl: new FormControl('', [
      Validators.required]),
    complementoControl: new FormControl('', [
      Validators.required]),
    estadoControl: new FormControl('', [
      Validators.required]),
    cidadeControl: new FormControl('', [
      Validators.required]),
  },
    {
      validator: MustMatch('senhaControl', 'confirmarSenhaControl')
    });


  onSubmit() {

    // stop here if form is invalid
    if (this.validGroup.invalid) {
      this.error = 'Preencha corretamente os campos!';
      return;
    }

    var usuario = <Usuario>{
      nome: this.validGroup.get('nomeControl').value,
      email: this.validGroup.get('emailControl').value,
      celular: this.validGroup.get('celularControl').value,
      password: this.validGroup.get('senhaControl').value,
      foto: this.webcamImage.imageAsBase64
    };

    this.addUsuario(usuario);
  }

  addUsuario(usuario: Usuario) {
    this.usuarioService.addUsuario(usuario)
      .subscribe(
        () => { this.router.navigateByUrl("/confirma-email"); },
        () => {
          this.error = 'Falha ao adicionar o usuario.';
        });
  }

  get f() { return this.validGroup.controls; }

  get nomeControl() {
    return this.validGroup.get('nomeControl');
  }

  get emailControl() {
    return this.validGroup.get('emailControl');
  }

  get celularControl() {
    return this.validGroup.get('celularControl');
  }

  get senhaControl() {
    return this.validGroup.get('senhaControl');
  }

  get cepControl() {
    return this.validGroup.get('cepControl');
  }

  get confirmarSenhaControl() {
    return this.validGroup.get('confirmarSenhaControl');
  }

  get logradouroControl() {
    return this.validGroup.get('logradouroControl');
  }

  get complementoControl() {
    return this.validGroup.get('complementoControl');
  }

  get estadoControl() {
    return this.validGroup.get('estadoControl');
  }

  get cidadeControl() {
    return this.validGroup.get('cidadeControl');
  }

}
