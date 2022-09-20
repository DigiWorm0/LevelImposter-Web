export default interface GHRelease {
    tag_name: string;
    name: string;
    url: string;
    assets_url: string;
    upload_url: string;
    html_url: string;
    id: number;
    assets: {
        url: string;
        id: number;
        node_id: string;
        name: string;
        label: string;
        browser_download_url: string;
        download_count: number;
    }[];
};