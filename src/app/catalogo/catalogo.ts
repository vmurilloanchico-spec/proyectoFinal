import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { encuentros } from "../core/encuentros";
import { Tarjeta } from "./tarjeta";
import { Pila, Trie } from "./indices";
import { HeapMaximo } from "./capacidad";
@Component({
  imports: [Tarjeta, RouterLink],
  template: ` <header class="hero">
      <div>
        <small>CLUB DE LECTURA</small>
        <h1>Lecturas en común<span>.</span></h1>
        <p>
          Encuentra tu próxima lectura y reserva un lugar en la conversación.
        </p>
      </div>
      <div class="shelf" aria-hidden="true">
        <i></i><i></i><i></i><i></i><i></i>
      </div>
    </header>
    <section>
      <div class="section-head">
        <h2>Encuentros</h2>
        <a [routerLink]="['/encuentro', amplio.id]"
          >Ver el de mayor capacidad ↗</a
        >
      </div>
      <div class="filtros">
        <input
          aria-label="Buscar por título"
          placeholder="Buscar por inicio del título…"
          [value]="busqueda"
          (input)="busqueda = $any($event.target).value"
        />
        @for (g of generos; track g) {
          <button
            [class.activo]="genero === g"
            [attr.aria-pressed]="genero === g"
            (click)="cambiar(g)"
          >
            {{ g }}
          </button>
        }
        @if (historial.cantidad) {
          <button (click)="deshacer()">Deshacer filtro</button>
        }
      </div>
      <div class="grid">
        @for (e of visibles; track e.id) {
          <ronda-tarjeta [libro]="e" />
        } @empty {
          <p>Ningún encuentro coincide con tu búsqueda.</p>
        }
      </div>
    </section>`,
})
export class Catalogo {
  generos = ["Todos", "Novela", "Cuento", "Poesía"];
  genero = "Todos";
  busqueda = "";
  historial = new Pila<string>();
  private indice = new Trie();
  private capacidades = new HeapMaximo<(typeof encuentros)[number]>();
  constructor() {
    for (const e of encuentros) {
      this.indice.agregar(e.titulo, e.id);
      this.capacidades.agregar(e, e.capacidad);
    }
  }
  get amplio() {
    return this.capacidades.primero()!;
  }
  get visibles() {
    const ids = this.indice.buscar(this.busqueda);
    return encuentros.filter(
      (e) =>
        ids.has(e.id) && (this.genero === "Todos" || this.genero === e.genero),
    );
  }
  cambiar(g: string) {
    if (g !== this.genero) {
      this.historial.guardar(this.genero);
      this.genero = g;
    }
  }
  deshacer() {
    this.genero = this.historial.sacar() ?? "Todos";
  }
}
