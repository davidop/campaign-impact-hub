# Estado Compartido de Briefs

Esta documentación explica cómo funciona el sistema de estado compartido de briefs entre la pestaña "Briefs Demo" y la pestaña "Campaña".

## 🎯 Objetivo

Permitir que los usuarios seleccionen un brief precargado desde "Briefs Demo" y que este brief esté automáticamente disponible en la pestaña "Campaña" para generar campañas.

## 🏗️ Arquitectura

### Brief Store (`src/lib/briefStore.ts`)

El `briefStore` es un store global que gestiona el estado del brief seleccionado. Utiliza el sistema de persistencia `spark.kv` para mantener el estado entre sesiones.

```typescript
interface SelectedBrief {
  id: string
  name: string
  product: string
  target: string
  channels: string[]
  brandTone: string
  budget: string
  briefText: string // Texto completo del brief formateado
}
```

### Funciones principales

#### `useBriefStore()` Hook

Hook de React para acceder y manipular el brief seleccionado:

```typescript
const { 
  selectedBriefId,    // ID del brief actual (o null)
  selectedBrief,      // Objeto brief completo (o null)
  setSelectedBrief,   // Función para seleccionar un brief
  clearSelectedBrief  // Función para limpiar la selección
} = useBriefStore()
```

## 📋 Flujo de Usuario

### 1. En "Briefs Demo"

1. El usuario ve una lista de briefs precargados (SaaS B2B, Ecommerce, Evento/Curso)
2. Cada card muestra:
   - Nombre del brief
   - Descripción
   - Categoría
   - Información básica (producto, presupuesto, canales)
3. Al hacer clic en "Cargar brief":
   - Se guarda el brief en `briefStore`
   - Se muestra un badge "Seleccionado" en esa card
   - Se muestra un toast de confirmación
   - El brief anterior (si existía) se reemplaza

### 2. En "Campaña"

La pestaña "Campaña" muestra automáticamente el brief activo:

#### Panel "Brief Activo"

Si hay un brief seleccionado, se muestra un panel con:
- ✅ Nombre del brief
- ✅ Badges con información clave (producto, presupuesto, canales)
- ✅ Botón "Usar brief seleccionado" para cargar el texto en el textarea
- ✅ Botón "Limpiar" para deseleccionar el brief

```tsx
{selectedBrief && (
  <div className="bg-primary/10 border border-primary/30 rounded-lg p-3">
    <div className="flex items-center justify-between">
      <span>Brief Activo: {selectedBrief.name}</span>
      <Button onClick={clearSelectedBrief}>Limpiar</Button>
    </div>
    <Button onClick={() => setBriefText(selectedBrief.briefText)}>
      Usar brief seleccionado
    </Button>
  </div>
)}
```

#### Textarea "Brief de Campaña"

- Se auto-rellena con `selectedBrief.briefText` cuando se selecciona un brief
- El usuario puede editar el texto libremente
- El brief original permanece guardado en el store

#### Botón "Generar Campaña"

Al generar la campaña:
1. Si existe `selectedBrief`, usa sus campos para el contexto
2. Si no existe, usa los valores del formulario o textarea
3. Construye el payload:

```typescript
const payload: FoundryPayload = {
  messages: [{
    role: 'user',
    content: briefText || selectedBrief.briefText
  }],
  context: {
    campaignContext: {
      product: selectedBrief?.product || currentBrief?.product || '',
      target: selectedBrief?.target || currentBrief?.audience || '',
      channels: selectedBrief?.channels || currentBrief?.channels || [],
      brandTone: selectedBrief?.brandTone || currentBrief?.tone || '',
      budget: selectedBrief?.budget || currentBrief?.budget || ''
    },
    uiState: { view: 'campaign' }
  }
}
```

## 🔄 Sincronización de Estado

### Persistencia

El estado se persiste automáticamente usando `spark.kv`:
- `selected-brief-id`: ID del brief actual
- `selected-brief`: Objeto completo del brief

Esto significa que:
- ✅ El brief seleccionado se mantiene al recargar la página
- ✅ El brief se mantiene al cambiar entre pestañas
- ✅ El brief se limpia solo cuando el usuario hace clic en "Limpiar"

### Reactividad

El hook `useBriefStore()` usa `useKV` internamente, lo que proporciona:
- ✅ Actualización automática de todos los componentes que usen el hook
- ✅ Sincronización en tiempo real entre pestañas
- ✅ Sin necesidad de polling o refresh manual

## 📝 Ejemplo de Uso

### En un componente de selección de brief

```typescript
import { useBriefStore, type SelectedBrief } from '@/lib/briefStore'

function BriefSelector() {
  const { selectedBriefId, setSelectedBrief } = useBriefStore()

  const handleSelect = (demo: DemoBrief) => {
    const brief: SelectedBrief = {
      id: demo.id,
      name: demo.name,
      product: demo.briefData.product,
      target: demo.briefData.audience,
      channels: demo.briefData.channels,
      brandTone: demo.brandKit.tone,
      budget: demo.briefData.budget,
      briefText: formatBriefText(demo.briefData)
    }
    
    setSelectedBrief(brief)
  }

  return (
    <div>
      {briefs.map(brief => (
        <Card 
          key={brief.id}
          className={selectedBriefId === brief.id ? 'border-primary' : ''}
        >
          <Button onClick={() => handleSelect(brief)}>
            Cargar brief
          </Button>
        </Card>
      ))}
    </div>
  )
}
```

### En un componente de generación de campaña

```typescript
import { useBriefStore } from '@/lib/briefStore'

function CampaignGenerator() {
  const { selectedBrief, clearSelectedBrief } = useBriefStore()
  const [briefText, setBriefText] = useState('')

  useEffect(() => {
    if (selectedBrief) {
      setBriefText(selectedBrief.briefText)
    }
  }, [selectedBrief])

  const handleGenerate = async () => {
    const payload = {
      messages: [{ role: 'user', content: briefText }],
      context: {
        campaignContext: {
          product: selectedBrief?.product || '',
          // ... otros campos
        }
      }
    }
    
    await runCampaignFlow(payload)
  }

  return (
    <div>
      {selectedBrief && (
        <div>
          <p>Brief Activo: {selectedBrief.name}</p>
          <Button onClick={clearSelectedBrief}>Limpiar</Button>
        </div>
      )}
      
      <Textarea value={briefText} onChange={e => setBriefText(e.target.value)} />
      <Button onClick={handleGenerate}>Generar Campaña</Button>
    </div>
  )
}
```

## 🎨 UX/UI

### Estados visuales

1. **Sin brief seleccionado**:
   - Panel "Brief Activo" no se muestra
   - Textarea vacío con placeholder
   - Botón "Generar" deshabilitado si no hay texto

2. **Con brief seleccionado**:
   - Panel "Brief Activo" visible con info del brief
   - Badge "Seleccionado" en la card de Briefs Demo
   - Textarea auto-rellenado (editable)
   - Botón "Generar" habilitado

3. **Después de generar**:
   - El brief sigue seleccionado (no se limpia automáticamente)
   - Usuario puede generar múltiples campañas con el mismo brief
   - Usuario debe hacer clic en "Limpiar" para deseleccionar

### Feedback visual

- ✅ Toast de confirmación al seleccionar brief
- ✅ Badge "Seleccionado" en la card activa
- ✅ Border destacado en la card seleccionada
- ✅ Panel "Brief Activo" con fondo de color
- ✅ Toast al limpiar el brief

## 🔍 Debugging

Para inspeccionar el estado del brief store en la consola del navegador:

```javascript
// Ver el brief actual
await spark.kv.get('selected-brief')

// Ver el ID del brief actual
await spark.kv.get('selected-brief-id')

// Limpiar manualmente
await spark.kv.delete('selected-brief')
await spark.kv.delete('selected-brief-id')
```

## 📚 Referencias

- `src/lib/briefStore.ts` - Implementación del store
- `src/components/DemoBriefSelector.tsx` - Selector de briefs
- `src/components/WarRoomChat.tsx` - Generador de campañas
- `src/lib/demoBriefs.ts` - Briefs precargados
