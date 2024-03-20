import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { commonPrompt } from './prePrompt'

export const wsUrl = 'wss://tunnel.ink-dev.com/'

export function cn(...inputs) {
 return twMerge(clsx(inputs))
}
export const formatPrice = (price, quantity) => {
 if (typeof price === 'string') {
  price = parseInt(price)
 }
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
  return resultJson
 } catch {
  console.log('error')
 }
}

export function makeLabel(inputString) {
 const parts = inputString.split('Decal')
 return parts.length > 1 ? parts[1].trim() : ''
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

export const assemblePrompt = (prompt, style, shape) => {
 const fullPrompt = () => {
  if (prompt.endsWith('noprefix')) {
   return prompt
  } else {
   if (shape.id == 'de1') {
    return `${commonPrompt} ${style} ${prompt}`
   } else {
    return `${style} ${prompt} --ar ${shape.ar}`
   }
  }
 }
 return fullPrompt(prompt)
}

export const assembleCallData = (prompt, style, shape, wsId) => {
 const data = {
  prompt: assemblePrompt(prompt, style.prompt, shape),
  style: style.id,
  wsId: wsId,
 }
 return data
}

export const makeString = (meta) => {
 if (typeof meta != 'string') {
  return JSON.stringify(meta)
 }
 return meta
}

export const getVariantType = (shape) => {
 if (shape.id == 'de1') {
  return 'decal'
 } else if (shape.id.startsWith('dp')) {
  return 'print'
 } else if (shape.id.startsWith('ba')) {
  return 'banner'
 } else if (shape.id.startsWith('wi')) {
  return 'window'
 } else if (shape.id.startsWith('ts')) {
  return 'tshirt'
 } else if (shape.id.startsWith('3d')) {
  return '3dprint'
 }
}

export const getProductVariant = (variants, shape) => {
 let imageLabel = shape.label
 const variant = variants.find((item) => {
  return item.title.includes(imageLabel)
 })
 return variant
}

export const getDecalSizes = (product) => {
 const variants = product.variants
 const decalVariants = variants.filter((variant) => variant.title.includes('Decal'))
 const sizes = decalVariants.map((variant) => {
  return variant
 })
 return sizes
}

export async function generate(data) {
 try {
  const resp = await fetch('/a/image/gen', {
   method: 'POST',
   headers: {
    'Content-Type': 'application/json',
   },
   body: JSON.stringify(data),
  })
  if (!resp.status === 200) {
   throw new Error('Failed to generate image')
  }
  return resp
 } catch {
  console.log('error')
  return { ok: false, error: 'Failed to generate image' }
 }
}

export const getVariants = async (callData) => {
 const { meta, activeIndex, fullPrompt, wsId } = callData
 try {
  const resp = await fetch('/a/image/var', {
   method: 'POST',
   headers: {
    'Content-Type': 'application/json',
   },
   body: JSON.stringify({
    job: meta,
    index: activeIndex,
    prompt: fullPrompt,
    wsId: wsId,
   }),
  })
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
 try {
  const resp = await fetch('/a/image/upscale', {
   method: 'POST',
   headers: {
    'Content-Type': 'application/json',
   },
   body: JSON.stringify({
    job: meta,
    index: i,
   }),
  })
  if (!resp.ok) {
   throw new Error('Failed to generate image')
  }
  const data = await resp.json()
  return { ok: true, resp: data }
 } catch (error) {
  console.log(error)
  return { ok: false, error: error }
 }
}
