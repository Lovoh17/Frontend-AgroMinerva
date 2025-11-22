const BASE_URL = import.meta.env.VITE_API_URL || 'https://api.tomates.com'

function buildUrl(endpoint) {
    // Si el endpoint ya es una URL completa se Usa directamente
    if (endpoint.startsWith('http')) {
        return endpoint
    }
    return `${BASE_URL}/${endpoint}`
}

function handleResponse(res) {
    if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`)
    }
    
    // Para respuestas vacías 
    if (res.status === 204) {
        return null
    }
    
    return res.json()
}

export const api = {
    get: async (endpoint, params = {}) => {
        const query = new URLSearchParams(params).toString()
        const url = query ? `${buildUrl(endpoint)}?${query}` : buildUrl(endpoint)
        
        console.log(`🌐 Haciendo GET a: ${url}`) // Debug
        
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return handleResponse(res)
    },

    post: async (endpoint, data) => {
        const url = buildUrl(endpoint)
        console.log(`🌐 Haciendo POST a: ${url}`, data) // Debug
        
        const res = await fetch(url, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        return handleResponse(res)
    },

    put: async (endpoint, data) => {
        const url = buildUrl(endpoint)
        const res = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        return handleResponse(res)
    },

    delete: async (endpoint) => {
        const url = buildUrl(endpoint)
        const res = await fetch(url, { 
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return handleResponse(res)
    },
}