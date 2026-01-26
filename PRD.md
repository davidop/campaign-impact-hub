# Planning Guide

Un Centro de Comando de Marketing integral que permite a los especialistas en marketing generar estrategias de campaña impulsadas por IA, variaciones de copy, calendarios de contenido e insights de KPIs mientras colaboran con un agente de IA en vivo a través de una interfaz de chat integrada.

**Idioma por defecto**: Español (castellano) con posibilidad de cambiar a inglés mediante el botón de traducción en el header.

This is a multi-panel dashboard with real-time AI generation, persistent chat history, live status indicators, theme switching, language toggle (Spanish/English), and multi-channel campaign coordination
## Essential Features
### Campaign Brief Form

- **Progression**: Empty form → User input → Validation → Submit → Loading state → Results pop


## Essential Features

### Campaign Brief Form
- **Purpose**: Offers marketers options to test different messaging approaches
- **Progression**: Empty state → Loading → Two side-by-side copy variants with 

- **Progression**: Empty form → User input → Validation → Submit → Loading state → Results populate output panels
- **Success criteria**: Form validates all required fields, submits data, triggers AI generation, and shows loading feedback

### Strategy Output Panel
- **Functionality**: Displays AI-generated marketing strategy with key recommendations
- **Purpose**: Provides strategic direction for the campaign
- **Trigger**: Campaign brief submission
- **Progression**: Empty state → Loading skeleton → Strategy text with sections (Overview, Target Approach, Channel Strategy, Budget Allocation)
- **Success criteria**: Shows structured strategy content with clear sections and actionable insights

### A/B Copy Variations
- **Functionality**: Generates two copy variations for comparison and testing
- **Purpose**: Offers marketers options to test different messaging approaches
- **Trigger**: Campaign brief submission
- **Progression**: Empty state → Loading → Two side-by-side copy variants with headlines and body text
- **Success criteria**: Displays distinct copy variations with clear labeling (Version A / Version B)

### Content Calendar
- **Empty Form Submission**: Display validation errors with specific field
- **Very Long Chat History**: Implement virtual scro
- **Incomplete Generation**: Display par
- **Mobile Narrow Screens**: Stack three-column layout vertically with expandable sections
## Design Direction

## Color Selection
A cyberpunk-inspired palette with electric accents over deep backg
- **Primary Color**: Electric Purple (oklch(0.58 0.25 295)) - Rep
  - Deep Indigo Background (oklch(0.12 0
- **Accent Color**: Neon Pink (oklch(0.68 0.24 340)) - Draws attention to CTAs and importan
  - Primary Purple (oklch(0.58 0.25 295)): White text (oklch(0.98 0 0)) - Ratio 5.2:1 ✓

  - Glass Panels (o



  - H1 (Page Title): Space Grotesk Bold / 32px / -0.02em letter-spacing / uppercase
  - H3 (Section Labels): Space Grotesk Medium / 16px / normal letter-spacing

  - Monospace (KPIs)
## Animations
Animations should emphasize the "living system" quality of the
- Ambient background gradient shift (20-seco
- Glass refraction effect on hover (subtle border luminosity increase)
- Typing indicator bounce (three dots, staggered 150ms delays)



  - Input, Textarea, Label (Form fields in Campaign Brief)
  - Card (Glassmorphic panels for all major sections)
  - Badge (Status indicator, channel tags)
  - Skeleton (Loading states for outputs)

- **Customizations**:

  - Custom gradient background component with animated mesh gradient

  - Buttons: Default (neon glow), Hover (increased glow + scale), Active (pressed scale), Disab
  - Cards: Default (glass), Hover (increased border luminosity), Active (

  - Sparkle (AI generation indicator)
- **Mobile Narrow Screens**: Stack three-column layout vertically with expandable sections

## Design Direction

- **Spacing**:

## Color Selection

- **Mobile**:

  - Chat becomes bottom sheet or full-screen modal
  - Reduce card padding 
  - Touch targets minimum 44px height



  - Primary Purple (oklch(0.58 0.25 295)): White text (oklch(0.98 0 0)) - Ratio 5.2:1 ✓











  - H1 (Page Title): Space Grotesk Bold / 32px / -0.02em letter-spacing / uppercase

  - H3 (Section Labels): Space Grotesk Medium / 16px / normal letter-spacing





## Animations





- Glass refraction effect on hover (subtle border luminosity increase)

- Typing indicator bounce (three dots, staggered 150ms delays)







  - Input, Textarea, Label (Form fields in Campaign Brief)

  - Card (Glassmorphic panels for all major sections)

  - Badge (Status indicator, channel tags)

  - Skeleton (Loading states for outputs)



- **Customizations**:



  - Custom gradient background component with animated mesh gradient
  - Custom neon-glow utility classes for borders and shadows

- **States**:
  - Buttons: Default (neon glow), Hover (increased glow + scale), Active (pressed scale), Disabled (desaturated + no glow), Loading (pulse animation)
  - Inputs: Default (subtle border), Focus (neon border glow), Error (red glow), Filled (increased opacity)
  - Cards: Default (glass), Hover (increased border luminosity), Active (stronger backdrop blur)
  - Status Badge: Connected (green pulse), Disconnected (red steady), Loading (yellow pulse)

- **Icon Selection**:
  - Sparkle (AI generation indicator)
  - ChartBar (Strategy output)
  - ChatCircle (Live chat)
  - Calendar (Content calendar)
  - TrendUp (KPI insights)
  - PaperPlaneRight (Send message)
  - Lightning (Campaign brief submit)
  - Moon/Sun (Theme toggle)
  - WifiHigh/WifiSlash (Connection status)

- **Spacing**:
  - Section gaps: gap-6 (24px between major panels)
  - Card padding: p-6 (24px internal padding)
  - Form field spacing: space-y-4 (16px between fields)
  - Chat message spacing: space-y-3 (12px between messages)
  - Header padding: px-6 py-4 (24px horizontal, 16px vertical)
  - Button padding: px-6 py-3 (24px horizontal, 12px vertical)

- **Mobile**:
  - Stack three columns vertically on screens < 1024px
  - Campaign Brief becomes collapsible accordion at top
  - Outputs stack in order: Strategy → Copy → Calendar → KPIs
  - Chat becomes bottom sheet or full-screen modal
  - Header remains fixed with compact status indicator
  - Reduce card padding to p-4
  - Font sizes reduce by 1-2px for body text
  - Touch targets minimum 44px height
