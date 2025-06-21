import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';
export const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: 'var(--primary-50, #fff5f5)',
      100: 'var(--primary-100, {red.100})',
      200: 'var(--primary-200, {red.200})',
      300: 'var(--primary-300, {red.300})',
      400: 'var(--primary-400, {red.400})',
      500: 'var(--primary-500, {red.500})', // Usa la variable CSS si está definida
      600: 'var(--primary-600, {red.600})',
      700: 'var(--primary-700, {red.700})',
      800: 'var(--primary-800, {red.800})',
      900: 'var(--primary-900, {red.900})',
      950: 'var(--primary-950, {red.950})',
    },
    colorScheme: {
      light: {
        primary: {
          color: 'var(--primary-500, {red.500})', // Usa la variable CSS aquí también
          inverseColor: 'var(--primary-inverse, #ffffff)',
          hoverColor: 'var(--primary-hover, {red.900})',
          activeColor: 'var(--primary-active, {red.800})',
        },
        highlight: {
          background: 'var(--primary-highlight-bg, {red.950})',
          focusBackground: 'var(--primary-focus-bg, {red.700})',
          color: 'var(--primary-highlight-color, #ffffff)',
          focusColor: 'var(--primary-focus-color, #ffffff)',
        },
      },
      dark: {
        primary: {
          color: 'var(--primary-dark, {red.50})',
          inverseColor: 'var(--primary-dark-inverse, {red.950})',
          hoverColor: 'var(--primary-dark-hover, {red.100})',
          activeColor: 'var(--primary-dark-active, {red.200})',
        },
        highlight: {
          background: 'var(--primary-dark-highlight-bg, rgba(250, 250, 250, .16))',
          focusBackground: 'var(--primary-dark-focus-bg, rgba(250, 250, 250, .24))',
          color: 'var(--primary-dark-highlight-color, rgba(255,255,255,.87))',
          focusColor: 'var(--primary-dark-focus-color, rgba(255,255,255,.87))',
        },
      },
    },
  },
});
