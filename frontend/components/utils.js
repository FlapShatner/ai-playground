import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { commonPrompt } from './prePrompt'

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

export function makeLabel(inputString) {
    const parts = inputString.split('Decal')
    return parts.length > 1 ? parts[1].trim() : ''
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
    } else if (shape.id.startsWith('mb')) {
        return 'mailbox'
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
