
# Análisis Técnico y Estrategia de Diseño: MecaPlan PRO

## 1. Análisis del Video (Fumiplan PRO)
Basado en el video de referencia, se identifican los siguientes patrones de UX/UI para replicar y adaptar:

- **Estructura de Formulario Lineal:** El usuario avanza verticalmente a través de secciones claramente delimitadas por tarjetas (cards) con sombras suaves.
- **Header Profesional:** Un encabezado persistente con el nombre del software y el logotipo de la empresa, ideal para el requerimiento de *White Label*.
- **Controles de Interacción:**
  - **Grid de Selección Rápida:** La sección de "Evaluación Previa" usa iconos interactivos que cambian de estado al clic. Adaptaremos esto para los 8 servicios mecánicos.
  - **Sliders de Estado:** Se observa un slider para niveles (infestación). Lo usaremos para "Nivel de desgaste" o "Urgencia".
  - **Firmas Digitales:** Dos paneles al final para la validación del técnico y el cliente.
- **Flujo de Trabajo:** Captura de datos -> Diagnóstico -> Ejecución -> Resumen Financiero -> Firma -> PDF.

## 2. Adaptación al Contexto Mecánico (MecaPlan PRO)
- **Servicios Críticos (EPB):** Implementaremos un "Gate Keeper" visual. Si se selecciona "Pastillas EPB", el sistema habilitará un campo de archivo obligatorio con validación visual para el escáner.
- **Iluminación LED:** Crearemos un selector dinámico de Canbus que filtre opciones según la marca del vehículo (lógica precargada).
- **Evidencia con Metadatos:** Cada foto capturada incluirá automáticamente marca de agua de fecha, hora y coordenadas GPS (simuladas por API).

## 3. Arquitectura White Label
- **Dinámica de Branding:** El sistema cargará una configuración JSON que define:
  - `primaryColor`, `secondaryColor`
  - `workshopLogoUrl`
  - `workshopName`
- **Generación de Reportes:** El reporte PDF (maquetado en el componente) será un reflejo fiel de la identidad corporativa.

## 4. Reglas de Negocio Implementadas
- **R1 (EPB):** `if service === EPB AND NOT hasEvidence -> blockSubmit()`
- **R2 (Filtros):** Agrupación lógica de consumibles.
- **R3 (Seguridad):** Checklist obligatorio de inspección visual antes de iniciar labor.
