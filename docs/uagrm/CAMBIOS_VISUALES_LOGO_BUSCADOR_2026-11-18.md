# Identidad UAGRM y buscador visible — 18/11/2026

Rama: `feature/uagrm-visual-brand-search-2026-11-18`.
Base verificada: `backup/sprint-06-avance-2026-11-17` y rama Sprint 6 idénticas en `34a2b34de9d22f9bd094042b146507c4867fb030`.

## Solicitud e implementación

- Sustituir marca tipográfica del header y footer por el logo proporcionado: https://dicit.uagrm.edu.bo/wp-content/uploads/2026/11/logo-uagrm.webp.
- Copia original sin alteraciones en `src/assets/custom/images/logo-uagrm.webp` (1026 × 545, blanco con transparencia). Tamaño adaptable, proporción conservada y texto alternativo; enlaces a inicio. Evita depender del WordPress para cada carga.
- El buscador custom usa su propio template y estilos: campo visible y enfocable desde la carga, borde y placeholder visibles; envío nativo con Enter o botón de lupa. Reutiliza el formulario, ruta de búsqueda y servicio nativos. No usa colapso visual ni click fuera para esconder el campo.
- Diseño móvil con acciones en una fila que puede envolver y buscador adaptable al espacio disponible.

## Datos de ejemplo y administrador: pendientes de backend

El `config/config.yml` versionado apunta a `https://sandbox.dspace.org/server`. El contenido mostrado procede del backend REST, no de archivos de ejemplo dentro de Angular. La configuración runtime o variables del usuario podrían cambiar el destino; comprobar la URL efectiva en Network antes de realizar cualquier acción.

No se eliminaron objetos ni se creó una cuenta en el sandbox público. No se inventaron credenciales ni se modificaron permisos.

Para completar la solicitud:

1. Identificar backend propio: host/URL, versión exacta, sistema operativo y método de instalación. Confirmar si ya existe o hay que instalarlo. Conservar la configuración institucional actual hasta revisar compatibilidad.
2. Si está vacío, conectarlo a esta UI y comprobar un estado sin comunidades ni ítems. No es necesario borrar datos del sandbox.
3. Si contiene ejemplos propios, generar inventario concreto de comunidades, colecciones, ítems y archivos. Identificar contenido institucional que deba conservarse. Respaldar base de datos, assetstore y configuración con posibilidad de restauración antes de borrar.
4. Crear o habilitar la cuenta administradora del backend propio mediante el procedimiento correspondiente a su versión; definir correo con el usuario y establecer la contraseña de forma privada en el servidor. Comprobar pertenencia a Administrator y acceso a gestión. No guardar secretos en Git.
5. Borrar solo los objetos identificados como ejemplos en ese backend, validar desaparición y comprobar los permisos con y sin sesión.

## Validación

- `npm run build` de desarrollo: aprobado con salida 0; build final `50a295d137e7d942`, 18/11/2026. Se observaron avisos NG8113, CommonJS y archivos no utilizados; no se suprimieron. No acredita SSR de producción.
- ESLint sobre templates de header/footer y TS, template y spec de búsqueda: aprobado con salida 0, usando `ESLINT_USE_FLAT_CONFIG=false` para la configuración existente.
- `git diff --check`: aprobado.
- Instalación: `npm ci` falló inicialmente al descomprimir la descarga del binario de Cypress. Repetida con `CYPRESS_INSTALL_BINARY=0`, completó correctamente; Cypress E2E no disponible.
- Pruebas unitarias: bundle compilado; Chromium no inició por `socket() failed: Operation not permitted` del entorno. No hay pruebas ejecutadas/aprobadas. Se agregaron tres pruebas del buscador: disponibilidad inicial y después de blur, envío directo con lupa, envío nativo de formulario. Compilar las pruebas no equivale a aprobarlas. La revisión visual en el navegador del usuario y las pruebas ES/EN, móvil y teclado siguen pendientes.

El Sprint 6 conserva sus comprobaciones pendientes de regresión, SSR y despliegue. Este cambio visual no cierra ese sprint ni supone un despliegue a producción.
