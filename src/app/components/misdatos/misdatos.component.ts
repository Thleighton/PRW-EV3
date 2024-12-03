import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonSelect, IonSelectOption, IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton, IonItem, IonCard, IonCardHeader, IonCardContent, IonIcon } from '@ionic/angular/standalone';
import { User } from 'src/app/model/user';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';
import { Post } from 'src/app/model/post';
import { APIClientService } from 'src/app/services/apiclient.service';
import { EducationalLevel } from 'src/app/model/educational-level';
import { showToast } from 'src/app/tools/message-functions';
import { TranslateModule } from '@ngx-translate/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { addIcons } from 'ionicons';
import { colorWandOutline, eye, qrCodeOutline, keyOutline } from 'ionicons/icons';

@Component({
  selector: 'app-misdatos',  // Este es el selector, lo puedes cambiar si quieres.
  templateUrl: './misdatos.component.html', // Cambié el nombre del archivo a .component.html
  styleUrls: ['./misdatos.component.scss'], // Cambié el nombre del archivo de estilo a .component.scss
  standalone: true,
  imports: [IonIcon, IonCardContent, IonCardHeader, IonCard, IonButton, IonInput, IonContent, IonHeader, IonTitle, IonToolbar, 
            CommonModule, FormsModule, IonItem, IonSelect, IonSelectOption, 
            TranslateModule,MatDatepickerModule,
            MatInputModule,
            MatNativeDateModule]
            ,
  providers: [
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class MisDatosComponent implements OnInit {
  repeticionPassword = '';
  usuario: User = new User();
  usuarios: User[] = [];
  publicaciones: Post[] = [];
  listaNivelesEducacionales: EducationalLevel[] = EducationalLevel.getLevels();
  showPassword = false;
  constructor(
    
    private bd: DatabaseService,
    private auth: AuthService,
    private api: APIClientService
  ) {
    
    this.bd.userList.subscribe((usuarios) => {
      if (usuarios) {
        this.usuarios = usuarios;
      }
    });
    this.auth.readAuthUser().then((usuario) => {
      if (usuario) {
        this.usuario = usuario;
        console.log(this.usuario);
      }
    });
    addIcons({eye,keyOutline,qrCodeOutline,colorWandOutline}); 
  }
  

  ngOnInit() {
    this.auth.usuarioAutenticado.subscribe((user) => {
      if (user !== null) {
        this.usuario = user!;
        this.repeticionPassword = user!.password;
      }
    })
  }

  guardarUsuario() {
    if (this.usuario.userName.trim() === '') {
      showToast('El usuario debe tener un nombre');
    } else {
      console.log(this.usuario);
      this.bd.saveUser(this.usuario);
      this.auth.saveAuthUser(this.usuario);
      showToast('El usuario fue guardado correctamente');
    }
  }

  public actualizarNivelEducacional(event: any) {
    this.usuario.educationalLevel = EducationalLevel.findLevel(event.detail.value)!;
  }

  onFechaNacimientoChange(event: any) {
    console.log('Fecha seleccionada:', event.detail.value); // Mostrar en consola
    this.usuario.dateOfBirth = new Date(event.detail.value); // Convertir de ISO a Date
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  
}
