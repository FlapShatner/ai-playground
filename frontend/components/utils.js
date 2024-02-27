import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
export const formatPrice = (price, quantity) => {
  let result = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format((price * quantity) / 100)
  return result
}

export const getCart = async () => {
  try {
    const cart = await fetch(window.Shopify.routes.root + 'cart.js')
    const cartJson = await cart.json()
    // console.log("cart", cartJson)
    return cartJson
  } catch {
    console.log('error')
  }
}

export const getCurrentUrl = () => {
  const url = window.location.href
  return url
}

export const getSelectedVariant = () => {
  const url = getCurrentUrl()
  const variantId = url.split('variant=')[1]
  return variantId
}

export const getCurrentProduct = async () => {
  // const url = getCurrentUrl()
  const productId = 'ai-designed-custom-decal'
  const product = await fetch(window.Shopify.routes.root + 'products/' + productId + '.js')
  const productJson = await product.json()
  return productJson
}

export const addToCart = async (formData) => {
  try {
    const result = await fetch(window.Shopify.routes.root + 'cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    const resultJson = await result.json()
    // console.log("resultJson", resultJson)
    return resultJson
  } catch {
    console.log('error')
  }
}


export const findSuggProducts = async (tags) => {
  const jsonTags = await tags.json()
  
  let suggestions = []
  for (let i = 0; i < jsonTags.length && i < 10; i++) {
    const tag = jsonTags[i]
    const query =
      window.Shopify.routes.root +
      `search/suggest.json?q=${tag}&resources[type]=product&resources[options][unavailable_products]=hide&resources[options][fields]=title,variants.title,body,tag&resources[options][limit]=3`
    const resp = await fetch(query)
    const respJson = await resp.json()
    const results = await respJson.resources.results.products
    if (results.length > 0) {
      suggestions.push(results)
    }
  }
  const flatSuggestions = suggestions.flat()
  // console.log('flatSuggestions', flatSuggestions)
  return flatSuggestions
}

export const getSuggest = async (prompt) => {
  const resp = await fetch('/a/image/suggest', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: prompt,
    }),
  })
  const suggProducts = await findSuggProducts(resp)
  return suggProducts
}

export const getProductByHandle = async (handle) => {
  const product = await fetch(window.Shopify.routes.root + 'products/' + handle + '.js')
  const productJson = await product.json()
  return productJson
}

// export async function generate(prompt,imageStyle) {
//    const resp = {prompt: prompt, url: 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?v=1622146479'}
//     return JSON.stringify(resp);
// }

export const getQuadrants = (url) => {
  const parts = url.split('/upload/')
  const baseUrl = parts[0] + '/upload/'
  const fileName = parts[1]
  
  // Define the transformations
  const transformations = {
    topleft: 't_topleft',
    topright: 't_topright',
    btmleft: 't_btmleft',
    btmright: 't_btmright',
  }
  
  // Generate URLs with transformations
  return Object.entries(transformations).map(([key, value], i) => {
    return { id:i, label: key, url: `${baseUrl}${value}/${fileName}` }
  })
}



export async function generate(data) {
  const { prompt, style, fullPrompt } = data
  try {
    const resp = await fetch('/a/image/gen', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
      }),
    })
    if (!resp.ok) {
      throw new Error('Failed to generate image')
    }
    return resp
  } catch {
    console.log('error')
    return { ok: false, error: 'Failed to generate image' }
  }
}

export const getVariants = async (meta, i) => {
  console.log('meta', meta, 'i', i)
  try{
    const resp = await fetch('/a/image/var', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        job: meta,
        index: i
      }),
    })
    console.log('resp', resp)
    if (!resp.ok) {
      throw new Error('Failed to generate image')
    }
    
    return resp
  } catch {
    console.log('error')
    return { ok: false, error: 'Failed to generate variants' }
  }
} 

export const upscale = async (meta, i) => {
  try{
    const resp = await fetch('/a/image/upscale', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        job: meta,
        index: i
      }),
    })
    if (!resp.ok) {
      throw new Error('Failed to generate image')
    }
    
    return resp
  } catch {
    console.log('error')
    return { ok: false, error: 'Failed to upscale image' }
  }
}