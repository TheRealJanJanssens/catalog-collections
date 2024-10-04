import forms from '@tailwindcss/forms';
import colors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';

const extendedColors = {
    ...colors,
    ...{
        primary: colors.indigo,
        secondary: colors.yellow,
        //Extended Background colors
        basalt: {
            50: '#FFFFFF', //Light 4
            200: '#FAFBFC', //Light 3
            300: '#EBECF0', //Light 2
            500: '#C1C7D0', //Light 1 / Dark 1
            600: '#2F3746', //Dark 2
            700: '#232A37', //Dark 3
            800: '#161C27', //Dark 4
        },
        //Extended Text colors
        limestone: {
            50: '#FFFFFF', //Dark 1
            200: '#EEF1F5', //Dark 2
            300: '#B0B7C3', //Dark 4 / Light 4
            500: '#8A94A6', //Dark 3 / Light 3
            600: '#4E5D78', //Light 2
            700: '#323B4B', //Light 1
        },
    },
};

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        colors: extendedColors,
        fontSize: {
            '2xs': [
                '0.625rem', // 10px - Tiny
                {
                    fontWeight: '500',
                },
            ],
            xs: [
                '0.75rem', // 12px - Small 3
                {
                    fontWeight: '500',
                },
            ],
            sm: [
                '0.875rem', // 14px - Small 2
                {
                    fontWeight: '500',
                },
            ],
            base: [
                '1rem', // 16px - Small 1
                {
                    fontWeight: '500',
                },
            ],
            lg: [
                '1.125rem', // 18px - Body 2
                {
                    fontWeight: '500',
                },
            ],
            xl: [
                '1.25rem', // 20px - Body 1
                {
                    fontWeight: '500',
                },
            ],
            '2xl': [
                '1.375rem', // 22px - Heading 9
                {
                    fontWeight: '600',
                },
            ],
            '3xl': [
                '1.5rem', // 24px - Heading 8
                {
                    fontWeight: '600',
                },
            ],
            '4xl': [
                '1.625rem', // 26px - Heading 7
                {
                    fontWeight: '600',
                },
            ],
            '5xl': [
                '1.75rem', // 28px - Heading 6
                {
                    fontWeight: '600',
                },
            ],
            '6xl': [
                '2rem', // 32px - Heading 5
                {
                    fontWeight: '600',
                    lineHeight: '2.5rem',
                },
            ],
            '7xl': [
                '2.5rem', // 40px - Heading 4
                {
                    fontWeight: '600',
                },
            ],
            '8xl': [
                '3rem', // 48px - Heading 3
                {
                    fontWeight: '700',
                },
            ],
            '9xl': [
                '3.75rem', // 60px - Heading 2
                {
                    fontWeight: '700',
                },
            ],
            '10xl': [
                '5rem', // 80px - Heading 1
                {
                    fontWeight: '700',
                },
            ],
        },
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
            },
            borderRadius: {
                md: '15px', //Check: make rem?
            },
        },
    },

    plugins: [forms],
};

export { extendedColors };
