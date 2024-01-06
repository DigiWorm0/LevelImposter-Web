import { Helmet } from "react-helmet";

export default function LIHelmet(props: { title?: string, description?: string, URL?: string, imageURL?: string }) {
    return (
        <Helmet>
            <title>{props.title || 'LevelImposter'}</title>
            <meta property='og:title' content={props.title || 'LevelImposter'} />
            <meta
                property='og:description'
                content={props.description || 'LevelImposter is a free, open-source, and easy to use level editor for the game Among Us.'}
            />
            <meta property='og:image' content={props.imageURL || '/DefaultThumbnail.png'} />
            <meta property='og:image:width' content='412' />
            <meta property='og:image:height' content='144' />
            <meta property='og:image:alt' content={props.title || 'LevelImposter'} />
            <meta property='og:url' content={props.URL || 'https://LevelImposter.net'} />
        </Helmet>
    )
}