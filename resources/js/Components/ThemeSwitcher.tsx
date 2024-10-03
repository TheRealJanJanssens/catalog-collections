import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

const ThemeSwitcher = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // Check for saved theme preference or use system preference
        const isDarkMode =
            localStorage.getItem('darkMode') === 'true' ||
            (!('darkMode' in localStorage) &&
                window.matchMedia('(prefers-color-scheme: dark)').matches);
        setDarkMode(isDarkMode);
    }, []);

    useEffect(() => {
        // Update the HTML class and localStorage when darkMode changes
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('darkMode', 'true');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('darkMode', 'false');
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <button
            onClick={toggleDarkMode}
            className="rounded-full bg-gray-200 p-2 text-gray-800 transition-colors duration-200 dark:bg-gray-800 dark:text-gray-200"
            aria-label="Toggle dark mode"
        >
            {darkMode ? (
                <Sun className="h-5 w-5" />
            ) : (
                <Moon className="h-5 w-5" />
            )}
        </button>
    );
};

export default ThemeSwitcher;
