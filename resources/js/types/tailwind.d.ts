import 'tailwindcss/defaultTheme';

declare module 'tailwindcss/defaultTheme' {
    interface DefaultColors {
        primary: {
            [key: string]: string;
        };
        secondary: {
            [key: string]: string;
        };
        basalt: {
            [key: string]: string;
        };
        limestone: {
            [key: string]: string;
        };
    }
}
