export interface FoundryPayload {
  messages: Array<{
    role: 'user' | 'assistant'
    content: string
  }>
  context?: {
    campaignContext?: {
      product?: string
      target?: string
      channels?: string[]
      brandTone?: string
      budget?: string
    }
    uiState?: {
      view?: string
    }
  }
}

export interface FoundryResponse {
  summary?: string
  campaignPlan?: Record<string, any>
  cards?: Record<string, any>
  campaign_name?: string
  channels?: string[]
  hooks?: any
  hashtag_sets?: any
  content_guidelines?: any
  posting_recommendations?: any
  [key: string]: any
}

export interface FoundryError {
  message: string
  type: 'network' | 'auth' | 'cors' | 'parse' | 'unknown'
  recommendation?: string
  mode?: 'direct' | 'proxy'
}

export interface FoundryConfig {
  endpoint?: string
  apiKey?: string
  useProxy?: boolean
  proxyEndpoint?: string
}

export async function runFoundry(
  payload: FoundryPayload,
  config?: FoundryConfig
): Promise<FoundryResponse> {
  const endpoint = config?.endpoint || import.meta.env.VITE_FOUNDRY_ENDPOINT || 
    'https://tenerife-winter-resource.services.ai.azure.com/api/projects/tenerife-winter/applications/campaign-impact-hub/protocols/activityprotocol?api-version=2025-11-15-preview'
  
  const apiKey = config?.apiKey || import.meta.env.VITE_FOUNDRY_API_KEY
  const useProxy = config?.useProxy !== undefined ? config.useProxy : (import.meta.env.VITE_USE_PROXY !== 'false')
  const proxyEndpoint = config?.proxyEndpoint || '/api/run'

  if (useProxy) {
    return await runViaProxy(endpoint, payload, proxyEndpoint)
  } else {
    return await runDirect(endpoint, payload, apiKey)
  }
}

async function runViaProxy(
  endpoint: string,
  payload: FoundryPayload,
  proxyEndpoint: string
): Promise<FoundryResponse> {
  try {
    const response = await fetch(proxyEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        endpoint,
        payload,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error')
      
      if (response.status === 401 || response.status === 403) {
        const error: FoundryError = {
          message: `Authentication error via proxy (${response.status}): ${errorText}`,
          type: 'auth',
          mode: 'proxy',
          recommendation: 'Revisa que FOUNDRY_API_KEY esté configurado en el servidor backend. El proxy necesita la API key en el entorno del servidor.'
        }
        throw error
      }

      if (response.status === 404) {
        const error: FoundryError = {
          message: 'Proxy endpoint /api/run not found',
          type: 'network',
          mode: 'proxy',
          recommendation: 'El backend proxy no está disponible. Configura VITE_USE_PROXY=false para modo directo, o implementa el endpoint /api/run en tu servidor.'
        }
        throw error
      }

      throw {
        message: `Proxy error ${response.status}: ${errorText}`,
        type: 'network',
        mode: 'proxy',
      } as FoundryError
    }

    const data = await response.json()
    return data as FoundryResponse
  } catch (err: any) {
    if (err.type) {
      throw err
    }

    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      const error: FoundryError = {
        message: 'No se puede conectar al proxy /api/run',
        type: 'cors',
        mode: 'proxy',
        recommendation: 'Verifica que el servidor backend esté corriendo y que el endpoint /api/run esté disponible.'
      }
      throw error
    }

    const unknownError: FoundryError = {
      message: err.message || 'Unknown error via proxy',
      type: 'unknown',
      mode: 'proxy',
    }
    throw unknownError
  }
}

async function runDirect(
  endpoint: string,
  payload: FoundryPayload,
  apiKey?: string
): Promise<FoundryResponse> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  if (apiKey) {
    headers['api-key'] = apiKey
    headers['Ocp-Apim-Subscription-Key'] = apiKey
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error')
      
      if (response.status === 401 || response.status === 403) {
        const error: FoundryError = {
          message: `Authentication error (${response.status}): ${errorText}`,
          type: 'auth',
          mode: 'direct',
          recommendation: apiKey 
            ? 'La API key proporcionada no es válida o no tiene permisos. Verifica: 1) Que sea del recurso correcto (region), 2) Que esté activa en Azure, 3) Que el endpoint sea el correcto para tu recurso.'
            : 'Activa proxy /api/run o configura VITE_FOUNDRY_API_KEY en tus variables de entorno.'
        }
        throw error
      }

      throw {
        message: `HTTP ${response.status}: ${errorText}`,
        type: 'network',
        mode: 'direct',
      } as FoundryError
    }

    const data = await response.json()
    return data as FoundryResponse
  } catch (err: any) {
    if (err.type) {
      throw err
    }

    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      const corsError: FoundryError = {
        message: 'CORS error: Cannot connect to Foundry endpoint from browser',
        type: 'cors',
        mode: 'direct',
        recommendation: 'Los navegadores bloquean llamadas directas a Azure por CORS. Solución recomendada: activa VITE_USE_PROXY=true y usa el proxy backend /api/run.'
      }
      throw corsError
    }

    const unknownError: FoundryError = {
      message: err.message || 'Unknown error occurred',
      type: 'unknown',
      mode: 'direct',
    }
    throw unknownError
  }
}

export async function runCampaignFlow(
  payload: FoundryPayload
): Promise<FoundryResponse> {
  return runFoundry(payload)
}
