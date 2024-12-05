describe('Entrar y salir con usuario correcto', () => {
  it('Presiona el botón Salir del header', () => {
    // Configura el viewport para un dispositivo móvil
    cy.viewport('iphone-x');
    cy.visit('http://localhost:8100/login');

    cy.get('#cuenta').type('atorres');
    cy.get('#contraseña').type('1234');
    // Espera que el botón "Salir" sea visible y luego presiona
    cy.get('#login').click();
    cy.url().should('include', '/home');
    cy.get('#salir').click(); 
    // Puedes agregar aquí más comprobaciones según sea necesario
    // Ejemplo: verificar si el usuario fue redirigido a otra página o si aparece un mensaje de logout
    cy.url().should('include', '/login');  // Asumimos que te redirige a login después de hacer logout
  });
});
describe('Prueba de login con credenciales no válidas', () => {
  it('Ingresa con un usuario y contraseña incorrectos', () => {
    // Configura el viewport para un dispositivo móvil
    cy.viewport('iphone-x');
    cy.visit('http://localhost:8100/login');

    // Ingresa un cuenta de usuario y contraseña no válidos
    cy.get('#cuenta').type('usuarioInvalido');  // Ingresa un usuario inválido
    cy.get('#contraseña').type('contrasenaIncorrecta');  // Ingresa una contraseña incorrecta

    // Presiona el botón "login"
    cy.get('#login').click();

    // Verifica que la URL no cambie a una página protegida (es decir, sigue en /login o muestra un error)
    cy.url().should('include', '/login');  // Debería redirigir a login si el login falla
  });
});

describe('Prueba recuperar contraseña correo incorrecto', () => {
  it('Ingresa con un correo incorrecto a recuperar contraseña', () => {
    // Configura el viewport para un dispositivo móvil
    cy.viewport('iphone-x');
    cy.visit('http://localhost:8100/login');

    // Ingresa un cuenta de usuario y contraseña no válidos
    cy.get('#cuenta').type('usuarioInvalido');  // Ingresa un usuario inválido
    cy.get('#contraseña').type('contrasenaIncorrecta');  // Ingresa una contraseña incorrecta
    cy.get('#recuperar').click()
    cy.url().should('include', '/correo');  // Debería redirigir a login si el login falla
    cy.get('#correo').type('correoincorrecto');
    cy.get('#validarCorreo').click()
    // Verifica que la URL no cambie a una página protegida (es decir, sigue en /login o muestra un error)
    cy.url().should('include', '/incorrecto');  // Debería redirigir a login si el login falla
  });
});

describe('Prueba recuperar contraseña correo correcto', () => {
  it('Ingresa con un correo correcto pero respuesta incorrecta', () => {
    // Configura el viewport para un dispositivo móvil
    cy.viewport('iphone-x');
    cy.visit('http://localhost:8100/login');

    // Ingresa un cuenta de usuario y contraseña no válidos
    cy.get('#cuenta').type('usuarioInvalido');  // Ingresa un usuario inválido
    cy.get('#contraseña').type('contrasenaIncorrecta');  // Ingresa una contraseña incorrecta
    cy.get('#recuperar').click()
    cy.url().should('include', '/correo');  // Debería redirigir a login si el login falla
    cy.get('#correo').type('atorres@duocuc.cl');
    cy.get('#validarCorreo').click()
    cy.get('#respuesta1').type('loquesea');
    cy.get('#respuesta').click()
    cy.url().should('include', '/incorrecto');  // Debería redirigir a login si el login falla
    // Verifica que la URL no cambie a una página protegida (es decir, sigue en /login o muestra un error)
  });
});

describe('Prueba recuperar contraseña correo correcto', () => {
  it('Ingresa con un correo correcto pero respuesta correcta', () => {
    // Configura el viewport para un dispositivo móvil
    cy.viewport('iphone-x');
    cy.visit('http://localhost:8100/login');

    // Ingresa un cuenta de usuario y contraseña no válidos
    cy.get('#cuenta').type('usuarioInvalido');  // Ingresa un usuario inválido
    cy.get('#contraseña').type('contrasenaIncorrecta');  // Ingresa una contraseña incorrecta
    cy.get('#recuperar').click()
    cy.url().should('include', '/correo');  // Debería redirigir a login si el login falla
    cy.get('#correo').type('atorres@duocuc.cl');
    cy.get('#validarCorreo').click()
    // cy.url().should('include', '/login');  // Debería redirigir a login si el login falla
    cy.get('#respuesta1').type('gato');
    cy.get('#respuesta').click()
    cy.url().should('include', '/correcto');  // Debería redirigir a login si el login falla
    cy.get('#inicio').click()
    cy.url().should('include', '/login');  // Debería redirigir a login si el login falla

  });
  
  
});
  describe('Cambiar tema de color', () => {
    it('cambiar el tema de color y revisar en la app', () => {
      cy.viewport('iphone-x');
      cy.visit('http://localhost:8100/login');

      cy.get('#color').click();
      cy.get('#temas').click();


      // Seleccionar la opción "Instagram"
      cy.get('#alert-input-1-5').click();      // Hacer clic en el botón "OK" para confirmar la selección
      cy.get('.alert-button').contains('OK').click();
      cy.get('#volverLogin').click();
      cy.url().should('include', '/login');
      cy.get('#cuenta').type('atorres');  // Ingresa un usuario inválido
      cy.get('#contraseña').type('1234');  // Debería redirigir a login 
      cy.get('#login').click();
      cy.url().should('include', '/home');  // Debería redirigir a home
      cy.get('#salir').click();
      cy.url().should('include', '/login');  // Debería redirigir a login 
    });
  });
describe('Cambiar cuenta de usuario y cerrar sesión', () => {
  it('Cambia el cuenta a "1111111", actualiza el perfil y cierra sesión', () => {
    // Configura el viewport para un dispositivo móvil
    cy.viewport('iphone-x');
    cy.visit('http://localhost:8100/login');
    cy.get('#cuenta').type('atorres');
    cy.get('#contraseña').type('1234');
    // Ingresa al perfil de usuario
    cy.get('#login').click();
    cy.url().should('include', '/home');
    cy.get('#misDatos').click();
    cy.get('#cuentaa').find('input').type('1111', { force: true });
    // Si el slot contiene un campo de entrada
 // Si hay un campo de entrada dentro del slot
    // Actualiza el perfil
    cy.get('#actualizar').click();
    // Cierra sesión
    cy.get('#salir').click();
    // Verifica que se haya redirigido al login
    cy.url().should('include', '/login');
    cy.get('#cuenta').type('1111');  // Ingresa un usuario inválido
    cy.get('#contraseña').type('1234');
    cy.get('#login').click();
    cy.url().should('include', '/home');
    cy.get('#salir').click();
    cy.url().should('include', '/login');


  });
});

describe('cambiar el idioma a inglés ', () => {
  it('cambiar el idioma a inglés y navegar por la app', () => {
    // Configura el viewport para un dispositivo móvil
    cy.viewport('iphone-x');
    cy.visit('http://localhost:8100/login');

    cy.get('#cuenta').type('atorres');
    cy.get('#contraseña').type('1234');
    // Ingresa al sistema
    cy.get('#idioma').click();
    // Selecciona el idioma "Inglés" (botón con aria-checked="false" para inglés)
    cy.get('#alert-input-1-0').click();  // Asumiendo que este es el ID para "English"
    // Hace clic en el botón "OK" para confirmar
    cy.get('.alert-button').contains('OK').click();

    cy.get('#login').click();
    cy.url().should('include', '/home');
    cy.get('#misDatos').click();
    cy.get('#foro').click();
    cy.get('#miClase').click();
    cy.get('#salir').click();
    cy.url().should('include', '/login');
  });
});



