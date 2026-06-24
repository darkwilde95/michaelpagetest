# Micrositio de Solicitud Digital de Crédito

## 1. Descripción

Este proyecto consiste en el desarrollo de un micrositio para la originación digital de créditos de libre destino. La solución integra un frontend moderno con Next.js y un backend robusto construido en NestJS, enfocado en la trazabilidad, la experiencia de usuario y la calidad técnica.

## 2. Decisiones de Arquitectura y Tecnologías

- **Rendering**: Estrategia híbrida. Uso de React Server Components para layouts (headers, footers) y páginas estáticas (landing) para maximizar la performance. Implementación de Client Components en los flujos transaccionales (formularios multipaso) para garantizar una experiencia fluida e interactiva.
- **Gestión de Estado**: Abordaje minimalista sin librerías externas de estado. La persistencia temporal se maneja mediante comunicación directa entre componentes y peticiones PATCH a los endpoints del backend, asegurando la integridad de datos ante refrescos de página.
- **Stack Tecnológico**:
  - **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS.
  - **Backend**: NestJS con TypeScript.
  - **Validación**: Zod (Frontend) y class-validator/class-transformer (Backend) para garantizar la consistencia de los DTOs.
  - **Consumo de API**: fetch nativo de Next.js, aprovechando su caché optimizada y configuración extendida.

## 3. Uso de IA y Metodología

Para optimizar el tiempo de entrega, se utilizó Gemini bajo una metodología de trabajo supervisada:

- **Generación**: Apoyo en la estructura del README, diseño de estilos base (Tailwind) y generación de código repetitivo.
- **Validación**: Todo el código generado por IA fue revisado, refactorizado y validado manualmente. Las reglas de validación (DTOs) fueron definidas estrictamente para asegurar que la información procesada sea la requerida por el negocio.

## 4. Historias Técnicas

### H1: Gestión de Formulario Multipaso

- **Descripción**: Implementación de flujo de captura de datos con persistencia transaccional.
- **Criterios de Aceptación**:
  - **Persistencia de estado**: Capacidad de guardar el progreso de la solicitud en cualquier etapa del formulario, permitiendo al usuario abandonar el proceso y retomarlo posteriormente mediante la recuperación de datos desde el backend.
  - **Navegación**: Navegación fluida entre pasos sin pérdida de información en la sesión.
  - **Validación**: Validaciones en tiempo real mediante esquemas de Zod.
- **Seguridad**: Sanitización de inputs en cliente y validación de tipos estricta antes de la persistencia.

### H2: Integración Frontend-Backend

- **Descripción**: Consumo de servicios REST simulando el core bancario.
- **Criterios de Aceptación**:
  - Consumo exitoso de endpoints definidos en el contrato.
  - Manejo de estados: loading, error (funcional/técnico) y success.
  - Uso de fetch nativo para aprovechar las optimizaciones de Next.js.
- **Seguridad**: No exposición de secretos y manejo de errores sin revelar detalles de infraestructura al usuario.

### H3: Estrategia de Rendering y Performance

- **Descripción**: Optimización de la carga mediante Server Components.
- **Criterios de Aceptación**:
  - Landing page con bajo tiempo de carga (First Contentful Paint).
  - Separación clara entre componentes estáticos y dinámicos.
  - Navegación intuitiva y responsive.

## 5. Contratos API

Estructura de endpoints utilizada para la comunicación con el backend:

- POST /applications: Crear solicitud.
- GET /applications: Listar solicitudes con filtros.
- GET /applications/{id}: Consultar detalle.
- PATCH /applications/{id}: Actualizar datos.
- POST /applications/{id}/simulate-offer: Obtener simulación preliminar.
- POST /applications/{id}/finalize: Finalizar solicitud.
- POST /applications/{id}/abandon: Abandonar solicitud.
- GET /applications/{id}/events: Consultar trazabilidad de eventos.

## 6. Limitaciones y Consideraciones

Debido a la limitación de tiempo, la prioridad se centró en la funcionalidad crítica y la robustez de la integración. Por este motivo, la cobertura de pruebas automatizadas es menor a la deseada; sin embargo, el flujo principal y la integridad de los datos han sido validados funcionalmente.

## 7. Diseño del Backend (NestJS)

El backend fue diseñado bajo principios de integridad bancaria y trazabilidad. Se priorizó:

- **Estrategia de Estado:** Se implementaron validaciones de ciclo de vida en `ApplicationsService`. Una solicitud no puede ser modificada si su estado es `FINALIZED` o `ABANDONED`, garantizando la inmutabilidad de los datos en estados finales.
- **Trazabilidad (Audit Log):** Se integró un servicio dedicado a la auditoría, capturando eventos críticos (creación, edición, simulación, abandono). Esto permite al negocio reconstruir la línea de tiempo de cualquier solicitud para fines de soporte.
- **Testing de Resiliencia:** Se configuró un caso de prueba en el endpoint de simulación de oferta: al solicitar un monto de `999999`, el sistema dispara un error 500 intencional, permitiendo validar la correcta gestión de errores técnicos (errores no controlados) en el frontend.
- **Validaciones Rigurosas:** Uso de `class-validator` y `class-transformer` para asegurar que los DTOs recibidos cumplan estrictamente con las reglas de negocio antes de ser procesados.

## 8. Contratos API

La API expone los siguientes recursos principales (detalles de esquemas en directorios `/src/dto/`):

| Endpoint                            | Método  | Descripción                                      |
| :---------------------------------- | :------ | :----------------------------------------------- |
| `/applications`                     | `POST`  | Creación de solicitud (`CreateApplicationDto`).  |
| `/applications`                     | `GET`   | Listado con filtros (`FilterApplicationsDto`).   |
| `/applications/{id}`                | `PATCH` | Actualización de datos (`UpdateApplicationDto`). |
| `/applications/{id}/simulate-offer` | `POST`  | Simulación. Provoca error 500 con monto 999999.  |
| `/applications/{id}/finalize`       | `POST`  | Transición a estado final.                       |
| `/applications/{id}/abandon`        | `POST`  | Registro de abandono (`AbandonApplicationDto`).  |
| `/applications/{id}/events`         | `GET`   | Consulta histórica de trazabilidad.              |

## 9. Decisiones de Diseño y Futuras Mejoras

- **Patrón de persistencia:** Se optó por una arquitectura de servicios limpia que separa la lógica de negocio de la persistencia de eventos, facilitando la escalabilidad a una base de datos real (ej. PostgreSQL) en el futuro.
- **Mejoras pendientes:** Para optimizar la seguridad y el formato de las respuestas, se recomienda implementar `ClassSerializerInterceptor` para excluir campos sensibles en las respuestas HTTP y estandarizar el "Enveloping" de las respuestas JSON (data/meta).
