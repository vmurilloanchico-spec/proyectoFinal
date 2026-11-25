import { createClient } from "@supabase/supabase-js";
declare global {
  interface Window {
    rondaConfig?: { url: string; key: string };
  }
}
const config = window.rondaConfig;
export const db =
  config?.url && config.key ? createClient(config.url, config.key) : null;
export function conexion() {
  if (!db)
    throw new Error(
      "Para usar tu cuenta, configura Supabase siguiendo el README.",
    );
  return db;
}
export function mensaje(error: unknown) {
  const detalle =
    error && typeof error === "object" && "message" in error
      ? String(error.message)
      : "";
  const traducciones: Record<string, string> = {
    "Invalid login credentials": "Revisa tu correo y contraseña.",
    "Email not confirmed": "Confirma tu correo antes de ingresar.",
    "Failed to fetch": "Revisa tu conexión e inténtalo de nuevo.",
  };
  return (
    traducciones[detalle] || detalle || "No se pudo completar la operación."
  );
}
