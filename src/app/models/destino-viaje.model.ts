export class DestinoViaje {
  id: string = crypto.randomUUID();

  constructor(public nombre: string, public imagenUrl: string, public votes: number = 0) {}
}