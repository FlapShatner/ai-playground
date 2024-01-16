import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
 return twMerge(clsx(inputs))
}


// export async function generate(prompt) {
//     const apiKey = import.meta.env.VITE_DEEPAI_API_KEY
//     const resp = await fetch('https://api.deepai.org/api/text2img', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'api-key': apiKey
//         },
//         body: JSON.stringify({
//             text: prompt,
//         })
//     });
    
//     const data = await resp.json();
//     console.log(data);
//     return data.output_url;
// }

export async function generate(prompt,imageStyle) {
    const resp = await fetch('/apps/image/prompt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: prompt,
            style: imageStyle
        })
    });
    return  resp;
}