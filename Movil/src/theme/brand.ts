/**
 * Paleta ActiveLife extraída del cliente web (Nav2_web.jsx / index.css).
 * Úsala en todas las pantallas para que los bocetos queden consistentes.
 */
export const Brand = {
  green: '#7F9E7A', // --green_7F9E7A (barra sólida)
  greenLight: '#8FB080', // fin del degradado del nav
  greenDark: '#3D5A30', // avatar / acentos fuertes
  greenGradient: ['#7A9E6E', '#8FB080'] as const,
  ink: '#2C3E1F', // texto sobre fondos verdes
  surface: '#F2F5EF', // fondo suave de las tarjetas de los bocetos
  white: '#FFFFFF',
  danger: '#C0392B',
  muted: '#6B7B5E',
} as const;

export type BrandColor = keyof typeof Brand;
