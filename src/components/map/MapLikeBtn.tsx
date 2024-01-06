import React from 'react';
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Heart, HeartFill } from "react-bootstrap-icons";
import useMapLikes from "../../hooks/useMapLikes";

export default function MapLikeBtn(props: { id: string | undefined, likeCount: number }) {
    const [isLiked, toggleLike, canLike] = useMapLikes(props.id);
    const [likeOffset, setLikeOffset] = React.useState(0);

    const likeCount = props.likeCount + likeOffset;

    const onClick = React.useCallback(() => {
        if (!canLike)
            return;

        toggleLike().then(() => {
            setLikeOffset(likeOffset + (isLiked ? -1 : 1));
        }).catch(err => {
            console.error(err);
            alert(err);
        });
    }, [toggleLike, canLike, isLiked, likeOffset]);

    return (
        <OverlayTrigger
            placement="top"
            overlay={
                <Tooltip>
                    {!canLike ? "Must be logged in to like a map" : isLiked ? "Unlike" : "Like"}
                </Tooltip>
            }
        >
            <Button
                size={"lg"}
                variant={isLiked ? "danger" : "outline-danger"}
                onClick={onClick}
                disabled={!canLike}
                className={"ms-2 mt-2 d-flex justify-content-center align-items-center"}
            >
                <h5 className={"mb-0 me-2"}>
                    {likeCount}
                </h5>
                {isLiked ?
                    <HeartFill size={16} />
                    :
                    <Heart size={16} />
                }
            </Button>
        </OverlayTrigger>
    );
}