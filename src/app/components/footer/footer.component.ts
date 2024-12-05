import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonFooter, IonToolbar, IonSegment, IonSegmentButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, pawOutline, pencilOutline, qrCodeOutline, schoolOutline, gridOutline, settingsOutline, personOutline } from 'ionicons/icons';
import { ScannerService } from 'src/app/services/scanner.service';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [
    CommonModule,    // CGV-Permite usar directivas comunes de Angular
    FormsModule,     // CGV-Permite usar formularios
    TranslateModule, // CGV-Permite usar pipe 'translate'
    IonFooter, IonToolbar, IonSegment, IonSegmentButton, IonIcon
  ]
})
export class FooterComponent implements OnInit{
  selectedButton = 'home';
  @Output() footerClick = new EventEmitter<string>();
  admin_: boolean = false;
  userName_: string | undefined = ''; // Esto permite que sea un string o undefined


  constructor(private auth: AuthService, private scanner: ScannerService, private bd: DatabaseService) { 
    addIcons({homeOutline,schoolOutline,gridOutline,pencilOutline,personOutline,qrCodeOutline,pawOutline,settingsOutline});
  }

  sendClickEvent($event: any) {
    this.footerClick.emit(this.selectedButton);
  }

  ngOnInit() {
    this.auth.leerUsuarioAutenticado().then((userData) => {
      this.userName_ = userData?.userName || ''; // Asegura que userName_ tenga un valor predeterminado
      this.admin_ = this.userName_ === 'admin';
    });
  }

  // Esta función puede ser usada para establecer visibilidad de botones de forma más flexible si se necesita.
  isVisibleForAll(): boolean {
    return true; // Siempre devuelve true, ya que los botones "misdatos" y "forum" son visibles para todos
  }
}
