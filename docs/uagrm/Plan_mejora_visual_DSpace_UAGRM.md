# Plan de mejora visual del Repositorio Institucional DSpace UAGRM

**Fecha:** 22 de octubre de 2026  
**Instancia objetivo:** [dspace.uagrm.edu.bo](https://dspace.uagrm.edu.bo/home)  
**Frontend de referencia:** [DSpace/dspace-angular](https://github.com/DSpace/dspace-angular)

## 1. Objetivo y forma de trabajo

Rediseñar progresivamente la experiencia visual del repositorio institucional sin poner en riesgo la búsqueda, navegación, acceso a documentos, autenticación ni administración de DSpace. Cada sprint debe poder levantarse en un entorno local con Docker, revisarse con usuarios de UAGRM y recibir aprobación antes de iniciar el siguiente. El despliegue a producción queda para después del visto bueno formal del conjunto de cambios.

El proyecto debe tratarse principalmente como una personalización del **frontend Angular**. El backend DSpace, su API REST, los identificadores persistentes, metadatos, bitstreams, indexación y base de datos deben permanecer intactos salvo que el diagnóstico revele un requisito funcional separado.

## 2. Alcance de la revisión y hallazgos verificables

La instancia pública no entregó contenido inspeccionable mediante la consulta de página utilizada para esta revisión. Por ello, este documento **no presenta defectos visuales concretos de la página actual como hechos observados**. La línea base visual de la instancia debe levantarse al inicio del Sprint 0, con capturas en escritorio y móvil y recorrido funcional.

La revisión del repositorio fuente sí permite confirmar lo siguiente:

- DSpace está dividido en un backend Java que expone REST y un frontend Angular/TypeScript. La interfaz consume la API REST; la personalización visual puede concentrarse en el frontend.
- El README de la rama `main` consultada identifica el paquete como `11.0.0-next` y requiere Node.js 20, 22 o 24 y npm 10 o superior. **No se debe asumir que esta rama corresponde a la instalación de UAGRM.** Antes de desarrollar hay que identificar la versión/tag exacto del backend y del UI actualmente desplegados y trabajar sobre el tag/branch compatible.
- El proyecto incluye un tema base `src/themes/dspace` y un espacio de personalización `src/themes/custom`, con estilos Sass y overrides de componentes. Incluye, entre otras áreas, `home-page`, `header`, `footer`, `search-page`, `item-page`, `community-page` y `collection-page`.
- La configuración del UI se puede ajustar en runtime con archivos YAML de `config/` y variables de entorno; el endpoint REST también se define allí. No conviene editar directamente los valores predeterminados en `src/config/default-app-config.ts`.
- El repositorio advierte que su Docker Compose y las imágenes incluidas son para desarrollo/pruebas y no producción listas para usar. Su README explica cómo levantar frontend y backend en Docker y cómo conectar clones locales de ambos proyectos.
- La rama `main` en evolución y la versión desplegada pueden diferir en estructura, dependencias y componentes. Las rutas y prácticas del plan deben cotejarse contra el checkout de la versión real antes de comenzar los overrides.

### Referencias de código

- [README del frontend](https://github.com/DSpace/dspace-angular/blob/main/README.md)
- [Guía Docker del frontend](https://github.com/DSpace/dspace-angular/blob/main/docker/README.md)
- [Dockerfile de desarrollo](https://github.com/DSpace/dspace-angular/blob/main/Dockerfile)
- [Dockerfile de distribución/producción de referencia](https://github.com/DSpace/dspace-angular/blob/main/Dockerfile.dist)
- [Configuración runtime de referencia](https://github.com/DSpace/dspace-angular/blob/main/docs/Configuration.md)
- [Tema personalizado de referencia](https://github.com/DSpace/dspace-angular/tree/main/src/themes/custom)
- [Tema base de referencia](https://github.com/DSpace/dspace-angular/tree/main/src/themes/dspace)
- [Backend DSpace](https://github.com/DSpace/DSpace)

## 3. Principios de diseño propuestos

1. **Identidad institucional:** aplicar la identidad aprobada de UAGRM (logotipo, colores, tipografía y usos permitidos). Confirmar el manual de marca y los archivos oficiales antes de fijar los tokens.
2. **Prioridad académica:** hacer visibles la búsqueda, exploración de comunidades/colecciones, documentos recientes y rutas de acceso a la producción científica.
3. **Legibilidad y confianza:** jerarquía tipográfica clara, contraste adecuado, portadas de buena calidad, metadatos legibles y acciones de descarga evidentes.
4. **Responsive real:** validar navegación, búsqueda, filtros, tarjetas, fichas y tablas desde móvil, tablet y escritorio.
5. **Accesibilidad y rendimiento:** mantener navegación por teclado, foco visible, etiquetas accesibles, textos alternativos, carga eficiente de imágenes y evitar efectos visuales que retrasen el contenido.
6. **Cambios incrementales:** usar el tema personalizado y configuración soportada por la versión instalada; minimizar cambios al tema base y evitar alterar el backend por razones puramente estéticas.

## 4. Sprints propuestos

Se recomienda trabajar en sprints de **1 a 2 semanas**, según disponibilidad de revisión del equipo DICIT/UAGRM. Cada sprint concluye con un entorno local demostrable y un punto de aprobación.

### Sprint 0 — Descubrimiento técnico y línea base

**Objetivo:** reproducir la instalación actual localmente y acordar el alcance visual.

**Tareas**
- Confirmar versiones exactas de DSpace backend y `dspace-angular`, tags/commits, Java, Node, Docker y Docker Compose.
- Revisar `docker-compose.yml`, `.env`, volúmenes, redes, dominios, endpoint REST, configuración de correo y certificados sin exponer secretos en Git.
- Verificar si existe repositorio/fork propio del UI con cambios locales; revisar diferencias antes de reemplazar archivos o actualizar versiones.
- Levantar una copia local con datos de prueba representativos y confirmar autenticación, búsqueda, acceso a bitstreams y enlaces persistentes.
- Documentar línea base visual en desktop/tablet/móvil y recorrer: inicio, búsqueda, filtros, comunidades, colecciones, ficha de ítem, descarga, login, envío (si aplica) y área administrativa.
- Priorizar hallazgos con DICIT: impacto en usuario, esfuerzo, riesgo y criterios de aceptación.

**Entregables**: inventario técnico, mapa de páginas, capturas iniciales, backlog priorizado y procedimiento reproducible para levantar local.

**Criterio de aprobación**: la instancia local funciona y la contraparte aprueba alcance, usuarios principales y prioridades visuales.

### Sprint 1 — Sistema visual e identidad institucional

**Objetivo:** definir una base coherente antes de rediseñar páginas.

**Tareas**
- Crear propuesta de paleta institucional, escalas tipográficas, espaciado, radios, bordes, sombras, botones, enlaces, formularios, estados de foco y componentes de tarjeta.
- Ajustar logo, favicon, fuentes y recursos optimizados, respetando manual de marca.
- Aplicar los tokens al tema personalizado Sass (`src/themes/custom/styles/`) y configurar el tema mediante los mecanismos disponibles en la versión instalada.
- Diseñar estados normales, hover, activo, foco, error, vacío y carga.

**Entregables**: mini guía visual y primera versión ejecutable del tema en local.

**Criterio de aprobación**: DICIT aprueba identidad, contraste, tipografía y consistencia en los componentes básicos.

### Sprint 2 — Inicio y navegación global

**Objetivo:** mejorar la primera impresión y hacer más directas las tareas principales.

**Tareas**
- Rediseñar encabezado, navegación principal, menú móvil y pie de página.
- Mejorar jerarquía de la portada: bienvenida institucional, búsqueda principal, acceso a comunidades/colecciones, estadísticas o contenido destacado solo si los datos disponibles son fiables, y enlaces institucionales útiles.
- Ordenar noticias/recursos/ítems destacados solo si existe contenido mantenible y aprobado.
- Confirmar que los rótulos estén en español y que el selector de idioma y enlaces institucionales funcionen.

**Entregables**: portada y navegación responsive en local.

**Criterio de aprobación**: usuarios de prueba encuentran búsqueda y navegación del repositorio rápidamente desde desktop y móvil.

### Sprint 3 — Búsqueda, resultados y exploración

**Objetivo:** facilitar el descubrimiento de tesis, artículos, libros y otros materiales.

**Tareas**
- Mejorar la caja de búsqueda, sugerencias/placeholder y mensajes de ayuda sin cambiar la lógica REST.
- Reorganizar la página de resultados: título, cantidad, ordenamiento, filtros/facetas, chips de filtros activos, paginación y estado sin resultados.
- Diseñar tarjetas/listas con título, autoría, fecha, tipo documental, colección y miniatura cuando exista.
- Probar términos con tildes, búsqueda parcial, filtros combinados, navegación por páginas y enlaces profundos.

**Entregables**: experiencia de búsqueda local validada con búsquedas reales acordadas.

**Criterio de aprobación**: filtros y ordenamiento conservan el comportamiento funcional y los resultados se entienden en pantallas pequeñas.

### Sprint 4 — Comunidades, colecciones y fichas de documento

**Objetivo:** hacer clara la estructura del repositorio y mejorar la consulta de cada registro.

**Tareas**
- Mejorar listado y páginas de comunidades/colecciones: nombres, descripciones, jerarquía, conteos y navegación de retorno.
- Reorganizar ficha de ítem: título, autores, fecha, resumen, palabras clave, metadatos, colección, identificador Handle/URI y archivos disponibles.
- Dar prioridad visual a acciones de abrir/descargar y datos de licencia/uso cuando estén disponibles.
- Revisar portadas/miniaturas, tamaños de PDF y visualizador, incluyendo comportamiento móvil.

**Entregables**: páginas de comunidad, colección e ítem renovadas.

**Criterio de aprobación**: datos bibliográficos completos y persistentes siguen accesibles; descarga y Handle no se rompen.

### Sprint 5 — Accesibilidad, responsive y rendimiento

**Objetivo:** corregir problemas transversales antes de preparar la publicación.

**Tareas**
- Revisar teclado, orden de tabulación, foco visible, encabezados, nombres accesibles, contraste, mensajes de error y alternativas de imágenes.
- Validar anchos móviles comunes, tablet y desktop; corregir desbordamientos, tablas, menús, filtros y botones.
- Comprimir/optimizar imágenes institucionales, evitar fuentes innecesarias y revisar peso de recursos.
- Probar renderizado inicial, errores de consola, rutas directas, refresco de páginas y funcionamiento cuando la API tarde o esté temporalmente indisponible.

**Entregables**: lista de verificación de accesibilidad, responsive y rendimiento, más correcciones.

**Criterio de aprobación**: los flujos críticos se completan sin mouse, sin contenido cortado en móvil y sin errores funcionales conocidos.

### Sprint 6 — Regresión, aprobación y paquete de despliegue

**Objetivo:** consolidar la versión final aprobada y dejarla lista para el despliegue posterior.

**Tareas**
- Ejecutar pruebas unitarias/lint disponibles y pruebas E2E de flujos críticos contra backend local con datos estables.
- Revisar diferencias contra la versión aprobada y cerrar cambios no incluidos.
- Generar imagen Docker de UI propia versionada, reproducible y separada de las imágenes de desarrollo de referencia.
- Preparar configuración de producción mediante variables/archivo runtime, sin secretos en la imagen ni repositorio.
- Documentar backup/rollback, health check, puertos, proxy inverso/TLS, logs, artefacto/tag, responsable y ventana del deploy.
- Realizar demostración final y obtener visto bueno escrito de DICIT/UAGRM antes de tocar producción.

**Entregables**: release candidate, evidencias de regresión, guía de despliegue/rollback y acta de aprobación.

**Criterio de aprobación**: aprobación escrita del responsable funcional y validación técnica del responsable de infraestructura. El despliegue es una actividad posterior autorizada por ese visto bueno.

## 5. Flujo local recomendado con Docker

1. Respaldar la configuración actual y registrar los tags/commits desplegados. No copiar credenciales de producción a archivos versionados.
2. Clonar la versión **compatible** de `DSpace/DSpace` y `DSpace/dspace-angular` en ramas de trabajo propias; mantener los tags oficiales como referencia.
3. Basarse en Docker Compose oficial para desarrollo local, adaptando los archivos a la versión que corresponda. El README del frontend aclara que las imágenes/compose de referencia son para desarrollo y pruebas, no producción listas para usar.
4. Arrancar backend, base de datos, Solr y demás servicios que indique la configuración de esa versión. Luego iniciar frontend en la misma red Compose o apuntarlo al REST local.
5. Configurar el endpoint REST local en YAML runtime o variables `DSPACE_REST_*`; no apuntar accidentalmente las pruebas al servidor productivo. Usar datos de prueba o una copia anonimizada autorizada.
6. Montar/aplicar los cambios dentro del tema personalizado, reconstruir el frontend y probar en `localhost` (el README actual usa puerto 4000, pero confirmar el mapeo local).
7. Para evaluación más parecida a producción, compilar y levantar una imagen propia de distribución en staging local; guardar etiquetas inmutables y conservar el artefacto que pasó aprobación.

**Nota técnica:** `Dockerfile` de la rama actual ejecuta modo desarrollo con live reload. La guía Docker marca los Compose/imágenes incluidos como recursos de desarrollo/prueba. `Dockerfile.dist` es una referencia para un build de distribución con SSR; no debe tomarse como imagen productiva certificada sin adaptar, revisar y endurecer para el entorno real.

## 6. Estructura sugerida de ramas y aprobaciones

- `main` o `stable`: base compatible con producción, protegida.
- `develop`: integración de cambios de los sprints.
- `feature/sprint-01-identidad`, `feature/sprint-02-inicio`, etc.: trabajo aislado por entrega.
- Tag de release candidate para aprobación local/staging; tag final solo después de aprobación.
- Pull request por sprint con capturas antes/después, resumen, rutas verificadas, pruebas y riesgos conocidos.
- No mezclar actualización mayor de DSpace con un sprint puramente visual, salvo que el análisis de versiones confirme que es imprescindible y se planifique como proyecto separado.

## 7. Lista de control de aceptación por sprint

- [ ] El entorno levanta desde cero siguiendo el README del proyecto.
- [ ] El frontend consulta el backend local esperado y no producción.
- [ ] Portada, menú y las rutas modificadas funcionan en resoluciones móvil, tablet y escritorio.
- [ ] Búsqueda, filtros, paginación, Handle y descarga mantienen su comportamiento.
- [ ] No hay errores nuevos de consola ni regresiones en sesión/autenticación.
- [ ] Navegación por teclado, foco, etiquetas y contraste revisados.
- [ ] Capturas de evidencia y notas de versión disponibles.
- [ ] Visto bueno funcional recibido antes de pasar a producción.

## 8. Riesgos y decisiones por resolver en Sprint 0

| Riesgo o incertidumbre | Acción de control |
|---|---|
| El branch `main` público está en `11.0.0-next`, potencialmente distinto del DSpace UAGRM | Identificar versión exacta de UI/backend y partir de esa release compatible. |
| La página pública no fue inspeccionable durante esta revisión | Tomar capturas y evaluar páginas reales en Sprint 0; ajustar backlog con evidencia. |
| Algunos overrides visuales pueden estar ligados al DOM/estructura Angular | Minimizar CSS frágil; usar puntos de extensión del tema y probar tras cada cambio. |
| Los Compose de referencia no están preparados para producción | Usarlos en local/staging; construir y revisar imagen y configuración productivas propias. |
| Contenido destacado o estadísticas pueden no estar curados/actualizados | Acordar responsables de contenido y fuente de datos antes de incorporarlos a portada. |
| Diferencias entre perfiles de acceso pueden revelar páginas/acciones distintas | Probar visitante, usuario autenticado y administrador con cuentas de prueba autorizadas. |

## 9. Secuencia de decisión

1. Completar Sprint 0 y confirmar compatibilidad de versiones.
2. Presentar y aprobar la guía visual.
3. Implementar portada/navegación, búsqueda, fichas y ajustes transversales en sprints independientes.
4. Probar cada sprint en local y solicitar visto bueno antes de continuar.
5. Cerrar regresión y generar release candidate.
6. Con aprobación final, coordinar el deploy y conservar un plan de rollback.

## 10. Fuentes consultadas

- Repositorio fuente Angular de DSpace: https://github.com/DSpace/dspace-angular
- README (requisitos, configuración, pruebas, estructura y Docker): https://github.com/DSpace/dspace-angular/blob/main/README.md
- Configuración del UI: https://github.com/DSpace/dspace-angular/blob/main/docs/Configuration.md
- Docker de desarrollo/pruebas: https://github.com/DSpace/dspace-angular/blob/main/docker/README.md
- Tema personalizado: https://github.com/DSpace/dspace-angular/tree/main/src/themes/custom
- Tema DSpace base: https://github.com/DSpace/dspace-angular/tree/main/src/themes/dspace
- Repositorio backend: https://github.com/DSpace/DSpace

---

**Estado:** plan inicial basado en revisión del repositorio fuente y contexto del proyecto. La evaluación visual concreta de la instancia y la planificación final del backlog quedan sujetas al levantamiento del Sprint 0.

## 11. Bitácora de ejecución — Sprint 0

**Revisión inicial del espacio de trabajo: 22 de octubre de 2026**

- Node.js disponible: `v24.19.0`, dentro del rango que admite la rama actual de referencia del frontend.
- Docker CLI y Docker Compose no están instalados en este espacio de ejecución, por lo que no se puede levantar aquí el stack local.
- No hay checkout del backend ni del frontend, ni archivo `docker-compose.yml` del proyecto en el espacio de trabajo.
- El contexto del proyecto indica DSpace 9 con HTTPS; falta confirmar el parche exacto y el tag/commit de `dspace-angular` desplegado.
- No se pudo capturar una línea base visual directamente desde la instancia durante la revisión inicial.

**Estado:** Sprint 0 iniciado; inventario local incompleto. No se realizaron cambios en la instancia productiva.

**Para completar el levantamiento y arrancar el entorno local**, se necesita disponer de al menos una de estas opciones:

1. El repositorio/paquete de despliegue que actualmente usa UAGRM, incluyendo el `docker-compose.yml` (sin contraseñas, tokens ni claves), o
2. Los tags/commits exactos del backend y frontend más los archivos Compose correspondientes a esa versión.

Además, se debe confirmar si el desarrollo se hará en la computadora local del responsable con Docker instalado. Con esos insumos se puede reproducir la instalación compatible, validar la conexión REST local y continuar a la toma de línea base visual.


## 12. Avance del Sprint 1 — 22/10/2026

El usuario confirmó clonación y ejecución local satisfactoria. Fork de trabajo:
https://github.com/inclandev2025/dspace-angular

Rama: `feature/uagrm-visual-theme-sprint-01`, basada en `dspace-9_x`
(`9.5.0-next`). Se implementan activación de tema, tokens visuales,
componentes básicos, foco accesible, corrección de menús y cabecera textual UAGRM.
La guía de entrega, pruebas y recuperación está en [SPRINT_01.md](SPRINT_01.md).

Estado: pendiente de revisión local de esta entrega y visto bueno DICIT.
Escudo/favicon oficiales y versión exacta institucional siguen pendientes.
No se ha desplegado ni fusionado en producción. Las limitaciones del registro
anterior corresponden al momento de la investigación inicial; ya existe una
copia de trabajo del frontend y se instalaron dependencias para verificar el tema.


## 13. Respaldo y Sprint 2 — 22/10/2026

El usuario aprobó visualmente el Sprint 1. Respaldo remoto:
`backup/sprint-01-aprobado-2026-10-22`, SHA
`6068fafe36d1e3b824ee7c2660d0e24208ab33f2`.

Se desarrolla la portada, navegación móvil, pie institucional y traducciones en
`feature/uagrm-home-navigation-sprint-02`. Datos de comunidades y publicaciones
provienen de los componentes originales de DSpace. No se agregan estadísticas
ficticias ni noticias de ejemplo. Ver [SPRINT_02.md](SPRINT_02.md) para pruebas
locales y recuperación. Estado: entrega pendiente de revisión local del Sprint 2.
