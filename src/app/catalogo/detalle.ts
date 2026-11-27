import { Component, inject, signal, effect } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { toSignal } from "@angular/core/rxjs-interop";
import { encuentros } from "../core/encuentros";
import { Sesion } from "../core/sesion";
import { conexion, db, mensaje } from "../core/db";
import { Grafo } from "./indices";
@Component({
  imports: [RouterLink],
  template: ` <a routerLink="/">← Encuentros</a>
    @if (libro; as e) {
      <div class="detalle">
        <div [class]="'portada grande ' + e.portada">
          <i></i><b>{{ e.titulo }}</b>
        </div>
        <section>
          <small>{{ e.genero }}</small>
          <h1>{{ e.titulo }}</h1>
          <p>{{ e.descripcion }}</p>
          <p>
            <strong>{{ e.horario }}</strong
            ><br />{{ e.lugar }}
          </p>
          <p>
            {{ e.capacidad }} cupos en total
            @if (libres() !== null) {
              · {{ libres() }} disponibles
            }
          </p>
          @if (sesion.usuario()) {
            @if (inscrito()) {
              <a class="boton" [routerLink]="['/sala', e.id]">Entrar al chat</a>
              <button
                [disabled]="ocupado() || !listo()"
                (click)="reservar(false)"
              >
                Cancelar reserva
              </button>
            } @else {
              <button
                class="boton"
                [disabled]="ocupado() || !listo() || libres() === 0"
                (click)="reservar(true)"
              >
                Reservar cupo
              </button>
            }
          } @else {
            <a
              class="boton"
              routerLink="/cuenta"
              [queryParams]="{ volver: '/encuentro/' + e.id }"
              >Ingresar para reservar</a
            >
          }
          <p role="status">{{ aviso() }}</p>
          <h3>Lecturas relacionadas</h3>
          @for (otro of relacionados; track otro.id) {
            <a class="enlace" [routerLink]="['/encuentro', otro.id]"
              >{{ otro.titulo }} →</a
            >
          }
        </section>
      </div>
    } @else {
      <h1>Encuentro desconocido</h1>
    }`,
})
export class Detalle {
  sesion = inject(Sesion);
  private params = toSignal(inject(ActivatedRoute).paramMap);
  private grafo = new Grafo();
  private revision = 0;
  aviso = signal("");
  libres = signal<number | null>(null);
  inscrito = signal(false);
  ocupado = signal(false);
  listo = signal(false);
  get libro() {
    return encuentros.find((e) => e.id === this.params()?.get("id"));
  }
  get relacionados() {
    return encuentros.filter((e) =>
      this.grafo.relacionados(this.libro!.id).has(e.id),
    );
  }
  constructor() {
    this.grafo.conectar("voragine", "maria");
    this.grafo.conectar("maria", "desolacion");
    this.grafo.conectar("ficciones", "voragine");
    effect(() => {
      const id = this.libro?.id;
      const uid = this.sesion.usuario()?.id;
      if (id) void this.cargar(id, uid);
    });
  }
  async cargar(id: string, uid?: string) {
    const rev = ++this.revision;
    this.libres.set(null);
    this.inscrito.set(false);
    this.listo.set(false);
    this.aviso.set("");
    if (!db) return;
    try {
      const { data, error } = await db
        .from("encuentros")
        .select("capacidad,ocupados")
        .eq("id", id)
        .single();
      if (error) throw error;
      const reserva = uid
        ? await db
            .from("reservas")
            .select("encuentro")
            .eq("usuario", uid)
            .eq("encuentro", id)
            .maybeSingle()
        : null;
      if (reserva?.error) throw reserva.error;
      if (rev === this.revision) {
        this.libres.set(data.capacidad - data.ocupados);
        this.inscrito.set(!!reserva?.data);
        this.listo.set(true);
      }
    } catch (error) {
      if (rev === this.revision) this.aviso.set(mensaje(error));
    }
  }
  async reservar(valor: boolean) {
    const id = this.libro!.id;
    this.ocupado.set(true);
    try {
      const { error } = await conexion().rpc("cambiar_reserva", {
        sala: id,
        reservar: valor,
      });
      if (error) throw error;
      if (this.libro?.id === id)
        await this.cargar(id, this.sesion.usuario()?.id);
    } catch (error) {
      this.aviso.set(mensaje(error));
    } finally {
      this.ocupado.set(false);
    }
  }
}
