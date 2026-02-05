# Proxy Backend para Foundry

Este documento explica cómo implementar el endpoint proxy `/api/run` para llamar a Microsoft Foundry de forma segura desde el backend.

## ¿Por qué usar un proxy?

1. **Seguridad**: La API key de Foundry no se expone en el frontend
2. **CORS**: Evita problemas de CORS al hacer la llamada desde el servidor
3. **Control**: Puedes agregar logging, rate limiting, y validación en el servidor

## Variables de entorno

### Frontend (.env)
```bash
# Endpoint de Foundry (opcional, tiene fallback)
VITE_FOUNDRY_ENDPOINT=https://tenerife-winter-resource.services.ai.azure.com/api/projects/tenerife-winter/applications/campaign-impact-hub/protocols/activityprotocol?api-version=2025-11-15-preview

# API Key (solo si usas modo directo, NO RECOMENDADO)
# VITE_FOUNDRY_API_KEY=tu-api-key-aqui

# Usar proxy (recomendado: true)
VITE_USE_PROXY=true
```

### Backend (servidor)
```bash
# API Key de Foundry (¡en el servidor, NO en el frontend!)
FOUNDRY_API_KEY=tu-api-key-de-azure-foundry
```

## Implementación del proxy

### Node.js + Express

```javascript
// server.js o api/run.js
import express from 'express'
import fetch from 'node-fetch'

const app = express()
app.use(express.json())

app.post('/api/run', async (req, res) => {
  try {
    const { endpoint, payload } = req.body

    if (!endpoint || !payload) {
      return res.status(400).json({ 
        error: 'Missing endpoint or payload' 
      })
    }

    const apiKey = process.env.FOUNDRY_API_KEY

    if (!apiKey) {
      return res.status(500).json({ 
        error: 'FOUNDRY_API_KEY not configured on server' 
      })
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
        'Ocp-Apim-Subscription-Key': apiKey
      },
      body: JSON.stringify(payload)
    })

    const data = await response.json()

    if (!response.ok) {
      return res.status(response.status).json(data)
    }

    res.json(data)
  } catch (error) {
    console.error('Foundry proxy error:', error)
    res.status(500).json({ 
      error: error.message || 'Internal server error' 
    })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`)
})
```

### Vercel (Serverless Function)

Crea el archivo `api/run.js`:

```javascript
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { endpoint, payload } = req.body

    if (!endpoint || !payload) {
      return res.status(400).json({ error: 'Missing endpoint or payload' })
    }

    const apiKey = process.env.FOUNDRY_API_KEY

    if (!apiKey) {
      return res.status(500).json({ 
        error: 'FOUNDRY_API_KEY not configured' 
      })
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
        'Ocp-Apim-Subscription-Key': apiKey
      },
      body: JSON.stringify(payload)
    })

    const data = await response.json()

    if (!response.ok) {
      return res.status(response.status).json(data)
    }

    res.json(data)
  } catch (error) {
    console.error('Foundry proxy error:', error)
    res.status(500).json({ error: error.message })
  }
}
```

### Netlify Functions

Crea el archivo `netlify/functions/run.js`:

```javascript
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' }
  }

  try {
    const { endpoint, payload } = JSON.parse(event.body)

    if (!endpoint || !payload) {
      return { 
        statusCode: 400, 
        body: JSON.stringify({ error: 'Missing endpoint or payload' })
      }
    }

    const apiKey = process.env.FOUNDRY_API_KEY

    if (!apiKey) {
      return { 
        statusCode: 500, 
        body: JSON.stringify({ error: 'FOUNDRY_API_KEY not configured' })
      }
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
        'Ocp-Apim-Subscription-Key': apiKey
      },
      body: JSON.stringify(payload)
    })

    const data = await response.json()

    return {
      statusCode: response.status,
      body: JSON.stringify(data)
    }
  } catch (error) {
    console.error('Foundry proxy error:', error)
    return { 
      statusCode: 500, 
      body: JSON.stringify({ error: error.message })
    }
  }
}
```

## Testing

### Probar el proxy localmente

```bash
curl -X POST http://localhost:3000/api/run \
  -H "Content-Type: application/json" \
  -d '{
    "endpoint": "https://tenerife-winter-resource.services.ai.azure.com/api/projects/tenerife-winter/applications/campaign-impact-hub/protocols/activityprotocol?api-version=2025-11-15-preview",
    "payload": {
      "messages": [{"role": "user", "content": "Test brief"}],
      "context": {"uiState": {"view": "campaign"}}
    }
  }'
```

## Troubleshooting

### Error 401/403
- Verifica que `FOUNDRY_API_KEY` esté configurada en el servidor
- Verifica que la key sea válida y activa en Azure Portal
- Verifica que uses el endpoint correcto para tu región de Azure

### Error 404 en /api/run
- El proxy backend no está corriendo o no está desplegado
- Configura `VITE_USE_PROXY=false` temporalmente para modo directo (solo desarrollo)

### CORS en modo directo
- Modo directo no funciona en producción por CORS
- Siempre usa el proxy en producción (`VITE_USE_PROXY=true`)

## Seguridad

⚠️ **IMPORTANTE**: 

- ✅ **NUNCA** pongas `FOUNDRY_API_KEY` en el frontend (.env que empiece con `VITE_`)
- ✅ Configura `FOUNDRY_API_KEY` solo en el servidor (backend)
- ✅ Usa siempre el proxy en producción
- ✅ Añade rate limiting si es necesario
- ✅ Valida los payloads antes de enviarlos a Foundry

## Modo directo (solo desarrollo)

Si necesitas hacer pruebas rápidas sin proxy (NO RECOMENDADO para producción):

```bash
# .env
VITE_USE_PROXY=false
VITE_FOUNDRY_API_KEY=tu-api-key
```

Esto hará que el frontend llame directamente a Foundry. Solo para desarrollo local.
