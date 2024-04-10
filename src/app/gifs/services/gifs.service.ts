import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../components/interfaces/gifs.interfaces';

//const GIPHYT_API_KEY = '';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList: Gif [] = [];

  private _tagsHistory: string[] =[];
  private serviceUrl:   string = 'https://api.giphy.com/v1/gifs';
  private apiKey:       string = 'R1ZvG5v33vGYrPu3p7aI84j0WL6QCGwU';

  constructor( private http: HttpClient) { }


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

    // VERSION 1
    //fetch('https://api.giphy.com/v1/gifs/search?api_key=R1ZvG5v33vGYrPu3p7aI84j0WL6QCGwU&q=Valorant&limit=10')
    //  .then ( resp => resp.json())
    //  .then ( data => console.log (data));

    // VERSION 2
    // Esto es exactamente lo mismo que lo de las líneas superiores pero tenemos que poner esta cabecera de función: public async searchTag (tag : string): Promise<void> {
    //const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=R1ZvG5v33vGYrPu3p7aI84j0WL6QCGwU&q=Valorant&limit=10');
    //const data = await resp.json ();
    //console.log (data);

    // VERSION 3
    // Usamos HttpClientModule y lo colocamos en los imports del app.module para usarlo en toda la aplicación.
    // Habilita todo lo que ese módulo exporta para poder usarlo nosotros, como aquí:
    //this.http.get('https://api.giphy.com/v1/gifs/search?api_key=R1ZvG5v33vGYrPu3p7aI84j0WL6QCGwU&q=Valorant&limit=10')
    //  .subscribe( resp => {
    //    console.log(resp);
    //  })

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag)

    //this.http.get(`${ this.serviceUrl }/search`, { params: params}) // También vale para definir la llamada.
    this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, { params})
    .subscribe( (resp) => {

      //console.log(resp.data);
      //console.log(resp.patito); // Aunque esto esté definido en la interfaz, no fuerza a que lo usemos aquí.
      this.gifList = resp.data;
      console.log({ gifs: this.gifList});

    })


  }



}
