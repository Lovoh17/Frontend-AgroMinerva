// utils/seo.js
import { createHead } from '@vueuse/head'

/**
 * INSTRUCCIONES DE USO PARA CONTENIDO DINÁMICO:
 * 
 * ✅ NOTICIAS Y POSTS:
 *    useSeo({
 *      title: `Título de la Noticia - AgroMinerva`,
 *      meta: [
 *        {
 *          name: 'description',
 *          content: 'Resumen de la noticia de 150-160 caracteres...'
 *        },
 *        // Meta tags para redes sociales
 *        { property: 'og:title', content: 'Título para Facebook' },
 *        { property: 'og:image', content: 'https://.../imagen-noticia.jpg' }
 *      ]
 *    })
 * 
 * ✅ CONTENIDO ESPECIALIZADO:
 *    - Noticias agrícolas
 *    - Artículos de investigación  
 *    - Posts del blog
 *    - Eventos académicos
 *    - Productos específicos
 */

export const head = createHead()

export const defaultSeo = {
    title: 'AgroMinerva - Universidad de El Salvador', 
    meta: [
        {
            name: 'description',
            content: 'Departamento de Agronomía de la Universidad de El Salvador'
        },
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
        { rel: 'icon', type: 'image/x-icon', href: '/public/AGRO-MINERVA-VERTICAL-SIN-FONDO.png' }
    ]
}

// Composable reutilizable
export const useSeo = (seoConfig = {}) => {
    const config = {
        ...defaultSeo,
        ...seoConfig,
        meta: [
            // Mantener meta tags por defecto que no se sobreescriban
            ...defaultSeo.meta.filter(defaultMeta =>
                !seoConfig.meta?.some(newMeta => newMeta.name === defaultMeta.name)
            ),
            ...(seoConfig.meta || [])
        ],
        link: [
            ...defaultSeo.link,
            ...(seoConfig.link || [])
        ]
    }

    head.push(config)
    return config
}