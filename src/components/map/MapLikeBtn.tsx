import React from 'react';
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Heart, HeartFill } from "react-bootstrap-icons";
import { useLiked } from "../../hooks/useMaps";

export default function MapLikeBtn(props: { id: string | undefined, likeCount: number }) {
    const [isLiked, toggleLike, canLike] = useLiked(props.id);
    const [likeOffset, setLikeOffset] = React.useState(0);

    const likeCount = props.likeCount + likeOffset;

    const onClick = () => {
        if (canLike) {
            toggleLike();
            setLikeOffset(likeOffset + (isLiked ? -1 : 1));
        }
    }

    return (
        <>
            <OverlayTrigger
                placement="top"
                overlay={
                    <Tooltip>
                        {!canLike ? "Must be logged in to like a map" : isLiked ? "Unlike" : "Like"}
                    </Tooltip>
                }>
                <span className='d-inline-block'>
                    <Button
                        variant={isLiked ? "danger" : "outline-danger"}
                        onClick={onClick}
                        disabled={!canLike}
                        style={{ marginLeft: 10, marginTop: 5, height: 40 }}>

                        <div style={{ display: "flex", alignItems: "center" }}>
                            <h5 style={{ margin: 0, marginRight: 6 }}>{likeCount}</h5>
                            {isLiked ?
                                <HeartFill size={16} />
                                :
                                <Heart size={16} />
                            }
                        </div>

                    </Button>
                    <br />
                </span>
            </OverlayTrigger>
        </>
    );
}