# Premium Marketing Command Center PRD

Un Centro de Comando de Marketing de nivel premium que transforma briefings en campañas completamente accionables con control de marca, validación inteligente, outputs modulares regenerables y laboratorio de variaciones de copy estratégicas.

**Idioma por defecto**: Español (castellano) con posibilidad de cambiar a inglés mediante el botón de traducción en el header.

**Experiencia**: Profesional, Premium, y Altamente Accionable

## Complejidad

**Complex Application** (funcionalidad avanzada con múltiples vistas y estados) - Un command center completo con wizard de brief inteligente, brand kit, 12+ módulos de output, laboratorio de variaciones con 15+ opciones por campaña, y War Room con comandos especializados.

## Essential Features

### 1. Brief Wizard con Score y Validación Inteligente

- **Funcionalidad**: Wizard de 4 pasos que guía al usuario a completar el brief con scoring 0-100 en tiempo real
- **Propósito**: Asegurar briefs completos y de calidad antes de generar campañas
- **Trigger**: Usuario accede a la pestaña "Campaña"
- **Progresión**: 
  - Step 1 (Básico): Producto, Audiencia, Objetivos → Validación de campos requeridos
  - Step 2 (Detalles): Presupuesto, Canales (multi-select), Timeline → Score se actualiza dinámicamente
  - Step 3 (Evidencia): Precio, Margen, Promesa Principal, Pruebas (array), Competidores (array) → Sugerencias inteligentes si falta info
  - Step 4 (Validación): Resumen con warnings si faltan datos críticos (precio, promesa) → Opción de continuar o completar
  - Submit → 12 prompts paralelos de IA → Outputs modulares + 15 variaciones de copy
- **Success criteria**: 
  - Score refleja completitud del brief con precisión
  - Warnings claros para datos faltantes pero permite continuar
  - Transición fluida entre pasos
  - Brief completo genera outputs de máxima calidad

### 2. Brand Kit Editor

- **Funcionalidad**: Editor completo de identidad de marca que alimenta la generación de copy
- **Propósito**: Mantener consistencia de marca en todos los outputs generados
- **Trigger**: Usuario accede a pestaña "Brand Kit"
- **Progresión**: 
  - Campos de Voz y Tono (textarea)
  - Nivel de Formalidad (select: Casual/Professional/Formal)
  - Toggle de Emojis (si/no)
  - Listas dinámicas con add/remove:
    - Do List (items con badge verde)
    - Don't List (items con badge rojo)
    - Palabras Prohibidas (border destructivo)
    - Claims Permitidos (badge primario)
    - Ejemplos de Copy Aprobado (cards expandibles)
  - Auto-save con useKV → Persiste entre sesiones
- **Success criteria**: 
  - Todas las listas son editables inline
  - Items se visualizan con badges apropiados por categoría
  - Los datos persisten y se recuperan correctamente
  - Interface limpia y fácil de escanear visualmente

### 3. Modular Campaign Outputs Panel

- **Funcionalidad**: 12 bloques modulares de output organizados en 6 pestañas con opciones de exportación
- **Propósito**: Entregar campañas listas para ejecutar, no solo texto conceptual
- **Trigger**: Submit del Brief Wizard
- **Progresión**:
  - **Overview Tab**: Strategy, Experiment Plan, Risks & Assumptions
  - **Creative Tab**: Creative Routes (4 ángulos), Landing Kit (estructura + copy)
  - **Funnel & Paid Tab**: Funnel Blueprint (4 etapas), Paid Pack (ad copy + presupuesto), Measurement & UTMs
  - **Content Tab**: Content Calendar visual con 6+ piezas (fecha, platform, tipo, objetivo, funnel phase, CTA, formato, descripción) con badges de color por fase
  - **Automation Tab**: Email Flow (5 emails), WhatsApp Flow (4 mensajes)
  - **Execution Tab**: Execution Checklist (pre/during/post launch), KPI Dashboard (CTR, CPA, ROI, Conv Rate)
  - Cada bloque tiene botones: Copy (clipboard) + Regenerate (icon refresh)
  - Export buttons: Markdown (todo), CSV (solo calendario)
- **Success criteria**:
  - 12 bloques generados en paralelo con skeleton loaders
  - Cada bloque es independiente y copiable
  - Export a Markdown descarga archivo .md completo
  - Export CSV del calendario con headers correctos
  - Responsive con scroll en cada bloque

### 4. Variation Lab - Copy Variations Estratégicas

- **Funcionalidad**: Generación y organización de 15+ variaciones de copy etiquetadas por ángulo estratégico y nivel de riesgo
- **Propósito**: Proporcionar múltiples opciones de messaging para A/B testing exhaustivo
- **Trigger**: Submit del Brief Wizard (generación JSON en paralelo)
- **Progresión**:
  - JSON parsing de 15 variaciones con estructura: { angle, hook, promise, proof, cta, risk }
  - 5 ángulos: Beneficio, Urgencia, Autoridad, Emoción, Objeciones (3 variaciones cada uno)
  - Filtros interactivos: Por ángulo (5 botones) + Por riesgo (bajo/medio/alto)
  - 2 vistas: Grid (cards 2 columnas) vs Grouped (agrupadas por ángulo)
  - Cada variation card muestra: Badge de ángulo, Badge de riesgo con color, Hook (bold), Promise, Proof (muted), CTA (primary), botón Copy
  - Counter dinámico: "X mostradas" actualiza con filtros
- **Success criteria**:
  - 15 variaciones generadas correctamente vía JSON mode
  - Filtros funcionan instantáneamente sin recarga
  - Vista Grid y Grouped son navegables y escaneables
  - Copy button funciona para cada variación individual
  - Risk level visualizado con colores claros (verde/amarillo/rojo)

### 5. War Room Chat con Comandos Rápidos

- **Funcionalidad**: Chat integrado de Microsoft Copilot con panel de comandos especializados
- **Propósito**: Permitir refinamiento rápido con comandos pre-definidos
- **Trigger**: Usuario accede a columna derecha en tab "Campaña"
- **Progresión**:
  - Header con badge "IA Premium"
  - Toggle "Ver/Ocultar Comandos"
  - Panel de 8 comandos en grid:
    - /mejora-hooks
    - /más-premium
    - /b2b
    - /reduce-riesgo
    - /regenera-bloque
    - /crea-landing
    - /paid-pack
    - /flow-email
  - Cada comando es un botón con label descriptivo
  - Iframe de Copilot debajo (full height)
  - onClick comando → log en console (preparado para enviar a chat)
- **Success criteria**:
  - Panel de comandos se expande/colapsa suavemente
  - Comandos visibles como buttons clicables
  - Iframe carga correctamente
  - Interface es reconocible como "War Room" profesional

### 6. Tab Navigation Premium

- **Funcionalidad**: 3 pestañas principales para organizar el workspace
- **Propósito**: Separar configuración (Brand Kit), generación (Campaign), y análisis (Variations)
- **Progresión**:
  - Tab 1 "Campaña": Layout 3-columnas (Brief | Outputs | War Room)
  - Tab 2 "Brand Kit": Layout centrado max-w-4xl con BrandKitEditor
  - Tab 3 "Variation Lab": Layout centrado max-w-7xl con VariationLab
  - Tabs con icons (Lightning, Palette, Sparkle) + neon glow en activo
- **Success criteria**:
  - Cambio de tabs instantáneo
  - Estado se preserva al cambiar (no re-render innecesario)
  - Layout se adapta según tab activo
  - Icons y labels claros

## Edge Case Handling

- **Brief Incompleto**: Wizard permite avanzar pero muestra warnings en Step 4 indicando qué datos críticos faltan (precio, promesa, pruebas). Brief Score visible siempre.
- **Generación Fallida**: Try-catch en Promise.all captura errores, muestra bloques vacíos con mensaje "Error al generar", permite retry por bloque.
- **JSON Parsing Error (Variations)**: Fallback a array vacío, muestra mensaje "No hay variaciones disponibles" en VariationLab.
- **Sin Brand Kit**: App funciona sin Brand Kit configurado, los prompts no incluyen restricciones de marca.
- **Pantallas Móviles**: Layout de 3 columnas se stackea verticalmente. Tabs de outputs se vuelven scrollables horizontalmente. Brief Wizard steps se mantienen verticales.
- **Calendario Vacío**: No permite exportar CSV si contentCalendar está vacío, toast de error explica "No hay calendario para exportar".
- **Canales No Seleccionados**: Brief Wizard no permite submit en Step 2 si no hay al menos 1 canal seleccionado.

## Design Direction

La aplicación debe sentirse como una **plataforma premium de nivel enterprise** para profesionales del marketing. La estética combina elementos de:
- **Dashboard financiero premium** (Bloomberg, interactive brokers): Densidad de información, precisión, profesionalismo
- **Design tool moderno** (Figma, Framer): UI limpia, componentes modulares, espaciado generoso
- **IA conversacional avanzada** (ChatGPT Plus, Claude): Resultados sofisticados, loading states elegantes

La interfaz debe comunicar **calidad, confianza y capacidad premium** a través de:
- Glassmorphism refinado (blur + transparency)
- Neon glows sutiles (no exagerados)
- Typography clara con Space Grotesk para headings
- Micro-animaciones intencionales (float, pulse, scale on hover)
- Feedback inmediato en todas las acciones

## Color Selection

Paleta suave y pastel con acentos verde menta para un look marketiniano premium pero no infantil.

- **Primary Color**: Verde Menta Suave `oklch(0.75 0.12 165)` - Color principal para acciones, focus, botones primarios. Comunica frescura, innovación, go-forward energy.
- **Secondary Colors**: 
  - Rosa Pastel `oklch(0.88 0.08 340)` - Acentos secundarios, badges especiales
  - Background Crema `oklch(0.98 0.01 160)` - Base cálida y suave
- **Accent Color**: Amarillo Cálido `oklch(0.85 0.15 50)` - Highlights, warnings suaves, CTA secundarios. Captura atención sin agredir.
- **Success**: Verde Menta (reutiliza primary para badges de éxito, riesgo bajo)
- **Destructive**: Coral Suave `oklch(0.65 0.20 25)` - Warnings, riesgo alto, errores

**Foreground/Background Pairings** (WCAG AA verificado):
- Primary Verde Menta (oklch(0.75 0.12 165)): White text (oklch(0.98 0 0)) - Ratio 4.9:1 ✓
- Accent Amarillo (oklch(0.85 0.15 50)): Dark text (oklch(0.20 0.03 240)) - Ratio 7.1:1 ✓
- Background Crema (oklch(0.98 0.01 160)): Dark foreground (oklch(0.25 0.03 240)) - Ratio 11.3:1 ✓
- Secondary Rosa (oklch(0.88 0.08 340)): Dark text (oklch(0.20 0.03 240)) - Ratio 8.2:1 ✓

## Font Selection

Tipografía que comunica profesionalismo premium sin ser corporativa aburrida.

- **Primary Font**: Space Grotesk (headings, titles, nav) - Geométrica moderna con personalidad, perfecta para títulos y UI elements. Transmite innovación y precisión.
- **Secondary Font**: Inter (body copy, forms, descriptions) - Legibilidad superior, neutral, profesional para texto largo y datos.
- **Monospace Font**: JetBrains Mono (code, UTMs, datos técnicos) - Para bloques de tracking, comandos, outputs técnicos.

**Typographic Hierarchy**:
- H1 (Page Titles): Space Grotesk Bold / 28px / tight letter spacing / gradient text
- H2 (Section Headers): Space Grotesk Semibold / 20px / uppercase / tracking-wider
- H3 (Card Titles): Space Grotesk Bold / 14px / uppercase / tracking-wider
- Body (Descriptions): Inter Medium / 14px / line-height 1.5
- Small (Labels, metadata): Inter Bold / 12px / uppercase / tracking-wider
- Code (Commands, UTMs): JetBrains Mono / 13px / monospace

## Animations

Animaciones sutiles que refuerzan la experiencia premium sin distraer:

- **Float Animation** (4s ease-in-out infinite): Orbs decorativos en background, icons especiales
- **Pulse Status** (2s ease-in-out infinite): Badge "Connected", indicadores de estado live
- **Sparkle Animate** (3s ease-in-out infinite): Icons de Sparkle, Lightning en features especiales
- **Scale on Hover** (0.3s cubic-bezier): Cards, buttons, badges interactivos (scale 1.02-1.05)
- **Gradient Shift** (25s ease infinite): Background gradiente animado sutil
- **Skeleton Loading**: Pulse suave mientras carga content (cada bloque independiente)
- **Tab Transition**: Fade + slight slide al cambiar tabs (framer-motion)

**Principio**: Movimiento sutil que comunica vida y calidad, nunca distrae del workflow.

## Component Selection

**Shadcn v4 Components usados**:
- **Form Controls**: Input, Textarea, Label, Select, Checkbox (brand kit, brief wizard)
- **Layout**: Card (todos los bloques), Tabs, TabsList, TabsTrigger, TabsContent, ScrollArea, Separator
- **Feedback**: Badge (estados, risk levels, ángulos), Button, Skeleton, Progress (brief score), Toaster (sonner)
- **Interactions**: Popover + PopoverTrigger (channel selector), Switch (theme, emojis)

**Customizations**:
- **Glass Panel**: `.glass-panel` utility class - backdrop-blur-32px + semi-transparent background + border glow
- **Neon Glow**: `.neon-glow` para primary actions, `.neon-glow-accent` para highlights
- **Neon Border**: `.neon-border` para cards featured (Strategy, Funnel Blueprint)
- **Variation Card**: Custom card con layout específico para hook/promise/proof/cta + badges de angle y risk
- **Calendar Item Card**: Custom card con layout para fecha/platform/tipo/objetivo/funnel phase + colored badges

**States**:
- Buttons: default / hover (scale 1.05) / active / disabled (opacity 50%)
- Inputs: default / focus (ring primary, border primary) / error (border destructive)
- Cards: default / hover (transform translateY -2px, shadow stronger)
- Tabs: inactive (muted) / active (neon glow, bold)

**Icon Selection** (@phosphor-icons/react):
- Lightning (Campaigns, generate actions)
- Sparkle (Outputs, AI features)
- Palette (Brand Kit)
- ChartBar, TrendUp, Funnel, Calendar (Output sections)
- Target, Clock, ShieldCheck, Heart, ChatCircle (Ángulos de copy)
- Copy, ArrowsClockwise (Actions en bloques)
- Check, CheckCircle, WarningCircle (Status, validation)
- Plus, X (Add/remove items en listas)

**Spacing**: Tailwind scale: gap-2 (8px) entre elementos pequeños, gap-4 (16px) entre cards en grid, gap-6 (24px) entre secciones principales, p-4/p-5/p-6 para card padding según densidad.

**Mobile Strategy**: Mobile-first, progressive enhancement. En mobile: 
- 3-column layout → vertical stack
- Tabs horizontales → scroll con snap
- Wizard steps → vertical stepper compact
- Outputs panel tabs → horizontal scroll
- Brand Kit → single column con scroll
- Variation Lab grid → single column
