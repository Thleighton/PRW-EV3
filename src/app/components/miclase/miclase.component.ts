import { AuthService } from 'src/app/services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { IonContent } from "@ionic/angular/standalone";

@Component({
  selector: 'app-miclase',
  templateUrl: './miclase.component.html',
  styleUrls: ['./miclase.component.scss'],
  standalone: true,
  imports:[CommonModule]
})
export class MiClaseComponent implements OnDestroy {

  dino: any;
  private subscription: Subscription;

  constructor(private authService: AuthService) { 
    this.subscription = this.authService.qrCodeData.subscribe((qr) => {
      this.dino = qr? JSON.parse(qr): null;
    })
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  

}
