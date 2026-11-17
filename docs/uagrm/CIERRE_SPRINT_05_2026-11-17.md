# Sprint 5 — Cierre de validación y pendientes

Fecha: 17/11/2026 (Bolivia). El usuario validó las pruebas realizadas y solicitó respaldo y continuidad.

## Resultados comunicados por el usuario

- Navegación con teclado: correcta, según su validación.
- Adaptación a tamaños de pantalla: correcta, según su validación; no se registraron individualmente los anchos probados.
- Cambio entre español e inglés: respetado.
- Búsqueda en sandbox: la captura muestra 29 resultados para «social».
- Archivo público: el usuario confirmó descarga normal y adjuntó captura del PDF abierto.
- La validación utilizó contenido del sandbox, no tesis o comunidades UAGRM reales.

## Alcance de la evidencia y pendientes

No se dispone de confirmación específica de zoom al 200 %, lector de pantalla, contraste medido, métricas antes/después de recursos y bundles, API lenta/caída, rutas directas, exportación CSV o archivos restringidos. Retomar estas pruebas en Sprint 6; no atribuirles una aprobación. Tampoco se ejecutaron compilación, lint ni pruebas automatizadas nuevas desde el entorno del asistente para Sprint 5. Las 43 pruebas aprobadas corresponden a Sprint 4.

En consola de desarrollo se observaron 404 de favicon local y propiedades del sandbox `google.analytics.key` y `bulkedit.export.max.items`, además de 401 para scripts `metadata-import` y `metadata-export`. Investigar en el entorno correspondiente; no concluir sin comprobar si los 401 son esperados para visitantes o si el 404 de exportación afecta la función. Se observaron advertencias NG05001 y NG0505 en modo desarrollo, así como avisos de compilación y CommonJS. Revisar SSR con su ejecución apropiada durante Sprint 6.

## Cambio de Sprint 5

La cabecera usa `role="group"` en lugar de `role="toolbar"` para sus controles independientes. Se mantiene la etiqueta traducida y el diseño. Verificación con lector de pantalla pendiente.

## Estado

El usuario acepta las pruebas descritas y pide respaldar el sprint. Cierre de validación parcial: los puntos no comprobados quedan explícitamente abiertos para Sprint 6. No hay despliegue a producción.
