/** @type {import('tailwindcss').Config} */
export const content = ['./frontend/**/*.{js,ts,jsx,tsx}']
export const theme = {
 extend: {
    colors: {
      "bg-primary": "#0D0E0F",
      "bg-secondary": "#1A1A1A",
      "bg-tertiary": "#222222",
      "accent": "#d2ac53",
      "accent-bright": "#FCC000",
      "btn-bg": "#000",
      "btn-border": "#D9D9D9",
      "txt-primary": "#fff",
      "txt-secondary": "#A6A6A6",
      "border": "#D2D2D2",
      "divider": "#EAEAEA",
      "img-bg": "#EEEEEE",
      "icon": "#898989",
      "backdrop": "#1a1a1a75",
      "backdrop-dark":"#1a1a1ad3"
    },
    backgroundImage: {
        'pholder':"url('https://res.cloudinary.com/dkxssdk96/image/upload/v1706821466/square-pholder_iwtdfz.png')"
      }
    }
 }

export const plugins = []
export const prefix = ''
