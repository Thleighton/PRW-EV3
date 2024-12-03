import { showAlert, showAlertError } from "../tools/message-functions";

export class Asistencia {

  static jsonAsisExample =
  `{
    "sede": "Alonso de Ovalle",
    "idAsignatura": "PGY4121",
    "seccion": "001D",
    "nombreAsignatura": "Aplicaciones Móviles",
    "nombreProfesor": "Cristian Gómez Vega",
    "dia": "2022-08-09",
    "bloqueInicio": "7",
    "bloqueTermino": "9",
    "horaInicio": "13:00",    
    "horaFin": "15:15"     
  }`;
  
    static jsonAsisEmpty =
    `{
    "sede": "",
    "idAsignatura": "",
    "seccion": "",
    "nombreAsignatura": "",
    "nombreProfesor": "",
    "dia": "",
    "bloqueInicio": "",
    "bloqueTermino": "",
    "horaInicio": "",    
    "horaFin": "" 
    }`;

   sede = '';
   idAsignatura = '';
   seccion = '';
   nombreAsignatura = '';
   nombreProfesor = '';
   dia = '';
   bloqueInicio = '';
   bloqueTermino = '';
   horaInicio = '';
   horaFin = '';

  constructor() { }

  public static getNewAsistencia(
    sede: string,
    idAsignatura: string,
    seccion: string,
    nombreAsignatura: string,
    nombreProfesor: string,
    dia: string,
    bloqueInicio: string,
    bloqueTermino: string,
    horaInicio: string,    
    horaFin: string    
  ) {
    const asistencia = new Asistencia();
    asistencia.sede = sede;
    asistencia.idAsignatura = idAsignatura;
    asistencia.seccion = seccion;
    asistencia.nombreAsignatura = nombreAsignatura;
    asistencia.nombreProfesor = nombreProfesor;
    asistencia.dia = dia;
    asistencia.bloqueInicio = bloqueInicio;
    asistencia.bloqueTermino = bloqueTermino;
    asistencia.horaInicio = horaInicio;
    asistencia.horaFin = horaFin;
    return asistencia;
  }

  static isValidAsistenciaQrCode(qr: string) {    
    if (qr === '') return false;
    try {
      const json = JSON.parse(qr);
      if ( json.sede       !== undefined
        && json.idAsignatura     !== undefined
        && json.seccion     !== undefined
        && json.nombreAsignatura     !== undefined
        && json.nombreProfesor       !== undefined
        && json.dia     !== undefined
        && json.bloqueInicio !== undefined
        && json.bloqueTermino      !== undefined
        && json.horaInicio      !== undefined
        && json.horaFin      !== undefined)
      {
        return true;
      }
    } catch(error) { }
    showAlert('El código QR escaneado no corresponde a una Asistencia');
    return false;
  }
}