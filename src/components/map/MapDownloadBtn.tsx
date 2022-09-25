import { getDownloadURL, ref } from "firebase/storage";
import { Button } from "react-bootstrap";
import { Download } from "react-bootstrap-icons";
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
                style={{ marginTop: 8, flex: "1 1 auto", width: "100%", display: "flex", justifyContent: "center" }}>


                <Download size={20} style={{ marginRight: 10 }} />
                Download

            </Button>
        </>
    );
}