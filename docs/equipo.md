# Cómo trabajar los tres en GitHub

El ZIP contiene dos puntos de partida. En proyecto-completo está la aplicación integrada para probar y consultar. En base-equipo.bundle está un repositorio inicial con main y las tres ramas apuntando a un mismo commit de plantilla. La base ya tiene las rutas, el diseño común y pantallas provisionales que cada responsable reemplaza. Los módulos finales están en proyecto-completo. Los commits de esta plantilla están identificados como plantilla. Cada persona debe revisar, adaptar, probar y explicar los cambios que firme.

## 1. Una sola persona prepara GitHub

Crear un repositorio vacío en GitHub, sin README ni archivos iniciales. Agregar a los dos compañeros como colaboradores. Extraer el ZIP. Desde una terminal abierta en la carpeta donde se encuentra base-equipo.bundle, ejecutar las siguientes órdenes. Reemplazar URL_DEL_REPO por la dirección HTTPS real del repositorio.

```sh
git clone -b main base-equipo.bundle ronda-equipo
cd ronda-equipo
git remote rename origin plantilla
git remote add origin URL_DEL_REPO
git push -u origin main
git push origin main:feat/catalogo main:feat/cuentas-datos main:feat/comunidad
```

Las tres ramas remotas quedan creadas. En GitHub conviene conservarlas después de mezclar para que el profesor pueda revisarlas. Quien creó el repositorio puede seguir usando ronda-equipo. Las otras dos personas clonan el repositorio de GitHub con git clone URL_DEL_REPO y abren la carpeta clonada.

## 2. Cada persona se pasa a su rama

Todos ejecutan `git fetch origin`. Cada quien ejecuta únicamente la línea que le corresponde.

```sh
git switch -c feat/catalogo --track origin/feat/catalogo
git switch -c feat/cuentas-datos --track origin/feat/cuentas-datos
git switch -c feat/comunidad --track origin/feat/comunidad
```

Si Git dice que la rama local ya existe, usar git switch y el nombre de esa rama. Ejecutar `git branch --show-current` antes de cada commit. Revisar el nombre y correo de Git con `git config user.name` y `git config user.email` para que el aporte quede asociado a la cuenta correcta.

## 3. Qué incorpora cada integrante

Copiar desde proyecto-completo a la misma ruta dentro del clon, reemplazando los archivos provisionales de su módulo. Las carpetas del ZIP se pueden abrir en dos ventanas del explorador de Windows. Trabajen sobre la copia del clon.

| Rama | Archivos que incorpora | Prueba que presenta |
| --- | --- | --- |
| feat/catalogo | Carpeta src/app/catalogo completa, docs/propuesta.html, docs/propuesta.pdf y pruebas/catalogo.test.mjs | Busca “mari”, deshace un filtro, consulta el club de mayor capacidad y abre una lectura relacionada. |
| feat/cuentas-datos | Carpeta src/app/cuenta, src/app/core/sesion.ts y carpeta supabase | Crea dos cuentas, prueba el guard, configura el proyecto compartido y verifica que reservar dos veces conserve un único cupo ocupado por persona. |
| feat/comunidad | Carpeta src/app/comunidad completa, pruebas/comunidad.test.mjs y docs/informe.md | Muestra la agenda y envía un mensaje entre dos cuentas inscritas en la misma sala. |

El modelo de encuentro y la conexión de core/db.ts son comunes y ya están en la base. El detalle del catálogo llama a la función cambiar_reserva que instala el integrante 2. El chat depende de una sesión y una reserva. El integrante 3 puede trabajar en su rama mientras tanto y probar la integración después de incorporar main. El reparto se puede asignar libremente entre los tres nombres.

## 4. Subir y revisar cada aporte

Desde su propia rama, ejecutar npm ci y npm run build. Para probar las estructuras del módulo, usar npm test después de incorporar sus archivos de pruebas. En una rama que solo tenga la plantilla, la suite final aún no está reunida.

Antes de confirmar, ejecutar git status y git diff. Agregar rutas específicas. Ejemplo para el primer integrante:

```sh
git add src/app/catalogo docs/propuesta.html docs/propuesta.pdf pruebas/catalogo.test.mjs
git commit -m "Integra búsqueda, filtros y detalle de los encuentros"
git push
```

Para la segunda rama usar `git add src/app/cuenta src/app/core/sesion.ts supabase`. Para la tercera usar `git add src/app/comunidad pruebas/comunidad.test.mjs docs/informe.md`. Elegir mensajes que describan los cambios y las pruebas que cada uno hizo. Cada persona abre en GitHub un pull request desde su rama hacia main. Otra persona revisa el diff y comprueba la pantalla que se incorporó.

## 5. Integrar y entregar

1. Mezclar primero cuentas-datos para habilitar sesión, base y reglas. Mezclar catálogo para poder reservar. Finalmente mezclar comunidad para probar agenda y chat. El botón Create a merge commit conserva los commits personales y el punto de integración.
2. Para probar una rama con las aportaciones ya mezcladas, estando en SU rama ejecutar `git fetch origin`, `git merge origin/main`, `npm run build` y `git push`.
3. Después de los tres merges, una persona ejecuta `git switch main`, `git pull --ff-only origin main`, `npm ci`, `npm test` y `npm run build`. Configurar el .env local y realizar la prueba con dos cuentas del informe.
4. Publicar main según el README. En una de las ramas personales completar los nombres y enlaces reales en README.md. Subir ese último cambio en otro pull request y mezclarlo. Conservar las ramas remotas para la calificación.
