# Ronda · Club de lectura

Plataforma Angular para explorar encuentros semanales, reservar un cupo y participar en el chat del grupo. Cada reserva corresponde al club semanal completo. El catálogo contiene cuatro lecturas de ejemplo.

## Entrega

| Integrante (completar nombre completo) | Rama |
| --- | --- |
| [Nombre del integrante 1] | feat/catalogo |
| [Nombre del integrante 2] | feat/cuentas-datos |
| [Nombre del integrante 3] | feat/comunidad |

- Repositorio GitHub del equipo — [pegar URL]
- Sitio publicado — [pegar URL de Netlify]
- [Propuesta gráfica definitiva en PDF](docs/propuesta.pdf) · [Versión editable en HTML](docs/propuesta.html)
- [Documento final del proyecto](docs/informe.md)
- [Guía para dividir la entrega entre tres ramas](docs/equipo.md)

## Abrir el proyecto en Windows

1. Instalar Node.js 22.14 o posterior de la serie 22, o Node 24. Extraer el ZIP antes de abrir archivos.
2. Abrir en VS Code la carpeta que contiene este README y package.json. Abrir Terminal > Nueva terminal.
3. Ejecutar los siguientes comandos. El catálogo funciona de inmediato. Para utilizar cuentas, reservas y chat, completar la configuración de Supabase.

```powershell
npm ci
Copy-Item .env.example .env
npm start
```

Abrir http://localhost:4200. Para detener el servidor, presionar Ctrl+C. En macOS o Linux, el equivalente para crear el archivo es `cp .env.example .env`.

## Conectar el mismo Supabase para los tres

1. Una persona crea un proyecto Supabase. En SQL Editor abre una consulta nueva, copia TODO el contenido de `supabase/01_instalar.sql` y pulsa Run una vez en una base nueva. Se crean encuentros, reservas, mensajes, permisos, una función de reserva y la publicación del chat.
2. En Connect o en los ajustes de API del proyecto, copiar Project URL y la clave pública publishable (o anon). En el archivo local `.env` completar `SUPABASE_URL` y `SUPABASE_PUBLISHABLE_KEY`. Cada integrante utiliza los valores del mismo proyecto. Las claves secret y service_role son administrativas y deben quedar fuera del frontend.
3. En Authentication, habilitar el proveedor Email y el registro de usuarios. En URL Configuration, usar http://localhost:4200 como Site URL durante el desarrollo y añadir http://localhost:4200/** a Redirect URLs. Si está activa la confirmación de correo, abrir el enlace recibido antes de iniciar sesión.
4. Detener y volver a ejecutar `npm start` al editar .env. Registrarse con un correo propio desde Ingresar > Crear una cuenta.

## Pruebas y compilación

```sh
npm test
npm run build
```

La primera orden verifica las cinco estructuras mediante el ejecutor de Node. La segunda genera la web en `dist/ronda/browser`. Para comprobar el flujo real entre dos personas, seguir la demostración del informe.

## Publicar el frontend y entregar

1. Mezclar los tres pull requests en main siguiendo la guía de equipo y comprobar que main compila.
2. En Netlify importar el repositorio de GitHub. Elegir main. Si package.json está en la raíz, dejar vacía la carpeta base. El archivo netlify.toml ya define el comando npm run build, la carpeta dist/ronda/browser y la redirección de las rutas Angular.
3. En las variables de entorno del sitio añadir SUPABASE_URL y SUPABASE_PUBLISHABLE_KEY. Hacer un nuevo despliegue si se cambiaron después del primer build.
4. En Supabase establecer como Site URL la dirección HTTPS del sitio y añadir su dirección seguida de /** en Redirect URLs. Conservar la dirección local si siguen desarrollando.
5. Abrir el enlace en una ventana privada. Probar registro, reserva, chat con dos cuentas y recarga directa de /agenda. Sustituir los campos pendientes de la sección Entrega. GitHub mostrará el PDF de la propuesta desde el enlace relativo. Si migran el diseño a Figma, añadir también su enlace de solo lectura.
6. Entregar la URL de GitHub con acceso para el docente. Conservar las ramas, los pull requests y el historial de cada estudiante.

Guías de referencia: [Angular en Netlify](https://docs.netlify.com/build/frameworks/framework-setup-guides/angular/) y [Postgres Changes en Supabase](https://supabase.com/docs/guides/realtime/postgres-changes).
