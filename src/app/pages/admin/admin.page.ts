import { Post } from 'src/app/model/post';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import { IonicModule, ViewWillEnter } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuario } from 'src/app/model/usuario';
import { showAlertDUOC, showAlertError, showAlertYesNoDUOC } from 'src/app/tools/message-routines';
import { APIClientService} from 'src/app/services/apiclient.service';
import { MessageEnum } from 'src/app/tools/message-enum';
import { User } from 'src/app/model/user';



@Component({
  selector: 'app-admin',
  templateUrl: 'admin.page.html',
  styleUrls: ['admin.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
  standalone: true,
})
export class adminPage implements OnInit {
  usuarios: User[] = [];
  usuario: User | null = null;

  constructor(
    private authService: AuthService,
    private bd: DatabaseService,
    private api: APIClientService
  ) {}

  async ngOnInit() {
    this.authService.usuarioAutenticado.subscribe((usuario) => {
      if (usuario !== null) {
        this.usuario = usuario;
      }
    });

    this.bd.traerListaUsuarios().then((usuarios) => {
      this.usuarios = usuarios;
    });
  }

  filtrarUsuarioEnSesion(): User[] {
    return this.usuarios.filter((usuario) => usuario.userName !== 'admin');
  }

  async eliminarUsuario(usuario: User) {
    const usu = await this.bd.leerUser(usuario.userName);
    if (usu) {
      const resp = await showAlertYesNoDUOC(
        `¿Estás seguro que deseas eliminar este usuario ${usu.firstName}?`
      );
      if (resp === MessageEnum.YES) {
        await this.bd.eliminarUsuarioUsandoUserName(usuario.userName);

        // Actualiza la lista de usuarios localmente
        this.usuarios = this.usuarios.filter((u) => u.userName !== usuario.userName);

        // Muestra una alerta de éxito
        showAlertDUOC('Usuario eliminado exitosamente');
      }
    } else {
      showAlertDUOC('El usuario que desea eliminar no existe');
    }
  }
}