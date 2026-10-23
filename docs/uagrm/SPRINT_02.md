# Sprint 2 — Portada y navegación UAGRM

Fecha: 22/10/2026 (Bolivia). Estado: entrega para pruebas locales.
Rama de desarrollo: `feature/uagrm-home-navigation-sprint-02`.

## Respaldo del Sprint 1 aprobado

El usuario aprobó visualmente el Sprint 1 y autorizó continuar. Se creó en GitHub
la rama `backup/sprint-01-aprobado-2026-10-22` apuntando exactamente a:

`6068fafe36d1e3b824ee7c2660d0e24208ab33f2`

Repositorio: https://github.com/inclandev2025/dspace-angular

Esta rama se reserva para recuperación. El Sprint 2 se desarrolla en otra rama;
no se aplican cambios a la rama de respaldo. El SHA anterior identifica el punto
exacto incluso si alguien mueve una rama por accidente. Es un respaldo del código
versionado; no incluye la base de datos, assetstore, secretos ni configuración local
que no se haya guardado en Git.

## Cambios de esta entrega

- Portada con bienvenida institucional, búsqueda principal y accesos directos a
  comunidades/colecciones y publicaciones.
- Listas nativas de comunidades y envíos recientes conectadas al backend configurado;
  se conserva su manejo de carga, errores, permisos y paginación.
- Se conserva la opción `homePage.showDiscoverFilters` y las notificaciones COAR.
- Menú móvil con desplazamiento interno y botón con estado expandido/colapsado real;
  los menús de DSpace conservan su lógica de autorización.
- Pie institucional con navegación, portal oficial, DSpace y Lyrasis. Se conservan
  accesibilidad, privacidad, acuerdo de usuario, cookies, feedback y COAR, según
  configuración y permisos. Las rutas internas del pie son absolutas.
- Textos nuevos traducidos a español e inglés; se mantiene el selector de idiomas.
- Sin cifras estadísticas ficticias, noticias de muestra ni facultades inventadas.
- Sin cambios de dependencias, base de datos, endpoints REST ni configuración Docker.

Se mantiene la identidad textual aprobada. El escudo y favicon oficiales siguen
pendientes de recibir y validar los recursos correspondientes.

## Probar en Windows PowerShell

Detener el servidor local con Ctrl+C. Revisar `git status` y guardar los cambios
propios antes de cambiar de rama. Conservar la configuración local del backend.

```powershell
cd C:\xampp\htdocs\dspace-angular
git fetch origin
git switch feature/uagrm-home-navigation-sprint-02
git pull --ff-only origin feature/uagrm-home-navigation-sprint-02
npm.cmd run start:dev
```

Abrir `http://localhost:4000/home` y recargar completamente. No hace falta ejecutar
`npm install` por este sprint si las dependencias ya estaban instaladas.

Si la nueva portada no aparece, confirmar que el archivo de configuración efectivo
selecciona `themes: [{name: custom}]`. Un bloque `themes` en `config.dev.yml`,
`config.development.yml` o el archivo de `DSPACE_APP_CONFIG_PATH` tiene prioridad
sobre `config/config.yml`. Mantener los valores REST/UI que ya funcionan.

## Pruebas de aceptación

Registrar commit (`git rev-parse HEAD`), navegador, resolución y observaciones.

| Prueba | Resultado esperado |
| --- | --- |
| Inicio a 360, 768 y 1440px | Búsqueda y accesos visibles, sin solapamientos |
| Zoom 200% y recorrido con Tab | Controles accesibles y foco visible |
| Búsqueda por título/autor con tildes | Navegación a resultados conservando la consulta |
| Comunidades y colecciones | Apertura de la lista real y de un elemento |
| Publicaciones | Apertura de `/search` |
| Envíos recientes | Datos del backend; opción Cargar más cuando corresponda |
| Menú móvil largo | Apertura/cierre y desplazamiento; estado aria-expanded coherente |
| Español / English | Cambio de todos los textos nuevos; sin claves uagrm.* visibles |
| Pie desde un ítem o comunidad | Rutas internas correctas, sin prefijos duplicados |
| Cookies / privacidad / acuerdo / feedback | Respeto de configuración y permisos |
| Sin datos / REST no disponible | Estados nativos de vacío, carga o error; sin datos simulados |
| showDiscoverFilters=true y false | La búsqueda principal y el contenido se mantienen |

El portal institucional enlazado es https://www.uagrm.edu.bo/, verificado en el
sitio oficial durante la implementación. No se agregaron contactos no confirmados.

## Traducciones y mantenimiento

Fuente de los textos: `src/themes/custom/assets/i18n/es.json5` y `en.json5`.
Se incorporaron las mismas claves a `src/assets/i18n/` para que funcionen al iniciar
sin pasos manuales adicionales. Solo se añadieron las claves nuevas en los catálogos
de ejecución; se conservaron las traducciones originales.

Para futuros cambios, el mecanismo del proyecto es:

```powershell
npm.cmd run merge-i18n -- -s src/themes/custom/assets/i18n
```

Revisar el diff antes del commit: el script original puede reformatear los catálogos.
Los idiomas adicionales usan el idioma de reserva configurado para estas claves
hasta que se incorporen traducciones específicas.

## Volver al Sprint 1

Detener el servidor y conservar cualquier cambio local. Crear una rama de
recuperación desde el respaldo, sin escribir sobre él:

```powershell
git fetch origin
git switch -c restore/uagrm-sprint-01 origin/backup/sprint-01-aprobado-2026-10-22
npm.cmd run start:dev
```

Si esa rama de recuperación ya existe, usar `git switch restore/uagrm-sprint-01`.
También puede abrirse una copia independiente del punto exacto:

```powershell
git worktree add --detach ..\dspace-uagrm-sprint-01 6068fafe36d1e3b824ee7c2660d0e24208ab33f2
```

La copia independiente necesita sus propias dependencias y configuración local.
No usar `reset --hard` ni forzar un push para volver atrás.

## Límites de la entrega

La compilación no reemplaza las pruebas funcionales con el backend local. Se debe
aprobar esta nueva portada antes de continuar al Sprint 3 (búsqueda/resultados).
No se realizó deploy ni merge a producción. La base sigue siendo `9.5.0-next`;
antes de producción hay que alinear la release con la versión exacta del backend.

## Verificación técnica de esta entrega

- Compilación Angular de desarrollo correcta, código de salida 0;
  hash `8353c6bf115d3a9e`.
- Comando: `npm run build -- --source-map=false`, con
  `NODE_OPTIONS=--max-old-space-size=6144` y `NG_BUILD_MAX_WORKERS=2`.
- Se comprobaron las 19 claves nuevas por idioma: los catálogos del tema y los
  catálogos de ejecución coinciden en español e inglés.
- Se revisó la conservación de las condiciones y controles del pie original.
- `git diff --check`: correcto. Dependencias y lockfile sin cambios.
- Advertencias del compilador sobre archivos incluidos pero no usados y
  dependencias existentes; no impidieron la compilación.
- Pendientes de ejecutar en el equipo del usuario: revisión visual en navegador,
  interacción móvil/teclado y pruebas funcionales contra su backend.
- No se han ejecutado compilación de producción/SSR, pruebas Docker ni deploy.
