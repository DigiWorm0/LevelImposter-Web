import React from "react";

export interface ClickToShowProps {
    buttonText?: string;
    children: React.ReactNode;
}

export default function ClickToShow(props: ClickToShowProps) {
    const [isShowing, setIsShowing] = React.useState(false);

    return (
        <>
            {!isShowing && (
                <p
                    className={"text-muted"}
                    onClick={() => setIsShowing(true)}
                    style={{ cursor: 'pointer' }}
                >
                    {props.buttonText}
                </p>
            )}
            {isShowing && props.children}
        </>
    )
}