import { usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';

type IconProps = {
    category: string;
    name: string;
    color?: string;
    size?: number;
    style?: React.CSSProperties;
    className?: string;
};

export default function Icon({
    category,
    name,
    color = 'currentColor',
    size = 24,
    style = {},
    className = '',
    ...props
}: IconProps): React.ReactElement {
    const { assetUrl } = usePage().props;
    const [svgContent, setSvgContent] = useState<string | TrustedHTML>('');

    useEffect(() => {
        const iconUrl = `${assetUrl}icons/${category}/${name}.svg`;

        fetch(iconUrl)
            .then((response) => response.text())
            .then((data) => {
                // Replace any fill attribute inside the SVG with the dynamic color
                let modifiedSvg = data
                    .replace(/width="24"/g, `width="${size}"`)
                    .replace(/height="24"/g, `height="${size}"`)
                    .replace(
                        /sizeBox="[^"]*"/g,
                        `sizeBox="0 0 ${size} ${size}"`,
                    );

                if (color !== 'currentColor') {
                    modifiedSvg = modifiedSvg.replace(
                        /fill="[^"]*"/g,
                        `fill="${color}"`,
                    );
                }

                setSvgContent(modifiedSvg);
            })
            .catch((err) => console.error(`Failed to load icon: ${name}`, err));
    }, [assetUrl, category, name, color]); // Include 'color' in the dependency array

    // if (!svgContent) {
    //     return null; // Optionally, return a loader or placeholder
    // }

    return (
        <span
            className={className}
            dangerouslySetInnerHTML={{ __html: svgContent }}
            style={{ ...style, width: size, height: size }}
            {...props}
        />
    );
}
