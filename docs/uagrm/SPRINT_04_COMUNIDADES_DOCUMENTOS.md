# Sprint 4 — Comunidades, colecciones y documentos

Estado: implementación para revisión local. El usuario confirmó el cierre de la validación local del Sprint 3 el 10/11/2026. Pendiente de aceptación del Sprint 4; no desplegado.

Base: c4be29d2f553e0802d0a1d7339835436a725ef4d. Rama: feature/uagrm-community-item-sprint-04. Los respaldos anteriores se conservan.

## Implementación

- Plantillas propias basadas en las originales de DSpace para comunidades y colecciones: cabecera institucional, etiqueta del tipo, retorno al directorio, panel de navegación, jerarquía y contenido nativo.
- Fichas de documento y Publication: cabecera, panel lateral de archivos/datos y contenido de resumen/metadatos adaptables. Acceso nativo a metadatos completos, colecciones y URI conservado.
- Derechos dc.rights y licencia Creative Commons cuando existen. Publication utiliza también el componente nativo de licencia.
- Cinco textos nuevos ES/EN, sincronizados entre tema y catálogos runtime.
- Registro explícito de los renderers custom de documento/Publication en el módulo eager. No habilitar todo CustomEagerThemeModule, pues activaría overrides ajenos.
- Estilos restringidos a .uagrm-repository-page y .uagrm-document-page. Sin cambios de backend, permisos, rutas, paquetes ni configuración REST.

## Verificación del 10/11/2026

- Compilación Angular completada, exit 0: NODE_OPTIONS=--max-old-space-size=6144 npm run build -- --source-map=false. El intento inicial con memoria por defecto se agotó. Permanecen avisos heredados de compilación.
- ESLint de TypeScript y HTML modificados: sin errores, exit 0. Se corrigió el formato de imports antes de la comprobación final. git diff --check sin errores.
- Las pruebas de búsqueda compilaron, pero ChromeHeadless no arrancó por restricción del entorno (socket Operation not permitted). No afirmar que se ejecutaron o pasaron en esta entrega.
- Pendiente revisión visual integrada y funcional contra backend UAGRM. La compilación no reemplaza esta aceptación.

## Prueba local

Conservar cambios locales antes de cambiar de rama. Para clones limitados:

```powershell
git fetch origin feature/uagrm-community-item-sprint-04:refs/remotes/origin/feature/uagrm-community-item-sprint-04
git switch --track origin/feature/uagrm-community-item-sprint-04
npm.cmd ci
$env:NODE_OPTIONS="--max-old-space-size=6144"
npm.cmd run start:dev
```

Si ya existe la rama local, usar git switch feature/uagrm-community-item-sprint-04 y git pull --ff-only origin feature/uagrm-community-item-sprint-04 en lugar de crearla de nuevo.

- [ ] Abrir /community-list, una comunidad, subcomunidad y colección con datos reales. Verificar jerarquía, navegación, pestañas y estados vacíos/carga/error.
- [ ] Abrir un documento sin entidad y uno Publication, cuando exista. Revisar autores, fecha, resumen, palabras clave, URI, colecciones, derechos y metadatos completos.
- [ ] Probar documento con/sin miniatura y con datos ausentes; revisar archivos públicos, restringidos y solicitud de copia sin alterar permisos.
- [ ] Verificar retorno a resultados y breadcrumbs nativos.
- [ ] Revisar ES/EN, teclado, foco, zoom 200 %, móvil 360/390 px, tablet y escritorio.
- [ ] Regresión del inicio, búsqueda, login y pie aprobados.
- [ ] Ejecutar pruebas específicas con Chrome local y registrar observaciones y aceptación.

Tras aprobación crear respaldo validado adicional. Sprint 5 y Sprint 6 siguen pendientes.
