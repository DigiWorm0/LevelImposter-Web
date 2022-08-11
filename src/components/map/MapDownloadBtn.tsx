import { getDownloadURL, ref } from "firebase/storage";
import { Button } from "react-bootstrap";
import { storage } from "../../hooks/Firebase";

export default function MapDownloadBtn(props: { id: string, authorID: string }) {

    const onDownload = () => {
        const storageURL = `maps/${props.authorID}/${props.id}.lim`;
        const storeRef = ref(storage, storageURL);
        getDownloadURL(storeRef).then((url) => {
            window.location.href = url;
        }).catch((err) => {
            console.error(err);
            alert(err);
        });
    }

    return (
        <>
            <Button
                variant="primary"
                onClick={onDownload}
                style={{ marginBottom: 10 }}>
                Download LIM
            </Button>
            <br />
        </>
    );
}