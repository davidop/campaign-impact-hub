# 🤖 Custom GitHub Copilot Agent para Campaign Impact Hub

Este repositorio incluye un **custom agent de GitHub Copilot** especializado en el desarrollo de Campaign Impact Hub, optimizado para entender la arquitectura, filosofía y patrones específicos del proyecto.

## 🎯 ¿Qué hace este Custom Agent?

El agent está entrenado para:

- ✅ **Entender la filosofía estratégica** del proyecto (no inventar datos, cero generalidades, Brand Kit first)
- ✅ **Conocer la arquitectura completa** de componentes, hooks, y servicios Azure AI
- ✅ **Seguir los patrones de código** establecidos (TypeScript types, naming conventions, prompts structure)
- ✅ **Integrar correctamente con Azure AI Foundry** y el agente `marketing-orchestrator:2`
- ✅ **Respetar las mejores prácticas** del proyecto (Brand Kit injection, gap detection, modular outputs)
- ✅ **Sugerir código específico** en lugar de generalidades o pseudocódigo
- ✅ **Promover modularidad y testing** apropiado para la solución

## 🚀 Cómo Activar el Custom Agent

### Opción 1: Automático (Recomendado)

GitHub Copilot detecta automáticamente el archivo `.github/copilot-instructions.md` cuando trabajas en este repositorio. **No necesitas hacer nada adicional**.

### Opción 2: Verificar Activación

1. Abre **VS Code** con este repositorio
2. Abre el **Copilot Chat** (Ctrl+Shift+I o Cmd+Shift+I)
3. Escribe: `@workspace ¿conoces Campaign Impact Hub?`
4. Si menciona detalles específicos del proyecto (Brand Kit, Gap Detection, Azure AI), está activado ✅

### Opción 3: Forzar Recarga (Si no funciona)

Si Copilot no reconoce el contexto del proyecto:

1. Cierra VS Code completamente
2. Elimina la carpeta `.vscode` si existe (opcional)
3. Reabre VS Code en el repositorio
4. Espera 10-20 segundos para que Copilot indexe el workspace

## 💬 Cómo Usar el Custom Agent

### Ejemplos de Prompts Optimizados

#### 1. Generar Nuevos Componentes

```
Crea un componente BudgetAllocator que permita distribuir presupuesto entre canales paid respetando el Brand Kit y validando gaps de presupuesto
```

**Output esperado**:
- TypeScript tipado con `CampaignBrief` y `BrandKitConfig`
- Validación de gaps usando `briefGapDetector.ts`
- UI con shadcn/ui components
- Integración con `orchestrator.ts`

#### 2. Modificar Generación de Prompts

```
Modifica orchestrator.ts para incluir un nuevo parámetro de Brand Kit: "Competitor Differentiation" que se inyecte en todos los prompts
```

**Output esperado**:
- Actualización de `BrandKitConfig` type en `types.ts`
- Modificación de `BrandKitEditor.tsx` para agregar el campo
- Actualización de `orchestrator.ts` para inyectar en prompts
- Actualización de `brandConsistencyChecker.ts` para evaluar el parámetro

#### 3. Crear Nuevos Evaluadores

```
Crea un evaluador de Copy Premium Score que analice si el copy suena suficientemente premium según el Brand Kit tone
```

**Output esperado**:
- Nuevo archivo `src/lib/premiumCopyScorer.ts`
- Función `evaluatePremiumScore(copy: string, brandKit: BrandKitConfig): number`
- Integración con Azure AI Agent para análisis
- UI component para mostrar el score

#### 4. Añadir Nuevos Tabs de Output

```
Añade un nuevo tab "Email Sequences" al ModularOutputsPanel que genere secuencias de emails según el funnel
```

**Output esperado**:
- Actualización de `ModularOutput` type
- Modificación de `ModularOutputsPanel.tsx` para agregar tab
- Nuevo componente `EmailSequencesDisplay.tsx`
- Actualización de `orchestrator.ts` para generar el contenido
- Botón de evaluación de consistencia incluido

#### 5. Debugging Azure AI Integration

```
El War Room Chat no está conectando con el agente Azure AI. Revisa la configuración y sugiere fixes
```

**Output esperado**:
- Checklist de validación (`npm run check`)
- Verificación de env vars
- Revisión de `agentClient.ts` y manejo de errores
- Sugerencias de troubleshooting según `AGENT_SETUP.md`

### Comandos Específicos del Workspace

Usa `@workspace` para preguntas sobre el proyecto completo:

```
@workspace ¿Cómo funciona el sistema de gap detection?
@workspace ¿Dónde se inyecta el Brand Kit en los prompts?
@workspace ¿Qué componentes usan el hook useOrchestrator?
@workspace Explica el flujo completo de generación de campaña
```

## 🎨 Contexto Adicional para Mejores Respuestas

### Incluye Detalles Específicos

❌ **Malo** (genérico):
```
Crea un componente de formulario
```

✅ **Bueno** (específico):
```
Crea un componente FormularioBudget que capture presupuesto total, distribución por canal (Paid Social, Paid Search, Display), y valide que haya presupuesto si se seleccionaron canales paid en el brief
```

### Menciona Archivos de Referencia

❌ **Malo**:
```
Cómo mejoro el scoring?
```

✅ **Bueno**:
```
Quiero mejorar la función calculateBriefScore en briefAnalyzer.ts para que penalice más cuando faltan KPIs específicos de paid channels
```

### Especifica Filosofía del Proyecto

❌ **Malo**:
```
Genera copy para una campaña
```

✅ **Bueno**:
```
Genera copy premium para una campaña siguiendo la filosofía de Campaign Impact Hub: específico, sin inventar datos, respetando Brand Kit tone "premium" y formality 4/5
```

## 📚 Archivos de Referencia

El custom agent tiene acceso completo a estos archivos de documentación:

- `README.md` - Overview del proyecto
- `PRD.md` - Product Requirements Document completo
- `STRATEGIC_APPROACH.md` - Filosofía estratégica y ejemplos
- `AGENT_SETUP.md` - Configuración de Azure AI Agent
- `BRAND_KIT_IMPLEMENTATION.md` - Implementación del Brand Kit
- `ORCHESTRATOR_DOCS.md` - Documentación del orquestador
- `WAR_ROOM_SETUP.md` - Setup del War Room Chat

**Tip**: Puedes referenciarlos explícitamente en tus prompts:

```
Según STRATEGIC_APPROACH.md, ¿cómo debería redactar los prompts para evitar generalidades?
```

## 🔧 Customización del Agent

Si necesitas **modificar las instrucciones del agent**, edita:

```
.github/agents/campaign-impact-hub-expert.md
```

Después de editar:
1. Guarda el archivo
2. Recarga VS Code (Ctrl+Shift+P → "Reload Window")
3. Espera 10-20 segundos para que Copilot procese los cambios

### Qué Puedes Customizar

- ✏️ **Patrones de código** adicionales
- ✏️ **Nuevos componentes** que añadas al proyecto
- ✏️ **Convenciones de naming** específicas de tu equipo
- ✏️ **Reglas de negocio** adicionales
- ✏️ **Integraciones** con otros servicios

## ⚠️ Limitaciones

El custom agent está optimizado para Campaign Impact Hub pero:

- ❌ No reemplaza la documentación completa del proyecto
- ❌ No tiene acceso a credenciales o datos de producción
- ❌ No puede ejecutar comandos por ti (pero sugiere los correctos)
- ❌ Necesita contexto adicional para modificaciones complejas

**Solución**: Provee contexto adicional con `@workspace` y referencia archivos específicos.

## 🆘 Troubleshooting

### Problema: Copilot no usa el custom agent

**Solución**:
1. Verifica que el archivo `.github/copilot-instructions.md` existe
2. Recarga VS Code (Ctrl+Shift+P → "Reload Window")
3. Espera que Copilot indexe el workspace (10-20 segundos)
4. Usa `@workspace` en tus prompts para forzar contexto del proyecto

### Problema: Las respuestas son demasiado genéricas

**Solución**:
1. Sé más específico en tus prompts
2. Menciona archivos o componentes concretos
3. Incluye contexto de la filosofía del proyecto
4. Usa ejemplos de código existente como referencia

### Problema: Copilot sugiere código que no sigue los patrones

**Solución**:
1. Recuerda a Copilot el patrón correcto:
   ```
   Usa el mismo patrón que BrandConsistencyEvaluator.tsx para crear este componente
   ```
2. Referencia explícitamente las convenciones:
   ```
   Siguiendo las naming conventions de Campaign Impact Hub, crea...
   ```

### Problema: Necesito contexto de Azure AI Foundry

**Solución**:
```
@workspace Explica la integración con Azure AI Foundry según AGENT_SETUP.md
```

## 📊 Métricas de Éxito

Un custom agent funciona bien cuando:

✅ **Genera código TypeScript tipado** correctamente desde el primer intento  
✅ **Respeta la filosofía** del proyecto (no inventa datos, incluye Brand Kit)  
✅ **Sigue patrones** de componentes, hooks y services establecidos  
✅ **Sugiere imports** correctos de shadcn/ui y heroicons  
✅ **Incluye validaciones** de gaps y evaluadores cuando corresponde  
✅ **Propone prompts** bien estructurados con Brand Kit injection  

## 🚀 Próximos Pasos

1. **Prueba el agent** con los ejemplos de prompts de arriba
2. **Experimenta** con diferentes tipos de preguntas (@workspace, específicas, debugging)
3. **Itera** si las respuestas no son suficientemente específicas
4. **Customiza** `.github/agents/campaign-impact-hub-expert.md` según las necesidades de tu equipo

---

**¿Preguntas?** Consulta la [documentación completa del proyecto](./README.md) o pregunta directamente al custom agent con `@workspace`.

🎯 **Recuerda**: Este agent está optimizado para pensar como Campaign Impact Hub: estratégico, riguroso, ejecutable y consistente.
