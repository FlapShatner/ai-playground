export const findSuggProducts = async (tags) => {
 const jsonTags = await tags.json()

 let suggestions = []
 for (let i = 0; i < jsonTags.length && i < 20; i++) {
  const tag = jsonTags[i]
  const query =
   window.Shopify.routes.root +
   `search/suggest.json?q=${tag}&resources[type]=product&resources[options][unavailable_products]=show&resources[options][fields]=title,variants.title,body,tag&resources[options][limit]=10`
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
