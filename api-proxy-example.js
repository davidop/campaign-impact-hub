/**
 * Ejemplo de proxy backend para Foundry
 * 
 * Este archivo es un ejemplo de cómo implementar el endpoint /api/run
 * para hacer llamadas seguras a Microsoft Foundry desde el backend.
 * 
 * IMPORTANTE: Este código debe ejecutarse en un servidor Node.js,
 * NO en el frontend. Puedes usar:
 * - Express server
 * - Vercel Serverless Functions
 * - Netlify Functions
 * - AWS Lambda
 * - Azure Functions
 * 
 * Ver PROXY_BACKEND_GUIDE.md para más detalles.
 */

// Ejemplo para Express (Node.js)
export async function handleFoundryProxy(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { endpoint, payload } = req.body

    if (!endpoint || !payload) {
      return res.status(400).json({ 
        error: 'Missing endpoint or payload in request body' 
      })
    }

    // La API key DEBE estar en el servidor, NO en el frontend
    const apiKey = process.env.FOUNDRY_API_KEY

    if (!apiKey) {
      return res.status(500).json({ 
        error: 'FOUNDRY_API_KEY not configured on server',
        recommendation: 'Set FOUNDRY_API_KEY environment variable on your backend server'
      })
    }

    // Hacer la llamada a Foundry desde el servidor
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
        'Ocp-Apim-Subscription-Key': apiKey // Compatibilidad con Azure API Management
      },
      body: JSON.stringify(payload)
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Foundry error:', response.status, data)
      return res.status(response.status).json({
        error: data,
        message: `Foundry returned status ${response.status}`
      })
    }

    // Devolver la respuesta de Foundry al frontend
    res.json(data)
  } catch (error) {
    console.error('Proxy error:', error)
    res.status(500).json({ 
      error: error.message || 'Internal server error',
      type: 'proxy_error'
    })
  }
}

// Ejemplo de uso con Express:
/*
import express from 'express'
import { handleFoundryProxy } from './api/foundry-proxy.js'

const app = express()
app.use(express.json())

app.post('/api/run', handleFoundryProxy)

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
*/
