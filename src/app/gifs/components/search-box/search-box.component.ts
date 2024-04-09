import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <!-- Sin @ViewChild
    <input type="text"
      class="form-control"
      placeholder="Buscar gifs..."
      (keyup.enter)="searchTag( txtTagInput.value )"
      #txtTagInput
    >-->
    <input type="text"
      class="form-control"
      placeholder="Buscar gifs..."
      (keyup.enter)="searchTag ()"
      #txtTagInput
    >

  `
})

export class SearchBoxComponent {

  // El ! es para indicarle que siempre va a tener un valor. El @ViewChild tiene que tener el nombre del elemento HTML como parámetro.
  // Al decorar la variable tagInput, tenemos que poner también el tipo de elemento HTML que es.

  // ATENCIÓN : EL @ViewChildren devolvería un array con todos los elementos indicados en el parámetro para acceder a cada uno por separado.

  @ViewChild ('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor() { }

  // Con @ViewChild
  searchTag () {
    const newTag = this.tagInput.nativeElement.value;
    console.log({newTag});
  }

  // Sin @ViewChild
  //searchTag (newTag : String) {
  //  console.log({ newTag });
  //}
}
