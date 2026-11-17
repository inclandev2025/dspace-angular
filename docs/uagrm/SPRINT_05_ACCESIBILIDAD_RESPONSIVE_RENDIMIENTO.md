# Sprint 5 — Accesibilidad, adaptación y rendimiento

Estado: iniciado el 17/11/2026; en curso, sin aceptación ni despliegue.
Base verificada: `backup/sprint-04-validado-2026-11-17` = `090f1c4cdf591b35a3b306a87fdf44a33c121bb4`.
Rama: `feature/uagrm-sprint-05-accessibility`. El respaldo S4 permanece intacto.

## Alcance y criterios de trabajo

Auditar inicio, directorio, comunidad, colección, búsqueda, ficha y acceso. Corregir problemas demostrados sin alterar rutas, servicios, permisos ni identidad aprobada. Verificar teclado, foco, nombres accesibles, jerarquía de encabezados, contraste, errores e imágenes; diseños a 360, 390 y 768 px y escritorio; zoom 200 %, textos largos y ES/EN. Medir recursos, fuentes y bundles antes y después en condiciones comparables; verificar rutas directas, consola y API lenta o caída. Registrar entorno, datos, pasos y resultados. No asignar puntuaciones sin medición.

## Revisión inicial estática

- La cabecera declaraba `role="toolbar"` para controles independientes sin evidenciar una interacción propia de barra de herramientas. Se reemplazó por `role="group"` conservando la etiqueta traducida y los controles. Falta verificar con teclado y lector de pantalla.
- Se observó foco visible global de dos colores, soporte de movimiento reducido para algunos componentes y reglas responsivas existentes. Su presencia en código no demuestra conformidad ni funcionamiento en todas las pantallas.
- El título visible de búsqueda es un párrafo; el encabezado de resultados es `h1`. Revisar jerarquía y estado de carga con el DOM real antes de modificar: el componente de resultados se reutiliza en otros contextos.
- Las miniaturas de resultados vinculadas tienen `tabindex="-1"` y enlace al mismo recurso que el título. Comprobar el árbol accesible, la duplicación y el nombre antes de decidir cambios.

## Matriz de validación pendiente

| Prueba | Procedimiento | Estado |
|---|---|---|
| Teclado y foco | Tab/Shift+Tab, Enter/Espacio y Escape en cabecera, menú, formularios, filtros, resultados, ficha y acceso; observar foco y orden | Pendiente |
| Lectores de pantalla | Revisar nombres, grupos, encabezados, imágenes, mensajes de carga/error y controles de filtro en ES/EN | Pendiente |
| Diseño adaptable | 360/390/768 px y escritorio, textos largos, giro y desbordamiento horizontal | Pendiente |
| Zoom | 200 % con navegación, búsqueda, ficha y acceso utilizables | Pendiente |
| Idiomas | Alternar español/inglés y revisar textos y nombres accesibles | Pendiente |
| Fallos y rutas | Recargar rutas directas; consola; red lenta y API caída, sin operaciones destructivas | Pendiente |
| Rendimiento | Registrar build y pesos de recursos/fuentes/bundles, transferencia, entorno y condiciones antes/después | Pendiente |
| Datos y permisos | Probar tesis UAGRM, Publication, archivos públicos y restringidos cuando estén disponibles; no alterar permisos | Pendiente |

## Evidencia y límites

Revisión inicial exclusivamente del código mediante GitHub. No se ejecutaron build, lint, pruebas automatizadas, navegador, lector de pantalla, mediciones de rendimiento ni pruebas con backend durante este inicio. El cambio requiere validación local. Las 43 pruebas aprobadas pertenecen al Sprint 4 y no acreditan Sprint 5. Conservar la configuración REST del entorno y no registrar secretos.

## Siguiente paso local

Preservar cambios propios con `git status`; obtener la rama sin sobrescribir trabajo y verificar el commit antes de instalar o ejecutar. En Windows:

```powershell
cd C:\xampp\htdocs\dspace-angular
git status
git fetch origin feature/uagrm-sprint-05-accessibility:refs/remotes/origin/feature/uagrm-sprint-05-accessibility
git log -1 --oneline origin/feature/uagrm-sprint-05-accessibility
git switch --track origin/feature/uagrm-sprint-05-accessibility
npm.cmd ci
$env:NODE_OPTIONS="--max-old-space-size=6144"
npm.cmd run start:dev
```

Si la rama local ya existe, revisar su estado e historial antes de cambiar y actualizar solo de forma segura. Ejecutar pruebas de la matriz y registrar evidencias y correcciones sucesivas. Cierre y respaldo final del Sprint 5 después de la validación correspondiente. Sprint 6 sigue pendiente.
