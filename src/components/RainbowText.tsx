import React from 'react';

export interface RainbowTextProps {
    text: string;
}

const FPS = 30;

export default function RainbowText(props: RainbowTextProps) {
    const [t, setT] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setT(t => t + (60 / FPS));
        }, 1000 / FPS);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <>
            {props.text.split('').map((char, i) => {
                const hue = (t - i * 10) % 360;
                return (
                    <span key={i} style={{ color: `hsl(${hue}, 100%, 50%)` }}>
                        {char}
                    </span>
                );
            })}
        </>
    );
}