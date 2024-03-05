/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'passionBlack': '#0C0C0C',
        'passionWhite': '#FAF6E6',
        'passionGreen': '#4C5A31',
        'passionBrown': '#422C19',
        'passionBeige': '#D8C195',
        'passionYellow': '#F4B21E',
        'passionOrange': '#F99B22',
        'passionRed': '#DA2031',
        'passionBlue': '#204688',
        'passionGold': '#DE9041',
        'neutralSilver': "#F5F7FA",
        'neutralDGrey': "#4D4D4D",
        'neutralGrey': "#717171",
        'gray900': "#18191F",
      },
    },
  },
  plugins: [require('flowbite/plugin')],
}

