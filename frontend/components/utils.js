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


export const getSelectedVariant =() => {
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
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        const resultJson = await result.json()
        // console.log("resultJson", resultJson)
        return resultJson
    }
    catch {
        console.log('error')
    }
}

export async function generate(prompt) {
    const resp = await fetch('/apps/image/prompt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: prompt,
            style: "standard",
            
        })
    });
    return resp;
}

// export async function generate(prompt,imageStyle) {
//    const resp = {prompt: prompt, url: 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?v=1622146479'}
//     return JSON.stringify(resp);
// }