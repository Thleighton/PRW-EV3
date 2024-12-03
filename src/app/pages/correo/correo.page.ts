// correo.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import { Usuario } from 'src/app/model/usuario';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TranslateModule]
})
export class CorreoPage implements OnInit {
  correo = '';

  constructor(
    private router: Router,
    private bd: DatabaseService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // Puedes agregar cualquier inicialización aquí si es necesario.
  }

  async recuperarContrasena() {
    try {
      const usu = await this.bd.leerUsuarioCorreo(this.correo);
      const navigationExtras: NavigationExtras = {
        state: {
          usuario: usu
        }
      };

      if (usu) {
        this.router.navigate(['/pregunta'], navigationExtras);
      } else {
        this.router.navigate(['/incorrecto']);
      }
    } catch (error) {
      console.error("Error en recuperarContrasena:", error);
      // Opcionalmente, podrías mostrar una alerta de error aquí.
    }
  }

  volverAlInicio() {
    this.router.navigate(['/login']);
  }
}
