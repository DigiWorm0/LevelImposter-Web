import React from "react";
import { Button } from "react-bootstrap";
import Linkify from "react-linkify";

export interface FormattedTextProps {
    text: string;
}

const MAX_LENGTH = 500;

export default function FormattedText(props: FormattedTextProps) {
    const [isExpanded, setIsExpanded] = React.useState(false);

    const isExpandable = (props.text.length ?? 0) > MAX_LENGTH;

    return (
        <>
            <Linkify>
                <p style={{ whiteSpace: "pre-wrap", marginBottom: 0 }}>
                    {isExpandable && !isExpanded
                        ? props.text?.substring(0, MAX_LENGTH) + "..."
                        : props.text
                    }
                </p>
            </Linkify>
            {isExpandable && (
                <Button
                    variant="link"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? "Show Less" : "Show More"}
                </Button>
            )}
        </>
    )

}