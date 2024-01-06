import HomeDownloadHeader from '../components/home/HomeDownloadHeader';
import LIHelmet from '../components/common/LIHelmet';
import MainFooter from '../components/common/MainFooter';
import MainHeader from '../components/common/MainHeader';
import HomeWorkshopBanner from "../components/home/HomeWorkshopBanner";
import HomeFeatureList from "../components/home/HomeFeatureList";
import HomeDiscordBanner from "../components/home/HomeDiscordBanner";

export default function Home() {

    return (
        <>
            <LIHelmet />
            <MainHeader>
                <HomeDownloadHeader />
            </MainHeader>
            <HomeWorkshopBanner />
            <HomeFeatureList />
            <HomeDiscordBanner />
            <MainFooter />
        </>
    );
}
