import { getDownloadURL, ref } from "firebase/storage";
import { Button } from "react-bootstrap";
import { Download } from "react-bootstrap-icons";
import { storage } from "../../hooks/Firebase";
import { getDoc } from "firebase/firestore";

export default function MapDownloadBtn(props: { id: string, authorID: string }) {

    const onDownload = () => {
        const storageURL = `maps/${props.authorID}/${props.id}.lim`;
        const storageURL2 = `maps/${props.authorID}/${props.id}.lim2`;
        const storeRef = ref(storage, storageURL);
        const storeRef2 = ref(storage, storageURL2);

        getDownloadURL(storeRef).then((url) => {
            window.location.href = url;
        }).catch((err) => {
            if (err.code !== "storage/object-not-found")
            {
                console.error(err);
                alert(err);
                return;
            }

            getDownloadURL(storeRef2).then((url) => {
                window.location.href = url;
            }).catch((err) => {
                console.error(err);
                alert(err);
            });
        });
    }

    return (
        <>
            <Button
                variant="primary"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onDownload();
                }}
                style={{ marginTop: 8, flex: "1 1 auto", width: "100%", display: "flex", justifyContent: "center" }}
            >
                <Download size={20} style={{ marginRight: 10 }} />
                Download
            </Button>
        </>
    );
}