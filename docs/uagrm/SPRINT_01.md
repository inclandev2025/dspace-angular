# Sprint 1 — Base visual UAGRM

Estado: implementación para revisión local; aprobación DICIT pendiente.
Rama: `feature/uagrm-visual-theme-sprint-01`.
Base de trabajo: `dspace-9_x`, versión del paquete `9.5.0-next`.
Fecha: 22 de octubre de 2026.

## Entrega

- Tema `custom` seleccionado desde `config/config.yml`; idioma de reserva español.
- Cabecera con identificación textual UAGRM y acento rojo. Conserva búsqueda,
  idiomas, ayuda, autenticación y menú móvil de DSpace.
- Tipografía de sistema, jerarquía de títulos, espaciado, botones, formularios
  y tarjetas coherentes; foco de teclado visible sobre superficies claras y azules.
- Corrección de enlaces blancos sobre los fondos blancos de menús y submenús.
- Respeto de la preferencia de movimiento reducido en componentes básicos.
- Sin cambios de dependencias, endpoints REST, datos o lógica de depósito.

La identificación textual es provisional: no sustituye un escudo oficial.
La paleta es la propuesta del proyecto y requiere aprobación institucional.
Escudo, favicon, manual de marca y validación visual institucional siguen pendientes.
La portada, el pie y las traducciones de marca a otros idiomas se trabajan en Sprint 2.

## Mini guía visual

| Elemento | Valor / uso |
| --- | --- |
| Azul principal | `#003b9e`, enlaces, navegación y acciones principales |
| Rojo institucional | `#ff000d`, acento decorativo; no texto pequeño blanco/rojo |
| Texto | `#243247` sobre blanco |
| Títulos | `#142b50`, peso 600, interlineado 1.25 |
| Superficie secundaria | `#f4f7fc` |
| Borde de campos | `#7b8798` |
| Tipografía | system-ui, -apple-system, Segoe UI, sans-serif; base 1rem |
| Interlineado | 1.6 para texto |
| Espaciado | .25, .5, 1, 1.5 y 2rem |
| Botones / campos | Radio .5rem; relleno .625rem × 1rem |
| Tarjetas | Radio .75rem; relleno 1.25rem; sombra tenue |
| Foco | Contorno azul de 3px y separación blanca |
| Estados | Bootstrap conserva hover, active, disabled, valid e invalid |
| Carga / vacío | Se conservan componentes y mensajes funcionales de DSpace |

Contrastes calculados mediante luminancia sRGB: azul/blanco 9.91:1;
texto/blanco 12.95:1; borde de campos/blanco 3.65:1.
Estos cálculos no constituyen una auditoría completa de accesibilidad.

## Actualizar en Windows PowerShell

Detener el servidor local con Ctrl+C. Revisar `git status` y conservar cualquier
cambio propio antes de cambiar de rama. No usar `reset --hard`.

```powershell
cd C:\xampp\htdocs\dspace-angular
git fetch origin
git switch feature/uagrm-visual-theme-sprint-01
git pull --ff-only origin feature/uagrm-visual-theme-sprint-01
npm.cmd run start:dev
```

No hace falta reinstalar dependencias si ya están instaladas y no cambió el lockfile.
Abrir `http://localhost:4000/home` y hacer recarga completa.

### Si todavía aparece el tema anterior

Un `themes:` en `config.dev.yml`, `config.development.yml`, `.env`, variables de
entorno o un archivo indicado por `DSPACE_APP_CONFIG_PATH` puede tener prioridad.
En el archivo local que ya utilizas, sustituir únicamente el bloque `themes`
por lo siguiente, conservando tus ajustes de REST y UI:

```yaml
themes:
  - name: custom
    prefetch: true
fallbackLanguage: es
```

No duplicar claves YAML. Reiniciar el servidor. El idioma de reserva no reemplaza
la selección de idioma que el usuario ya guardó en el navegador.

## Validación para el visto bueno

Registrar navegador, resolución, commit (`git rev-parse HEAD`) y capturas.

- [ ] Cabecera identifica UAGRM y su enlace abre `/home`.
- [ ] Texto, botones y formularios son legibles a 100% y 200% de zoom.
- [ ] Probar anchos 360, 768 y 1440px: sin solapamientos ni pérdida de controles.
- [ ] Abrir menú móvil, submenús, selector de idioma y autenticación.
- [ ] Recorrer cabecera, formulario y resultados con Tab / Shift+Tab; foco visible.
- [ ] Ejecutar búsqueda con y sin resultados; verificar estados de carga y vacío.
- [ ] En entorno de pruebas, verificar un formulario con error y campos deshabilitados.
- [ ] Abrir comunidad, colección, ítem y descargar un archivo permitido.
- [ ] Confirmar que el estilo de errores y acciones destructivas conserva su significado.
- [ ] Revisar consola del navegador y registrar errores nuevos.
- [ ] Aprobar paleta, tipografía y componentes; incorporar escudo/favicon oficiales.

## Verificación técnica

- `npm ci --no-audit --no-fund`: instalación correcta, sin modificar el lockfile.
  En el entorno de desarrollo del asistente se omitió descargar el binario de Cypress.
- Compilación completa del tema Sass: correcta (resolución de imports `~` equivalente a Webpack).
- `git diff --check`: correcto.
- Compilación Angular y comprobaciones finales: consultar la bitácora al final de este documento.
- Pruebas funcionales contra el backend local y aprobación institucional: pendientes.

## Recuperación y siguientes pasos

Para comparar con el estado anterior sin borrar trabajo, crear otro directorio:

```powershell
git worktree add --detach ..\dspace-angular-antes-sprint1 293508926fb1b62d5efc5037673e0f2e45b45d19
```

Cada entrega se guarda en commits en la rama del sprint. Tras el visto bueno,
revisar el diff y preparar la integración sobre la rama compatible con producción.
No fusionar automáticamente contra `main`, que pertenece a una línea distinta.
Antes del deploy: confirmar versión exacta de backend/frontend institucional,
elegir release compatible (esta base es `-next`), compilar producción/SSR,
validar Docker y documentar reversión. Este sprint no ejecuta deploy.


## Bitácora técnica final

- Node `24.19.0`. Instalación de dependencias: correcta.
- Compilación Angular de desarrollo: **correcta**, hash `abe0e37ac65bbbe3`.
  Se ejecutó con `NODE_OPTIONS=--max-old-space-size=6144`,
  `NG_BUILD_MAX_WORKERS=2` y `npm run build -- --source-map=false`.
  El primer intento con el límite automático de memoria terminó en OOM.
- Se generaron `custom-theme.css` y el módulo de la cabecera personalizada.
- El compilador informó advertencias de dependencias/archivos de tema no usados;
  el proceso finalizó con código 0. No se cambió el lockfile.
- Producción/SSR, Docker y pruebas funcionales con REST institucional: no ejecutados.
- La nueva entrega requiere validación local y aprobación; la prueba local
  confirmada por el usuario corresponde a la versión anterior.

Si tu compilación local también agota memoria y el equipo dispone de ella:

```powershell
$env:NODE_OPTIONS='--max-old-space-size=6144'
$env:NG_BUILD_MAX_WORKERS='2'
npm.cmd run build -- --source-map=false
```
