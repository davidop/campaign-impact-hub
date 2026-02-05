# Resumen de Implementación: Estado Compartido de Briefs y Proxy Foundry

## ✅ Implementaciones Completadas

### A) Estado Global de Briefs

**Archivo**: `src/lib/briefStore.ts`

Se ha creado un store global con las siguientes funcionalidades:

#### Interface `SelectedBrief`
```typescript
interface SelectedBrief {
  id: string           // Identificador único del brief
  name: string         // Nombre descriptivo
  product: string      // Producto/servicio
  target: string       // Audiencia objetivo
  channels: string[]   // Canales de marketing
  brandTone: string    // Tono de marca
  budget: string       // Presupuesto
  briefText: string    // Texto completo del brief formateado
}
```

#### Hook `useBriefStore()`
```typescript
const {
  selectedBriefId,     // ID del brief actual o null
  selectedBrief,       // Objeto brief completo o null
  setSelectedBrief,    // Función para seleccionar brief
  clearSelectedBrief   // Función para limpiar selección
} = useBriefStore()
```

**Persistencia**: Usa `spark.kv` para mantener el estado entre sesiones.

### B) Integración en DemoBriefSelector

**Archivo actualizado**: `src/components/DemoBriefSelector.tsx`

#### Cambios implementados:

1. **Import del briefStore**:
```typescript
import { useBriefStore, type SelectedBrief } from '@/lib/briefStore'
```

2. **Al cargar un brief**:
   - Crea un objeto `SelectedBrief` con todos los datos
   - Llama a `setSelectedBrief(brief)`
   - Muestra toast de confirmación
   - El brief queda seleccionado globalmente

3. **Indicador visual**:
   - Badge "Seleccionado" en la card activa
   - Border destacado (`border-primary ring-2 ring-primary/20`)
   - Botón cambia de "Cargar brief" a "Recargado"

### C) Integración en WarRoomChat (Campaña)

**Archivo actualizado**: `src/components/WarRoomChat.tsx`

#### Cambios implementados:

1. **Import y uso del briefStore**:
```typescript
import { useBriefStore } from '@/lib/briefStore'
const { selectedBrief, clearSelectedBrief } = useBriefStore()
```

2. **Auto-rellenado del textarea**:
```typescript
useEffect(() => {
  if (selectedBrief && selectedBrief.briefText) {
    setBriefText(selectedBrief.briefText)
  }
}, [selectedBrief])
```

3. **Panel "Brief Activo"** (antes del textarea):
   - Solo visible si `selectedBrief` existe
   - Muestra: nombre, producto, presupuesto, número de canales
   - Botón "Usar brief seleccionado": recarga el briefText
   - Botón "Limpiar": limpia la selección y el textarea

4. **Generación de campaña mejorada**:
   - Usa datos de `selectedBrief` si existe
   - Fallback a `currentBrief` o campos del formulario
   - Payload construido con contexto completo

### D) Foundry Client con Proxy

**Archivo actualizado**: `src/lib/foundryClient.ts`

#### Nuevas interfaces:

```typescript
interface FoundryConfig {
  endpoint?: string
  apiKey?: string
  useProxy?: boolean
  proxyEndpoint?: string
}

interface FoundryError {
  message: string
  type: 'network' | 'auth' | 'cors' | 'parse' | 'unknown'
  recommendation?: string
  mode?: 'direct' | 'proxy'  // ⭐ Nuevo: indica qué modo se usó
}
```

#### Función principal `runFoundry()`

```typescript
export async function runFoundry(
  payload: FoundryPayload,
  config?: FoundryConfig
): Promise<FoundryResponse>
```

**Lógica**:
1. Lee configuración de `config` o variables de entorno:
   - `VITE_FOUNDRY_ENDPOINT`: Endpoint de Foundry
   - `VITE_FOUNDRY_API_KEY`: API key (solo modo directo)
   - `VITE_USE_PROXY`: true/false (default: true)

2. Si `useProxy === true`:
   - Llama a `/api/run` (proxy backend)
   - Envía `{ endpoint, payload }`
   - El backend añade la API key

3. Si `useProxy === false`:
   - Llama directamente a Foundry
   - Envía headers `api-key` y `Ocp-Apim-Subscription-Key`
   - Puede fallar por CORS

#### Manejo de errores mejorado:

- **401/403**: Detecta si es modo proxy o directo y da recomendación específica
- **404**: Si el proxy no existe, sugiere activarlo o usar modo directo
- **CORS**: Recomienda usar proxy
- **Modo incluido**: Los errores ahora indican `mode: 'proxy'` o `mode: 'direct'`

### E) Documentación Creada

#### 1. `PROXY_BACKEND_GUIDE.md`
Guía completa para implementar el proxy backend:
- Ejemplos para Express, Vercel, Netlify
- Variables de entorno
- Testing
- Troubleshooting
- Seguridad

#### 2. `.env.example`
Plantilla de variables de entorno con:
- `VITE_FOUNDRY_ENDPOINT`
- `VITE_FOUNDRY_API_KEY` (opcional, solo desarrollo)
- `VITE_USE_PROXY` (recomendado: true)
- `FOUNDRY_API_KEY` (backend)

#### 3. `api-proxy-example.js`
Código de ejemplo para el proxy backend con:
- Función `handleFoundryProxy()`
- Manejo de errores
- Comentarios explicativos
- Ejemplo de uso con Express

#### 4. `BRIEF_STORE_DOCS.md`
Documentación completa del sistema de briefs:
- Arquitectura
- Flujo de usuario
- Sincronización de estado
- Ejemplos de uso
- UX/UI
- Debugging

## 🎯 Flujo Completo del Usuario

### Paso 1: Seleccionar Brief (Pestaña "Briefs Demo")

1. Usuario ve lista de 3 briefs demo:
   - 🚀 SaaS B2B - Plataforma de análisis
   - 🛒 Ecommerce - Tienda de moda sostenible
   - 🎓 Evento/Curso - Workshop de marketing digital

2. Usuario hace clic en "Cargar brief"
   - ✅ Brief se guarda en `briefStore`
   - ✅ Card muestra badge "Seleccionado"
   - ✅ Toast: "Brief 'X' seleccionado"

### Paso 2: Ver Brief Activo (Pestaña "Campaña")

1. Usuario cambia a pestaña "Campaña"
   - ✅ Panel "Brief Activo" visible con info del brief
   - ✅ Textarea auto-rellenado con briefText
   - ✅ Botón "Generar Campaña" habilitado

2. Usuario puede:
   - Editar el briefText libremente
   - Hacer clic en "Usar brief seleccionado" para recargar
   - Hacer clic en "Limpiar" para deseleccionar

### Paso 3: Generar Campaña

1. Usuario hace clic en "Generar Campaña" (o Ctrl+Enter)
   - 🚀 Log: "Iniciando generación..."
   - 📤 Log: "Llamando a Foundry (modo: Proxy/Direct)..."

2. Sistema construye payload:
```json
{
  "messages": [
    { "role": "user", "content": "<briefText>" }
  ],
  "context": {
    "campaignContext": {
      "product": "...",
      "target": "...",
      "channels": ["Instagram", "TikTok"],
      "brandTone": "...",
      "budget": "..."
    },
    "uiState": { "view": "campaign" }
  }
}
```

3. Llamada a Foundry:
   - **Modo Proxy** (recomendado):
     - POST a `/api/run`
     - Backend añade API key
     - Sin problemas de CORS
   
   - **Modo Directo** (solo desarrollo):
     - POST directo a Foundry endpoint
     - Usa `VITE_FOUNDRY_API_KEY`
     - Puede fallar por CORS

4. Resultado:
   - ✅ Log: "Campaña generada con éxito"
   - ✅ Respuesta JSON visible
   - ✅ Botones "Copiar Payload" y "Copiar Respuesta"
   
   O si hay error:
   - ❌ Log: "Error: <mensaje>"
   - 💡 Log: Recomendación específica según el error
   - 🔧 Log: Modo usado (Proxy/Directo)

## 🔧 Configuración Recomendada

### Desarrollo Local (con proxy)

1. **Frontend (.env)**:
```bash
VITE_USE_PROXY=true
# No necesitas VITE_FOUNDRY_API_KEY
```

2. **Backend** (servidor local):
```bash
FOUNDRY_API_KEY=tu-api-key-de-azure
```

3. **Servidor proxy corriendo**:
```bash
npm run server  # o como tengas configurado tu backend
```

### Desarrollo Local (sin proxy - testing rápido)

**Frontend (.env)**:
```bash
VITE_USE_PROXY=false
VITE_FOUNDRY_API_KEY=tu-api-key-de-azure
```

⚠️ Puede fallar por CORS dependiendo del navegador.

### Producción

1. **Frontend (variables de entorno)**:
```bash
VITE_USE_PROXY=true
VITE_FOUNDRY_ENDPOINT=https://tu-endpoint.azure.com/...
```

2. **Backend (Vercel/Netlify/etc)**:
```bash
FOUNDRY_API_KEY=tu-api-key-de-azure
```

3. **Proxy desplegado** en `/api/run`

## 🐛 Troubleshooting

### Error 401: Unauthorized

**Modo Proxy**:
- ❌ `FOUNDRY_API_KEY` no está en el servidor backend
- ❌ La API key es inválida o está expirada
- ✅ Verifica la key en Azure Portal
- ✅ Verifica que esté en las variables de entorno del servidor

**Modo Directo**:
- ❌ `VITE_FOUNDRY_API_KEY` no está configurada
- ❌ La API key es inválida
- ✅ Configura la variable de entorno
- ✅ Recomienda usar proxy en su lugar

### Error 404: Proxy not found

- ❌ El endpoint `/api/run` no existe
- ❌ El servidor backend no está corriendo
- ✅ Implementa el proxy usando `PROXY_BACKEND_GUIDE.md`
- ✅ O configura `VITE_USE_PROXY=false` temporalmente

### Error CORS

- ❌ Estás usando modo directo
- ❌ El navegador bloquea la llamada
- ✅ Configura `VITE_USE_PROXY=true`
- ✅ Implementa el proxy backend

### Brief no se carga en Campaña

- ❌ El brief no se seleccionó correctamente
- ✅ Verifica en DevTools: `await spark.kv.get('selected-brief')`
- ✅ Vuelve a cargar el brief desde Briefs Demo

## 📚 Archivos Modificados

- ✅ `src/lib/briefStore.ts` (nuevo)
- ✅ `src/lib/foundryClient.ts` (actualizado)
- ✅ `src/components/DemoBriefSelector.tsx` (actualizado)
- ✅ `src/components/WarRoomChat.tsx` (actualizado)

## 📚 Archivos de Documentación Creados

- ✅ `PROXY_BACKEND_GUIDE.md`
- ✅ `.env.example`
- ✅ `api-proxy-example.js`
- ✅ `BRIEF_STORE_DOCS.md`
- ✅ `IMPLEMENTATION_SUMMARY.md` (este archivo)

## ✨ Próximos Pasos

1. **Implementar el proxy backend**:
   - Usar uno de los ejemplos de `PROXY_BACKEND_GUIDE.md`
   - Configurar `FOUNDRY_API_KEY` en el servidor
   - Desplegar en Vercel/Netlify/servidor propio

2. **Configurar variables de entorno**:
   - Copiar `.env.example` a `.env`
   - Configurar las variables necesarias

3. **Testing**:
   - Cargar un brief desde Briefs Demo
   - Verificar que aparece en Campaña
   - Generar una campaña y verificar logs
   - Probar modo proxy y directo

4. **Producción**:
   - Usar siempre `VITE_USE_PROXY=true`
   - Nunca exponer `FOUNDRY_API_KEY` en el frontend
   - Monitorear logs de error para debugging
