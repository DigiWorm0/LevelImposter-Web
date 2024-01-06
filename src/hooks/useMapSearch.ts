import React from "react";
import { MaybeLIMetadata } from "../types/LIMetadata";
import algoliasearch from "algoliasearch";
import getMaps from "./utils/getMaps";
import AlgoliaIndex from "../types/AlgoliaIndex";
import LIMapList from "../types/LIMapList";

// Algolia API
const ALGOLIA_API_KEY = "14062d24b40e0b3689a899fc36abd756";
const ALGOLIA_APP_ID = "T5IVXJGKB9";
const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
const index = client.initIndex("LevelImposter-Maps");

// Constants
const MAX_MAPS = 15;
const SEARCH_DELAY = 400;

let lastQuery = "";

export default function useMapSearch(query?: string): LIMapList {
    const [error, setError] = React.useState<any>(undefined);
    const [maps, setMaps] = React.useState<MaybeLIMetadata[]>([]);


    // Search Function
    const search = React.useCallback(async () => {
        if (!query)
            return;

        // Search Algolia
        lastQuery = query;
        index.search<AlgoliaIndex>(query).then(({ hits }) => {
            if (lastQuery !== query)
                return;

            // Get Maps From IDs
            const mapIDs = hits.map(({ objectID }) => objectID);
            mapIDs.splice(MAX_MAPS);
            return getMaps(mapIDs);
        }).then(maps => {
            if (lastQuery !== query || !maps)
                return;

            // Set Maps
            setError(undefined);
            setMaps(maps);
        }).catch((err: any) => {
            console.error(err);
            setError(err);
            setMaps([]);
        });
    }, [query]);

    // Search On Query Change
    React.useEffect(() => {
        // Add filler
        setError(undefined);
        setMaps(Array(MAX_MAPS).fill(undefined));

        // Check Query
        if (!query || query === "")
            return;

        // Wait to minimize API calls
        const timeout = setTimeout(search, SEARCH_DELAY);
        return () => clearTimeout(timeout);
    }, [query]);

    return {
        maps,
        error: error,
        loadMore: () => {
        },
        hasMore: false
    };
}