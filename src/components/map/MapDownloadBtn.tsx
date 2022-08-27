import { getDownloadURL, ref } from "firebase/storage";
import { Button } from "react-bootstrap";
import { CloudArrowDownFill } from "react-bootstrap-icons";
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
                style={{ marginBottom: 10, marginRight: 10 }}>

                <CloudArrowDownFill size={24} />

            </Button>
        </>
    );
}