import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _tagsHistory: string[] =[];

  constructor() { }


  get tagsHistory() {
    // Usamos el spread porque: en javascript el objeto se devolvería como referencia y podría modificarse. Si uso el spread, voy a devolver una copia
    // del array, y si la modifican, en el servicio no la van a poder cambiar desde fuera. Es algo opcional, pero muy bien pensado para evitar cambios no deseados.
    return [...this._tagsHistory];
  }

  public searchTag (tag : string): void {

    this._tagsHistory.unshift (tag);

    console.log(this.tagsHistory);

  }



}
