import { inject, Injectable, signal } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { User } from "@supabase/supabase-js";

@Injectable({ providedIn: "root" })
export class Sesion {
  readonly usuario = signal<User | null>(null);
  readonly lista = Promise.resolve();
}

export const requiereSesion: CanActivateFn = (_ruta, estado) =>
  inject(Router).createUrlTree(["/cuenta"], { queryParams: { volver: estado.url } });
