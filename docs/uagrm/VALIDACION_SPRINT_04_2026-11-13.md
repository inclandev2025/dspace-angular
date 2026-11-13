# DSpace UAGRM — Continuación y validación del Sprint 4

Fecha: 13/11/2026, Bolivia. Complementa el documento de continuidad adjunto; no registra aceptación funcional.

## Estado comprobado

- Se recuperó el repositorio `https://github.com/inclandev2025/dspace-angular`.
- La rama remota `feature/uagrm-community-item-sprint-04` conserva el commit `9ff994cdc518b88d9453bbecba209b213710d301`.
- Rama de entrega de las pruebas: `test/uagrm-sprint-04-validation-2026-11-13`.
- Se resolvió el error HTTP 403: el repositorio no estaba seleccionado en la instalación del conector GitHub. Tras autorización expresa del usuario, se añadió exclusivamente `inclandev2025/dspace-angular` a la selección existente y se guardó el cambio.
- La rama remota `backup/sprint-04-avance-2026-11-13` ya fue creada y verificada mediante `git ls-remote`; apunta a `9ff994cdc518b88d9453bbecba209b213710d301`. Es un respaldo de avance, sin aceptación funcional del Sprint 4.
- Esta entrega añade pruebas y documentación; no cambia las plantillas publicadas, configuración REST ni dependencias.
- No se dispone aquí del backend local UAGRM ni de `config/config.dev.yml`. La integración real y la aceptación del usuario siguen pendientes. Los sprints 5 y 6 no se han iniciado.

## Pruebas añadidas

24 escenarios nuevos en dos archivos:

| Archivo bajo `src/themes/custom/app/` | Escenarios | Cobertura |
| --- | ---: | --- |
| `uagrm-repository-pages.spec.ts` | 14 | Comunidad y colección: carga, error 500, respuesta correcta, ausencia de payload, redirecciones 401/403 y ruta de acceso denegado |
| `uagrm-document-pages.spec.ts` | 10 | Documento sin entidad y Publication: selección del renderer, delegación de archivos/licencia, enlace a ficha completa y retorno a resultados con query o sesión |

Las pruebas usan las plantillas custom y lógica heredada de navegación/autenticación. Los componentes hijos son sustituidos en estas pruebas aisladas: no certifican descargas, permisos REST efectivos, sanitización de los hijos ni presentación visual. Las pruebas existentes del Sprint 3 también se incluyen en el comando de ejecución.

## Verificación técnica

| Comprobación | Resultado |
| --- | --- |
| `npm ci --no-audit --no-fund` con descarga del binario Cypress omitida | Exit 0; 1751 paquetes instalados. No se ejecutó Cypress |
| Compilación Angular de desarrollo, 6144 MB, sin source maps | Exit 0. Hash `ae6e04934e4e9fab`; 93760 ms |
| ESLint de TS/HTML del Sprint 4 y pruebas nuevas | Exit 0; sin errores. Un aviso por `NoopAnimationsModule` deprecado en las pruebas y aviso de configuración heredada de ESLint |
| Compilación del conjunto de pruebas, incluidas las nuevas | Bundle generado; sin errores TypeScript en el intento final |
| Ejecución Jasmine en ChromeHeadless | Bloqueada por el entorno. Chromium falla al crear un socket: `Operation not permitted`. Ninguna prueba se declara aprobada |
| Integración con backend UAGRM y revisión visual | Pendientes |

Persisten avisos de compilación de dependencias CommonJS, archivos del tema no usados y un import nativo no utilizado. Esta compilación no es SSR ni una build productiva. Node utilizado: 24.22.1; npm: 11.9.0.

## Aplicar esta entrega en Windows

### Obtener la rama de validación desde GitHub

La entrega se publica en `test/uagrm-sprint-04-validation-2026-11-13`, separada del Sprint 4 publicado. Conservar cambios propios antes de cambiar de rama. Para un checkout existente:

```powershell
cd C:\xampp\htdocs\dspace-angular
git status
git fetch origin test/uagrm-sprint-04-validation-2026-11-13:refs/remotes/origin/test/uagrm-sprint-04-validation-2026-11-13
```

Si la rama todavía no existe localmente:

```powershell
git switch --track origin/test/uagrm-sprint-04-validation-2026-11-13
```

Si ya existe localmente, revisar su estado antes de actualizarla:

```powershell
git switch test/uagrm-sprint-04-validation-2026-11-13
git pull --ff-only origin test/uagrm-sprint-04-validation-2026-11-13
```

Si Git indica divergencia, detenerse y comparar los commits; no forzar ni descartar trabajo local. Después ejecutar `npm.cmd ci` y el comando de pruebas incluido más abajo. No aplicar el parche si se usa esta rama.

### Alternativa: paquete descargable anterior

El ZIP entregado antes de resolver el acceso conserva el estado histórico de aquel momento. Contiene `cambios-validacion-sprint-04.patch`, la guía anterior y los logs. Ese parche añade los mismos dos archivos de pruebas, pero la documentación anterior indica que GitHub seguía bloqueado; el estado vigente es el registrado arriba. Elegir una sola vía: rama remota o parche.

1. Extraer el ZIP en una carpeta y abrir PowerShell en el checkout del proyecto.
2. Revisar `git status`. Si hay cambios propios, conservarlos antes de cambiar de rama. No usar reset, clean ni force.
3. Recuperar la rama ya publicada. Si todavía no existe localmente, usar `git switch --track origin/feature/uagrm-community-item-sprint-04`; si existe, usar los comandos siguientes.

```powershell
cd C:\xampp\htdocs\dspace-angular
git status
git fetch origin feature/uagrm-community-item-sprint-04:refs/remotes/origin/feature/uagrm-community-item-sprint-04
git switch feature/uagrm-community-item-sprint-04
git pull --ff-only origin feature/uagrm-community-item-sprint-04
git rev-parse HEAD
```

El SHA debe corresponder al commit documentado. Si difiere, revisar las diferencias antes de aplicar el parche. Con el checkout limpio, crear una rama de validación y ajustar la ruta del parche a la carpeta extraída:

```powershell
git switch -c test/uagrm-sprint-04-validation-2026-11-13
git apply --check C:\RUTA\cambios-validacion-sprint-04.patch
git apply C:\RUTA\cambios-validacion-sprint-04.patch
git status --short
npm.cmd ci
$env:NODE_OPTIONS="--max-old-space-size=6144"
npm.cmd run test -- --watch=false --browsers=ChromeHeadless --include="src/themes/custom/**/uagrm-*.spec.ts"
```

Chrome debe estar instalado. Si no se detecta automáticamente, definir `CHROME_BIN` con su ruta real. Si la rama de validación ya existe, revisarla y usar `git switch` en lugar de crearla otra vez. No aplicar el parche dos veces.

Para revisar la interfaz, conservar la configuración REST que ya funciona con tu backend local y ejecutar:

```powershell
$env:NODE_OPTIONS="--max-old-space-size=6144"
npm.cmd run start:dev
```

Abrir `http://localhost:4000/community-list`. Esta dirección corresponde a la UI; no sustituye el host REST. No se proporcionan hosts ficticios ni credenciales.

## Validación funcional necesaria para cerrar Sprint 4

| Revisión con datos reales | Resultado / observación |
| --- | --- |
| Comunidad, subcomunidad y colección: nombre, logo opcional, jerarquía, navegación y estados vacíos | Pendiente |
| Ficha sin entidad y Publication si existe: título, autores, fecha, resumen, palabras clave y derechos | Pendiente |
| Sin miniatura, metadatos faltantes, título largo y múltiples archivos | Pendiente |
| Archivo público, restringido y solicitud de copia según permisos | Pendiente |
| URI/Handle, colecciones, ficha completa, Atrás, retorno a búsqueda y recarga directa | Pendiente |
| ES/EN, teclado, foco, zoom 200 %, anchos 360/390/768 px y escritorio | Pendiente |
| Inicio, filtros de búsqueda, login sin enlaces retirados y pie sin COAR Notify | Pendiente |
| Comando de pruebas: registrar total ejecutado, fallos y log | Pendiente |
| Aceptación expresa del Sprint 4 por el usuario | Pendiente |

No compartir contraseñas, tokens ni metadatos privados como evidencia. Para una observación basta indicar pantalla/ruta, pasos, resultado esperado y resultado obtenido.

## Cierre y continuación

Las pruebas y esta documentación se entregan en la rama de validación; no se fusionan con la rama base. Tras pruebas satisfactorias y aceptación expresa, crear el respaldo adicional validado conservando los respaldos anteriores y sin sobrescribir ramas existentes. El respaldo remoto de avance ya está creado; no equivale al cierre del sprint.

El siguiente sprint será el 5: accesibilidad, adaptación y rendimiento. Debe partir del Sprint 4 validado. La revisión integrada, SSR/Docker, regresión completa y autorización de producción no quedan resueltas por estas pruebas aisladas.
