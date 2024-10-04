// src/utils/tailwindConfig.ts (or .js)
import resolveConfig from 'tailwindcss/resolveConfig';
import { extendedColors, tailwindConfig } from '../../../tailwind.config.js'; // Adjust path to your Tailwind config

const fullConfig = resolveConfig(tailwindConfig);

export const config = fullConfig;
export const colors = extendedColors;
export const spacing = fullConfig.theme?.spacing;
export const screens = fullConfig.theme?.screens;
// Add more exports as needed (e.g., font sizes, border-radius, etc.)
