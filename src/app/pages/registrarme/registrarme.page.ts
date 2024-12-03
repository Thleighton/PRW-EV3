import { AuthService } from 'src/app/services/auth.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { DatabaseService } from 'src/app/services/database.service';
import { showAlertDUOC, showToast } from 'src/app/tools/message-routines';
import { Route, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { TranslateModule } from '@ngx-translate/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { EducationalLevel } from 'src/app/model/educational-level';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-registrarme',
  templateUrl: './registrarme.page.html',
  styleUrls: ['./registrarme.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TranslateModule, MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class RegistrarmePage {
  usuario: User = new User();
  listaNivelesEducacionales: EducationalLevel[] = EducationalLevel.getLevels();
  showPassword = false;

  constructor(
    private bd: DatabaseService,
    private router: Router
  ) {

  }

  guardarUsuario() {
    if (!this.validarCampos()) {
      return;
    }

    this.bd.saveUser(this.usuario);
    showToast('Usuario registrado correctamente');
    this.router.navigate(['/login']);
  }

  private validarCampos(): boolean {
    if (!this.usuario.userName?.trim()) {
      showToast('El nombre de usuario es requerido');
      return false;
    }
    if (!this.usuario.firstName?.trim()) {
      showToast('El nombre es requerido');
      return false;
    }
    if (!this.usuario.lastName?.trim()) {
      showToast('El apellido es requerido');
      return false;
    }
    if (!this.usuario.email?.trim()) {
      showToast('El correo es requerido');
      return false;
    }
    if (!this.usuario.password?.trim()) {
      showToast('La contraseña es requerida');
      return false;
    }
    return true;
  }

  actualizarNivelEducacional(event: any) {
    this.usuario.educationalLevel = EducationalLevel.findLevel(event.detail.value)!;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
