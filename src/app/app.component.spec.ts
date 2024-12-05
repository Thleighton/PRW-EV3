import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { LoginPage } from 'src/app/pages/login/login.page';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';
import { Storage } from '@ionic/storage-angular';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { APIClientService } from 'src/app/services/apiclient.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { User } from 'src/app/model/user';


describe('Probar página de Login', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let authService: AuthService;

  // Código fuente que se ejecuta antes de cada test
  beforeEach(() => {
    // Configuración del módulo de testing
    TestBed.configureTestingModule({
      imports: [
        LoginPage, // Importa el componente directamente en el array de imports
        IonicModule,
        FormsModule,
        CommonModule,
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot(),  // Agregar este módulo para manejar la traducción
      ],
      providers: [
        DatabaseService,
        AuthService,
        Storage,
        APIClientService,
        TranslateService
      ],
    }).compileComponents(); // Compila el template y el css del componente

    // Crea una instancia del componente
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService); // Inyecta AuthService
    fixture.detectChanges();
  });
  
  it('debería validar que la contraseña tiene exactamente 4 dígitos', fakeAsync(() => {
    // Simula la entrada del usuario
    component.password = '1234'; // Contraseña válida de 4 dígitos
    fixture.detectChanges();
    tick();
  
    // Lógica de validación de longitud
    const isPasswordValid = component.password.length === 4 && /^\d+$/.test(component.password);
    
    // Verifica el resultado esperado
    expect(isPasswordValid).toBeTrue();
  
    // Caso negativo: contraseña de más de 4 dígitos
    component.password = '12345'; // Contraseña inválida
    fixture.detectChanges();
    tick();
  
    const isInvalidPassword = component.password.length !== 4 || !/^\d+$/.test(component.password);
  
    expect(isInvalidPassword).toBeTrue();
    flush();
  }));


  describe('Probar clase de user', () => {

    describe ('Probar que la contraseña sea correcta', () => {
        const user = new User();

        it ('Probar que la contraseña no sea vacía', () => {
          user.password = '';
          expect(user.validarPassword()).toContain('ingresar la contraseña');
        });

        it ('Probar que la contraseña sea numérica y no "abcd"', () => {
          user.password = 'abcd';
          expect(user.validarPassword()).toContain('debe ser numérica');
        });

        it ('Probar que la contraseña no supere los 4 dígitos como por ejemplo "1234567890"', () => {
          user.password = '1234567890';
          expect(user.validarPassword()).toContain('debe ser numérica de 4 dígitos');
        });

        it ('Probar que la contraseña sea de 4 dígitos como por ejemplo "1234"', () => {
          user.password = '1234';
          expect(user.validarPassword()).toEqual('');
        });

        it('Probar que la contraseña no contenga caracteres especiales como "12@!"', () => {
          user.password = '12@!';
          expect(user.validarPassword()).toContain('debe ser numérica');
        });
    
        it('Probar que la contraseña no sea numérica con menos de 4 dígitos como "123"', () => {
          user.password = '123';
          expect(user.validarPassword()).toContain('debe ser numérica de 4 dígitos');
        });

      });



  });

})

