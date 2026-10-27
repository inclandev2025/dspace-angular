# Sprint 3 — Búsqueda y resultados

**Estado (27/10/2026):** implementación para revisión local. Iniciado el 26/10/2026 desde la continuidad del proyecto; pendiente de aceptación visual y funcional con el backend local UAGRM. No desplegado en producción.

## Base y recuperación

- Repositorio: `inclandev2025/dspace-angular` (línea DSpace 9.x; paquete `9.5.0-next`).
- Base aprobada: `feature/uagrm-research-portal-sprint-02b`, commit `b6ce49377b938b48259effecfa6190cddac234fa`.
- Rama de trabajo: `feature/uagrm-search-results-sprint-03`.
- Respaldo del portal aprobado: `backup/portal-investigacion-validado-2026-10-24` → `b6ce49377b938b48259effecfa6190cddac234fa`.
- Respaldos anteriores conservados: `backup/sprint-02-validado-2026-10-24` y `backup/sprint-01-aprobado-2026-10-22`.

No se ha creado un respaldo «validado» del Sprint 3: corresponde hacerlo después de la revisión y aprobación del usuario.

## Cambios implementados

1. Cabecera de búsqueda con identidad del Portal de investigación y formulario nativo destacado. El encabezado semántico principal sigue siendo el de resultados.
2. Panel de ordenación antes de las facetas, chips de filtros legibles y botón móvil con estado expandido y relación accesible con el panel.
3. Tarjetas de resultados con título, autoría, fecha, tipo, editorial, resumen, colección cuando está disponible y miniatura solo cuando existe y la configuración la permite.
4. Separación de carga, cero resultados y error. Se conserva la recuperación nativa por frase exacta para consultas no vacías. HTTP 400 usa la recuperación; HTTP 403/422/500 conserva el error nativo.
5. Diez textos nuevos en español e inglés; 41 claves UAGRM en cada catálogo del tema y runtime.
6. Estilos adaptables para escritorio, tablet y móvil, restringidos al contenedor público `.uagrm-discovery`.

## Compatibilidad y alcance técnico

Los overrides heredan los componentes DSpace y conservan búsqueda, filtros, ordenación, paginación, vista de cuadrícula, selección, RSS, CSV, rutas y eventos nativos. Las tarjetas se registran únicamente para `Context.Search` y `ViewMode.ListElement`; no reemplazan otros contextos.

Se usa el escape de metadatos y resaltado nativo de DSpace. Los enlaces externos conservan `noopener noreferrer`. La colección se muestra desde la relación disponible, sin añadir llamadas REST propias.

El módulo global `src/themes/eager-themes.module.ts` registra directamente el nuevo renderer para que sus decoradores formen parte del bundle. No se activa el módulo completo `CustomEagerThemeModule`, que estaba deshabilitado en la base y habilitaría overrides ajenos a este sprint. También se declara el renderer en el módulo eager del tema para mantener consistente su registro futuro.

No se modifican `src/app`, configuración REST, paquetes, lockfile, permisos, autenticación, backend, base de datos, indexación ni archivos de despliegue. Se conserva el inicio aprobado, pie de página, login ORCID/registro y selector de idiomas.

## Verificación

- Compilación Angular completada con Node 24.22.1 y npm 11.9.0: `npm run build -- --source-map=false` (27/10/2026).
- ESLint de los archivos TypeScript/HTML cambiados: sin errores; una advertencia por `NoopAnimationsModule` del soporte de pruebas heredado de Angular 20.
- Se añaden 19 casos de prueba de regresión: estados de búsqueda, paginación/selección, metadatos ausentes, resaltado/escape HTML, miniaturas, alcance del registro y enlaces.
- Los 19 casos se compilaron y ejecutaron correctamente en Chrome Headless 153 (27/10/2026): `TOTAL: 19 SUCCESS`. Se usó un navegador temporal fuera del repositorio; no se añadieron dependencias al proyecto.
- La revisión integrada queda pendiente: el endpoint sandbox respondió HTTP 403 en la sesión anterior. No se ha validado el REST institucional, SSR de producción, Docker ni E2E.

Las pruebas Angular usan componentes hijos simulados: comprueban el renderizado y la propagación de entradas, no sustituyen las pruebas de paginación/facetas contra el backend.

## Abrir en el entorno local Windows

Desde PowerShell, revisar primero cambios propios con `git status` y conservarlos antes de cambiar de rama. No reemplazar la configuración REST local.

```powershell
cd C:\xampp\htdocs\dspace-angular
git status
git remote set-branches --add origin feature/uagrm-search-results-sprint-03
git fetch origin refs/heads/feature/uagrm-search-results-sprint-03:refs/remotes/origin/feature/uagrm-search-results-sprint-03
git switch --track origin/feature/uagrm-search-results-sprint-03
npm.cmd run start:dev
```

El registro de la rama remota permite crear el seguimiento incluso si el clon original descargaba solo una rama. Si ya existe la rama local, sustituir `git switch --track ...` por:

```powershell
git switch feature/uagrm-search-results-sprint-03
git merge --ff-only origin/feature/uagrm-search-results-sprint-03
```

No cambian las dependencias; no es necesario reinstalarlas si el checkout anterior ya funcionaba. Abrir `http://localhost:4000/search`.

Para ejecutar las pruebas añadidas con Chrome instalado:

```powershell
npm.cmd run test -- --watch=false --browsers=ChromeHeadless --include="src/themes/custom/**/uagrm-*.spec.ts"
```

## Lista de aceptación local

- [ ] Buscar por título, autor y término con acento (`educación`); confirmar que se conserva la semántica nativa de términos parciales. No se ha añadido búsqueda difusa.
- [ ] Combinar dos facetas, quitar una y limpiar filtros; comprobar contador y consulta.
- [ ] Cambiar orden, página, tamaño y vista lista/cuadrícula; recargar URL y volver atrás.
- [ ] Revisar consulta sin resultados y recuperación por frase exacta; distinguir errores del servidor.
- [ ] Revisar ítems sin miniatura, autor, fecha o resumen; no debe aparecer información inventada.
- [ ] Abrir un resultado y descargar su documento; confirmar permisos y login.
- [ ] Probar móvil 360/390 px, tablet 768 px y escritorio; abrir/cerrar filtros sin ocultar controles.
- [ ] Recorrer con teclado, comprobar foco, lectura de etiquetas y zoom al 200 %.
- [ ] Cambiar ES/EN y revisar inicio, pie de página, ORCID, registro y navegación global.
- [ ] Registrar observaciones visuales y aprobación antes del respaldo validado y del siguiente sprint.

## Continuidad

El siguiente paso es revisar esta rama en el entorno local con datos representativos y ajustar incidencias observadas. Los respaldos existentes son puntos de recuperación y no deben moverse. El despliegue productivo queda fuera de este sprint.
