# Sprint 6 — Regresión y preparación de despliegue

Inicio: 17/11/2026 (Bolivia). Estado: en curso; sin aprobación ni despliegue.
Rama: `feature/uagrm-sprint-06-regression-deployment`.
Base: `backup/sprint-05-validacion-2026-11-17`, commit `52bb3f81cfbac8501479461752d7eb122a32a1c9`. La comparación remota confirmó que el respaldo y la rama de Sprint 5 eran idénticos a ese commit antes de crear esta rama. Mantener respaldos sin reescritura.

## Hallazgos iniciales de revisión de código

- `package.json` declara la UI `9.5.0-next`, Angular core `^20.3.30`, Node `>=20 <25` y npm `10.9.4`. Son requisitos o rangos declarados, no prueba de las versiones instaladas ni de compatibilidad con el backend de producción.
- `start:dev` invoca `scripts/serve.ts`, que ejecuta `ng serve` con configuración development. `start:prod` compila navegador y servidor, y ejecuta `serve:ssr`. Las advertencias de hidratación observadas en desarrollo no prueban por sí solas un fallo en SSR; comprobar la ejecución SSR real.
- El `Dockerfile` de raíz utiliza Node 22 Alpine y `npm ci`, pero por defecto arranca en desarrollo con vigilancia de cambios. El compose revisado también se describe para pruebas/desarrollo y monta `src`. No se ha validado como imagen de producción.
- `src/index.html` no declara favicon; la configuración de ejemplo de tema DSpace sí contiene rutas para iconos. La petición a `/favicon.ico` observada debe diagnosticarse con la configuración efectiva y la pestaña Network, antes de decidir una corrección. No se ha comprobado su causa.
- Los 404 de propiedades, 401 de scripts y avisos CommonJS siguen sin diagnóstico confirmado. No cambiar permisos ni suprimir avisos para ocultarlos.

## Matriz de trabajo

| Área | Evidencia o acción | Estado |
|---|---|---|
| Entorno | Registrar commit, SO, Node/npm, UI y versión de API/backend, configuración de tema y REST sin secretos | Pendiente |
| Consola y red | Reproducir favicon, 404 propiedades y 401 sin sesión y con cuenta autorizada; registrar URL, estado y efecto funcional. No compartir tokens/cookies | Pendiente |
| SSR | Build de producción; iniciar servidor SSR, verificar HTML inicial, recarga de rutas y consola; comparar con desarrollo | Pendiente |
| Accesibilidad | Zoom 200 %, lector de pantalla, nombres y foco ES/EN, contraste medido | Pendiente |
| Resiliencia | Red lenta y API inaccesible en entorno de prueba; verificar carga y recuperación | Pendiente |
| Rendimiento | Pesos de bundles y fuentes, transferencia y tiempos; comparar con misma versión, máquina y condiciones; no inferir mejora sin línea base | Pendiente |
| Regresión | Búsqueda, filtros, rutas directas, comunidades/colecciones, ficha, descarga pública, CSV según permisos, archivo restringido y solicitud de copia | Pendiente |
| Datos | Tesis sin entidad, Publication y datos UAGRM de prueba, sin divulgar información restringida | Pendiente de datos/backend |
| Automatización | Registrar instalación, build, lint, unitarias y E2E con resultados y dependencias; no equiparar pruebas anteriores con nuevas | Pendiente |
| Despliegue | Imagen propia reproducible, runtime, secretos externos, logs, health checks, TLS/proxy, copias y restauración/rollback | Pendiente |
| Aceptación | Validación funcional y técnica y autorización antes de producción | Pendiente |

## Primera comprobación local en Windows

Preservar cualquier cambio propio y no cambiar de rama si hay modificaciones que puedan perderse. No publicar capturas de credenciales. Desde PowerShell:

```powershell
cd C:\xampp\htdocs\dspace-angular
git status
git fetch origin feature/uagrm-sprint-06-regression-deployment:refs/remotes/origin/feature/uagrm-sprint-06-regression-deployment
git log -1 --oneline origin/feature/uagrm-sprint-06-regression-deployment
git switch --track origin/feature/uagrm-sprint-06-regression-deployment
node --version
npm.cmd --version
```

Si existen cambios locales o una rama homónima, detenerse y revisar antes de cambiar; no utilizar `reset --hard`. Después de confirmar que la aplicación conserva su configuración REST, iniciar desarrollo con `$env:NODE_OPTIONS="--max-old-space-size=6144"` y `npm.cmd run start:dev`. Abrir la página y recopilar en Network la ruta, estado y efecto visible de cada error. La comprobación SSR se realizará por separado; puede requerir recursos y tiempo de compilación. No se ha ejecutado todavía.

## Límites del inicio

La revisión se realizó por lectura remota del código y comparación de referencias. No se ejecutaron compilación, lint, pruebas ni navegador desde este entorno; no hay backend local ni datos reales disponibles. No se ha modificado el código de la aplicación ni configurado producción. Las pruebas de Sprint 5 informadas por el usuario conservan el alcance documentado en su cierre; los pendientes no están aprobados.
