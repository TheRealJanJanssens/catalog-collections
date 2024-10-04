import { usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';

type IconProps = {
    category: string;
    name: string;
    color?: string;
    size?: number;
    style?: React.CSSProperties;
};

export default function Icon({
    category,
    name,
    color = 'currentColor',
    size = 24,
    style = {},
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
                const modifiedSvg = data.replace(
                    /fill="[^"]*"/g,
                    `fill="${color}"`,
                );
                setSvgContent(modifiedSvg);
            })
            .catch((err) => console.error(`Failed to load icon: ${name}`, err));
    }, [assetUrl, category, name, color]); // Include 'color' in the dependency array

    // if (!svgContent) {
    //     return null; // Optionally, return a loader or placeholder
    // }

    return (
        <span
            dangerouslySetInnerHTML={{ __html: svgContent }}
            style={{ ...style, width: size, height: size }}
            {...props}
        />
    );
}
