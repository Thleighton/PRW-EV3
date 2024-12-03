import { EducationalLevel } from './educational-level';

export class Person {

  firstName = '';
  lastName = '';
  educationalLevel: EducationalLevel = EducationalLevel.findLevel(1)!;
  dateOfBirth: Date = new Date();
  address = '';

  constructor() {
    this.firstName = '';
    this.lastName = '';
    this.educationalLevel = EducationalLevel.findLevel(1)!;
    this.dateOfBirth = new Date();
    this.address = ' ';
   }

   // Formatear la fecha de nacimiento en dd/mm/yyyy
  public getDateOfBirth(): string {
    if (!this.dateOfBirth) return 'No asignada';
    // Obtener el día y agregar un cero inicial si es necesario
    const day = this.dateOfBirth.getDate().toString().padStart(2, '0');
    // Obtener el mes (agregando 1) y agregar un cero inicial si es necesario
    const month = (this.dateOfBirth.getMonth() + 1).toString().padStart(2, '0');
    // Obtener el año
    const year = this.dateOfBirth.getFullYear();
    return `${day}/${month}/${year}`;
  }

}
