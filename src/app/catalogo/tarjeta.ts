import { Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Encuentro } from "../core/encuentros";
@Component({
  selector: "ronda-tarjeta",
  imports: [RouterLink],
  template: ` <a class="tarjeta" [routerLink]="['/encuentro', libro().id]">
    <div [class]="'portada ' + libro().portada">
      <i></i><b>{{ libro().titulo }}</b>
    </div>
    <div class="ficha">
      <small>{{ libro().genero }}</small>
      <h3>{{ libro().titulo }}</h3>
      <p>{{ libro().horario }}</p>
      <span>Ver encuentro →</span>
    </div>
  </a>`,
})
export class Tarjeta {
  libro = input.required<Encuentro>();
}
