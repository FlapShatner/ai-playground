import { defineConfig } from 'vite'
import shopify from 'vite-plugin-shopify'
import react from '@vitejs/plugin-react'

export default defineConfig({   
 plugins: [
  shopify({
   themeRoot: 'extensions/uploader',
  }),
  react({
      babel: {
        presets: ['jotai/babel/preset'],
      },
    }),
 ],
})
