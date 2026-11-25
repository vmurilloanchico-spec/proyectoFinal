import {
  Component,
  provideZonelessChangeDetection,
  inject,
  signal,
} from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import {
  Router,
  RouterOutlet,
  RouterLink,
  provideRouter,
  withInMemoryScrolling,
} from "@angular/router";
import { Catalogo } from "./app/catalogo/catalogo";
import { Detalle } from "./app/catalogo/detalle";
import { Cuenta } from "./app/cuenta/cuenta";
import { Agenda } from "./app/comunidad/agenda";
import { Sala } from "./app/comunidad/sala";
import { Sesion, requiereSesion } from "./app/core/sesion";
import { conexion, mensaje } from "./app/core/db";
@Component({
  selector: "ronda-app",
  imports: [RouterOutlet, RouterLink],
  template: ` <nav>
      <a routerLink="/" class="marca"><i aria-hidden="true">◒</i> Ronda</a>
      <div>
        <a routerLink="/">Encuentros</a>
        @if (sesion.usuario()) {
          <a routerLink="/agenda">Mi agenda</a
          ><button (click)="salir()">Salir</button>
        } @else {
          <a class="nav-login" routerLink="/cuenta">Ingresar ↗</a>
        }
      </div>
    </nav>
    <main>
      <router-outlet />
      <p role="status">{{ aviso() }}</p>
    </main>
    <footer>Ronda · Club de lectura</footer>`,
})
class App {
  sesion = inject(Sesion);
  private router = inject(Router);
  aviso = signal("");
  async salir() {
    try {
      const { error } = await conexion().auth.signOut({ scope: "local" });
      if (error) throw error;
      await this.router.navigateByUrl("/");
    } catch (error) {
      this.aviso.set(mensaje(error));
    }
  }
}
bootstrapApplication(App, {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(
      [
        { path: "", component: Catalogo },
        { path: "cuenta", component: Cuenta },
        { path: "encuentro/:id", component: Detalle },
        { path: "agenda", component: Agenda, canActivate: [requiereSesion] },
        { path: "sala/:id", component: Sala, canActivate: [requiereSesion] },
        { path: "**", redirectTo: "" },
      ],
      withInMemoryScrolling({ scrollPositionRestoration: "top" }),
    ),
  ],
}).catch(console.error);
