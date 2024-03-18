export const getProductVariant = (variants, shape) => {
 // const imageLabel = shape.title ? shape.title : shape.label
 let imageLabel = ''
 const variant = variants.find((variant) => {
  if (shape.id.startsWith('ba')) {
   const shapeMatch = ` Banner ${shape.label}`
   variants.find((variant) => {
    imageLabel = variant.title.includes(shapeMatch)
   })
   return imageLabel
  }
  const title = variant.title.replace(/["']/g, '')
  return title.includes(imageLabel)
 })
 return variant
}

const gen = {
 shape: {
  id: 'ba3',
  label: '2\'x6"',
  ar: '3:1',
  grid: false,
 },
}
const variant = {
 id: 41462490824787,
 title: "Banner 2'x6'",
 option1: "Banner 2'x6'",
 option2: null,
 option3: null,
 sku: '',
 requires_shipping: true,
 taxable: true,
 featured_image: null,
 available: true,
 name: "AI Designed Custom Decal - Banner 2'x6'",
 public_title: "Banner 2'x6'",
 options: ["Banner 2'x6'"],
 price: 9000,
 weight: 0,
 compare_at_price: null,
 inventory_management: null,
 barcode: '',
 quantity_rule: {
  min: 1,
  max: null,
  increment: 1,
 },
 quantity_price_breaks: [],
 requires_selling_plan: false,
 selling_plan_allocations: [],
}
