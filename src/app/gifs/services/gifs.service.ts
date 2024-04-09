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

  private organizeHistory (tag: string) {
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag) ) {
      this._tagsHistory = this._tagsHistory.filter ( (oldTag) => oldTag !== tag ); // Devuelve array donde el tag (si existe en el array), no está incluido.
    }

    this._tagsHistory.unshift(tag); // Inserto el tag nuevo (si ya existía, se ha borrado del array en la línea superior.)

    this._tagsHistory = this.tagsHistory.splice(0,10); // Limito el historial a 10 valores.

  }

  public searchTag (tag : string): void {
    if (tag.length === 0) return; //Para evitar vacíos en la lista

    this.organizeHistory (tag);

    //this._tagsHistory.unshift (tag); // Al usar el organizeHistory, ya no es necesario.

    //console.log(this.tagsHistory);

  }



}
