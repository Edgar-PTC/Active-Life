/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      // Paleta ActiveLife — misma que src/theme/brand.js (mantener en sync).
      // brand.js sigue existiendo para props que piden un color real (iconos lucide,
      // ActivityIndicator, degradados); aquí viven las clases de estilo.
      colors: {
        brand: {
          green: '#7F9E7A',
          'green-light': '#8FB080',
          'green-dark': '#3D5A30',
          'green-med': '#8AA878',
          'green-deep': '#3F4E33',
          'green-forest': '#455942',
          ink: '#2C3E1F',
          'ink-dark': '#20301A',
          surface: '#F2F5EF',
          sage: '#CFD9C7',
          mist: '#DCE7D2',
          sand: '#B9AFA4',
          crumb: '#5C5140',
          chip: '#EEF2E8',
          salmon: '#C98D86',
          button: '#8BB96B',
          stepper: '#6B7355',
          muted: '#6B7B5E',
          danger: '#C0392B',
          google: '#EA4335',
        },
      },
    },
  },
  plugins: [],
};
