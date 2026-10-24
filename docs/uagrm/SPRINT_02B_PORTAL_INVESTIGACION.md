# Sprint 2B — Portal de investigación UAGRM

Fecha de trabajo: 24/10/2026 (Bolivia).

## Decisión y estado

El usuario confirmó que probó las funciones del Sprint 2 y funcionan correctamente.
Después comparó dos propuestas HTML adicionales y eligió **Portal de investigación**
(propuesta B). Esta iteración adapta esa dirección visual al tema Angular real.
No implica aprobación visual de la integración ni autorización de despliegue.

- Base: `7f4f3b125d7d679393271683ea77a26133e6afbf`.
- Rama de trabajo: `feature/uagrm-research-portal-sprint-02b`.
- Respaldo local y remoto verificado: `backup/sprint-02-validado-2026-10-24`, en el SHA base.
- Respaldo Sprint 1 existente: `backup/sprint-01-aprobado-2026-10-22`.
- Publicación autorizada explícitamente por el usuario el 24/10/2026. El respaldo
  y la rama de trabajo están disponibles en GitHub. La integración rechazó escrituras
  con HTTP 403 y la terminal no tenía credenciales; tras recibir autorización se
  publicaron los archivos mediante la interfaz de GitHub, en commits por carpeta.
- Commit de código remoto previo al cierre documental:
  `d56c8a19b6c9f02aa1ea1ac7c1633cea9a745749`.
  Los 19 archivos de código/estilos/traducciones se compararon mediante sus blobs Git
  y coinciden exactamente con los del commit local compilado
  `63bc073b0858e0a6e63fa76b5e6a368d82e4577d`.
  Los SHAs difieren por el método de publicación; no representan código diferente.
  El commit posterior de documentación completa esta entrega, sin cambiar el código.

Enlaces:

- [Portal de investigación](https://github.com/inclandev2025/dspace-angular/tree/feature/uagrm-research-portal-sprint-02b).
- [Respaldo del Sprint 2](https://github.com/inclandev2025/dspace-angular/tree/backup/sprint-02-validado-2026-10-24).

## Implementación

- Cabecera y navegación azul noche (`#091b3b`), marca textual UAGRM y lema traducido.
  Se conservan buscador del encabezado, idiomas, ayuda contextual, autenticación,
  suplantación y estado accesible del menú móvil. Los desplegables blancos mantienen
  colores oscuros propios para evitar texto o iconos ilegibles.
- Portada con dos columnas, titulares de la propuesta elegida e ilustración
  abstracta de conocimiento construida en CSS. Es decorativa, está oculta a lectores
  de pantalla y se omite en móvil; no usa fotografías, librerías ni estadísticas.
- Buscador nativo DSpace en un panel que se superpone al borde inferior de la portada.
  No se incorpora el filtrado local ni los datos ficticios de la maqueta HTML.
- Comunidades reales mediante el componente nativo: consulta, permisos, nombres,
  descripciones, conteos, paginación y RSS se conservan. El tema cambia su presentación
  a tarjetas adaptables; no se inventan facultades ni categorías institucionales.
- Envíos recientes en una composición editorial de dos columnas. El componente
  `UagrmRecentItemListComponent` hereda la consulta, configuración, permisos y acción
  `onLoadMore` del componente original; reutiliza sus renderizadores de ítems.
  El bloque completo se muestra solo cuando hay resultados. Carga y error mantienen
  los componentes nativos, sin encabezados o columnas vacías para una lista vacía.
- Banda institucional con enlace real al portal UAGRM y pie azul noche. Se mantienen
  los controles originales de cookies, accesibilidad, privacidad, acuerdo, feedback
  y COAR según configuración y permisos.
- 31 claves `uagrm.*` en cada idioma, sincronizadas entre tema y catálogos de ejecución.
- El espacio superior de la página inicial se elimina con un selector acotado a la
  presencia del componente home; se conserva el espaciado de las otras rutas.

Los menús reales de DSpace permanecen en su propia fila, a diferencia de la maqueta
estática simplificada. Se prioriza conservar su autorización y comportamiento.
Los siguientes sprints siguen encargándose de búsqueda completa, facetas y fichas.

## Límites

Se mantiene la base `9.5.0-next`; no cambian dependencias, configuración REST/UI,
backend, base de datos, assetstore ni permisos. El escudo y favicon oficiales siguen
pendientes. No hay merge a la rama base ni despliegue a producción.

## Verificación

- Instalación reproducible `npm ci --no-audit --no-fund`: correcta, sin descargar el
  binario Cypress en este entorno.
- Catálogos JSON5: 31 claves por idioma, con igualdad de los textos tema/ejecución.
- Compilación Angular de desarrollo: correcta, código de salida 0. Hash final
  `2af2e0ae889950b6`; se ejecutó después de los ajustes finales del encabezado.
  Comando: `NODE_OPTIONS=--max-old-space-size=6144 NG_BUILD_MAX_WORKERS=2 npm run build -- --source-map=false`.
  Se mantienen advertencias existentes de archivos del tema incluidos pero no usados.
- `git diff --check`: correcto. Sin cambios en `package.json`, `package-lock.json`,
  `config/` ni `src/app/`.
- Vista previa del build Angular: el frontend intentó resolver la API configurada
  (`sandbox.dspace.org`) y redirigió a `/500` con `undefined doesn't contain the link sites`.
  Por ello no se completó la revisión visual/funcional de la portada integrada.
  No se cambió el endpoint versionado ni se presentan las pruebas de la maqueta HTML
  como pruebas del frontend conectado a un backend. Debe revisarse con el entorno
  local que el usuario ya tiene funcionando.
- Suite E2E, producción/SSR y Docker: no ejecutados en esta iteración.

## Validar localmente la rama publicada

Antes de cambiar de rama, detener el servidor y revisar `git status`. Conservar los
cambios propios y la configuración del backend que ya funciona:

```powershell
cd C:\xampp\htdocs\dspace-angular
git status
git fetch origin
git switch feature/uagrm-research-portal-sprint-02b
git pull --ff-only origin feature/uagrm-research-portal-sprint-02b
npm.cmd run start:dev
```

Abrir `http://localhost:4000/home`. Esta entrega no requiere reinstalar dependencias
en un checkout que ya las tenga y conserve el mismo lockfile.

Si un clon descarga una sola rama y no aparece la referencia nueva, obtenerla
explícitamente antes de `git switch`:

```powershell
git fetch origin refs/heads/feature/uagrm-research-portal-sprint-02b:refs/remotes/origin/feature/uagrm-research-portal-sprint-02b
```

Revisar 360, 768 y 1440 px, zoom 200%, menú móvil y recorrido con teclado. Probar una
búsqueda con tildes, comunidades reales, enlace a un ítem, envíos recientes y Cargar
más; cambiar español/inglés; revisar desplegables y políticas del pie. También probar
`homePage.showDiscoverFilters` activado y desactivado y los estados carga/error/vacío
en un entorno de prueba. La API efectiva debe ser la prevista para ese entorno.

## Recuperación

La rama original `feature/uagrm-home-navigation-sprint-02` conserva el diseño anterior.
Se puede volver a ella después de guardar los cambios propios, sin mover los respaldos:

```powershell
git switch feature/uagrm-home-navigation-sprint-02
npm.cmd run start:dev
```

Un respaldo de código no incluye datos ni configuración no versionada del servidor.
