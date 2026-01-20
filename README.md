# Marketing Agent Command Center

Un panel de control integral impulsado por IA para marketers que permite generar estrategias de campaña, variaciones de copia, calendarios de contenido e insights de KPI, con colaboración en tiempo real a través de una interfaz de chat integrada.

## 🚀 Características Principales

### Campaign Brief Form
- Formulario para introducir detalles de campañas de marketing
- Validación de campos requeridos
- Generación automática de insights impulsada por IA

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

## 📋 Estructura del Proyecto

```
src/
├── components/
│   ├── CampaignBrief.tsx
│   ├── OutputsPanel.tsx
│   ├── LiveChat.tsx
│   ├── Header.tsx
│   └── ui/               # Componentes de UI reutilizables
├── hooks/
│   └── use-mobile.ts
├── lib/
│   └── utils.ts
├── styles/
│   └── theme.css
└── App.tsx
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
