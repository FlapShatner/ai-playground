export const getCart = async () => {
 try {
  const cart = await fetch(window.Shopify.routes.root + 'cart.js')
  const cartJson = await cart.json()
  return cartJson
 } catch {
  console.log('error')
 }
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

export const getProductByHandle = async (handle) => {
 const product = await fetch(window.Shopify.routes.root + 'products/' + handle + '.js')
 const productJson = await product.json()
 return productJson
}
