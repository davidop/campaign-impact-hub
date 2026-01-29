# Marketing Agent Command Center

Un panel de control integral impulsado por IA para marketers que permite generar estrategias de campaña, variaciones de copia, calendarios de contenido e insights de KPI, con colaboración en tiempo real a través de una interfaz de chat integrada.

## 🚀 Características Principales

### Smart Campaign Brief Wizard
- **Formulario multi-paso intuitivo** para capturar detalles de campaña
- **Sistema de puntuación en tiempo real (0-100)** que evalúa la calidad del brief
- **Detección inteligente de huecos críticos** antes de generar la campaña
- **Modal de Preguntas Rápidas** que completa automáticamente información faltante
- Validación contextual y recomendaciones accionables

### Intelligent Gap Detection System
El sistema detecta 8 tipos de huecos críticos y genera preguntas contextuales:

1. **Precio Faltante** - Solicita rango de precio cuando no está definido
2. **USP Débil/Ausente** - Ofrece 4 hipótesis de valor único para elegir
3. **Sin Prueba Social** - Multiselección de 5 tipos de evidencia (reviews, cifras, casos, garantías, certificaciones)
4. **Audiencia Vaga** - Pide definir 1-2 segmentos prioritarios cuando la descripción es muy genérica
5. **Canales Pagados sin Presupuesto** - Pregunta por presupuesto mínimo cuando hay Google/Facebook/LinkedIn seleccionados
6. **Canales Pagados sin KPI** - Ofrece objetivos paid (CPA/ROAS/CPL/CTR) cuando no están definidos
7. **Sector Regulado - Claims** - Detecta sectores como financiero/salud y pregunta por claims permitidos/prohibidos
8. **Sector Regulado - Legal** - Solicita requisitos legales obligatorios (GDPR, disclaimers, etc.)

### Quick Questions Modal
- **Interfaz multi-paso** con indicador de progreso
- **4 tipos de input**: texto, textarea, select, multiselect
- **Navegación flexible** con botones anterior/siguiente
- **Preguntas opcionales** que se pueden omitir
- **Respuestas auto-integradas** al brief automáticamente

### Strategy Output Panel
- Muestra estrategia de marketing generada por IA
- Incluye recomendaciones clave, enfoque del público objetivo, estrategia de canales y asignación de presupuesto

### A/B Copy Variations
- Genera dos variaciones de copia para pruebas comparativas
- Presenta versión A vs Versión B lado a lado
- Ayuda a marketers a probar diferentes enfoques de mensajería

### Content Calendar
- Calendario de contenido generado por IA
- Planificación de publicaciones por canal

### Live Chat Interface
- Chat en tiempo real con agente de IA
- Historial de conversación persistente
- Indicadores de estado en vivo

## 🛠 Stack Tecnológico

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Componentes UI**: GitHub Spark + Radix UI
- **Styling**: Tailwind CSS 4
- **State Management**: TanStack React Query
- **Forms**: React Hook Form
- **Icons**: Phosphor Icons
- **API**: Octokit (GitHub API)

```
src/
├── components/
│   ├── BriefWizard.tsx        # Wizard multi-paso con scoring
│   ├── QuickQuestionsModal.tsx # Modal de preguntas inteligentes
│   ├── BriefScoreCard.tsx     # Tarjeta de puntuación en tiempo real
│   ├── ModularOutputsPanel.tsx
│   ├── VariationLab.tsx
│   ├── BrandKitEditor.tsx
│   ├── WarRoomChat.tsx
│   ├── Header.tsx
│   └── ui/                     # Componentes de UI reutilizables (shadcn)
├── hooks/
│   └── use-mobile.ts
├── lib/
│   ├── briefGapDetector.ts    # Lógica de detección de huecos
│   ├── types.ts               # Tipos TypeScript
│   ├── i18n.ts                # Traducciones ES/EN
│   └── utils.ts
├── styles/
│   └── theme.css
└── App.tsx
```

## 🎯 Cómo Usar el Sistema de Preguntas Rápidas

1. **Completa el Brief**: Llena los campos del formulario en los 5 pasos
2. **Presiona "Generar Campaña"**: El sistema analiza automáticamente tu brief
3. **Responde las Preguntas**: Si detecta huecos críticos, aparecerá el modal con 3-6 preguntas
4. **Navegación Flexible**: Puedes ir atrás, omitir preguntas opcionales, o completar todo
5. **Generación Automática**: Al completar, las respuestas se integran y la campaña se genera

### Ejemplos de Triggers

- ❌ **Precio vacío** → "¿Cuál es el rango de precio?"
- ❌ **USP corto** → "Elige tu propuesta de valor" (4 opciones)
- ❌ **Sin prueba social** → "¿Qué evidencia tienes?" (multiselect)
- ❌ **Audiencia genérica** → "Define 1-2 segmentos prioritarios"
- ❌ **Google Ads sin presupuesto** → "¿Cuál es el presupuesto mínimo?"
- ❌ **Paid sin KPI** → "Objetivo principal: CPA, ROAS, CPL o CTR?"
- ❌ **Producto financiero** → "¿Qué claims están permitidos/prohibidos?"

## 📋 Estructura del Proyecto

```

## 🎨 Diseño

- **Inspiración**: Paleta cyberpunk con acentos eléctricos sobre fondos oscuros
- **Colores Primarios**: Púrpura eléctrico y Rosa neón
- **Tipografía**: Space Grotesk para títulos, fuente monoespaciada para KPIs
- **Tema**: Glassmorphic panels, gradientes animados, efectos de refracción

## 🚀 Primeros Pasos

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Preview de build
npm run preview
```

## 📄 Licencia

Los archivos y recursos de Spark Template de GitHub están licenciados bajo los términos de la licencia MIT, Copyright GitHub, Inc.
