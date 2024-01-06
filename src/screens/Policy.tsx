import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LIHelmet from '../components/common/LIHelmet';
import MainHeader from '../components/common/MainHeader';

export default function Policy() {
    return (
        <>
            <LIHelmet
                title="LevelImposter - API Policy"
                description='The LevelImposter API is a free service provided by LevelImposter. It is intended to be used by the community to create tools and services for the game Among Us. The API is provided "as is" and without warranty of any kind. LevelImposter reserves the right to change the API at any time without notice.'
                URL='https://LevelImposter.net/#/Policy'
            />
            <MainHeader />
            <Container className="Maps">
                <Row>
                    <Col style={{ padding: 30 }}>
                        <p className={"text-muted"}>
                            By using LevelImposter, you agree to abide by the following rules and policies. A copy of
                            these policies can be found at any time at
                            {' '}
                            <Link to={"/policy"}>https://LevelImposter.net/#/policy</Link>
                        </p>
                        <h1>Privacy Policy</h1>
                        <p>
                            <a
                                href={"https://levelimposter.net"}
                                target={"_blank"}
                                rel="noreferrer"
                            >
                                LevelImposter.net
                            </a>
                            {' '}
                            (and its subdomains) utilizes cookies to analyze traffic and remember your
                            preferences. The only information we collect is information explicitly provided. This may
                            include usernames, profile images, email addresses, and any files uploaded to the
                            LevelImposter workshop. We do not sell your data or serve any form of targeted
                            advertisements.
                        </p>
                        <p>
                            Your information may be assessed by 3rd-party tools and services such as
                            {' '}
                            <a href={"https://firebase.google.com/"} target={"_blank"} rel="noreferrer">Firebase</a>,
                            {' '}
                            <a href={"https://algolia.com/"} target={"_blank"} rel="noreferrer">Algolia</a>,
                            {' '}
                            <a href={"https://cloudflare.com/"} target={"_blank"} rel="noreferrer">Cloudflare</a>, and
                            {' '}
                            <a href={"https://pages.github.com/"} target={"_blank"} rel="noreferrer">GitHub Pages</a>
                            {' '}
                            to help improve user experience.
                        </p>
                        <p>
                            If you want to request your information or exert your right to be forgotten, you can contact
                            us at
                            {' '}
                            <a href={"mailto:support@levelimposter.net"}>support@levelimposter.net</a>.
                        </p>
                        <p>
                            We reserve the right to modify our policies, with or without notice, at any point in time.
                            If you have any questions, feel free to contact us at
                            {' '}
                            <a href={"mailto:support@levelimposter.net"}>support@levelimposter.net</a>.
                        </p>

                        <h1>Workshop Policy</h1>
                        <p>
                            In order to abide by local laws and regulations as well as InnerSloth's
                            {' '}
                            <a
                                href="https://www.innersloth.com/among-us-mod-policy/"
                                target={"_blank"}
                                rel="noreferrer"
                            >
                                Among Us Mod Policy
                            </a>
                            , you must agree upon a few rules before uploading files to the LevelImposter workshop...
                        </p>

                        <ol>
                            <li>
                                Maps cannot display anything that is offensive, grotesque, racist, sexist, vulgar,
                                disparaging, or defamatory in any way.
                            </li>
                            <li>
                                Maps cannot add additional advertisements or monetization features.
                            </li>
                            <li>
                                Maps cannot state or suggest that your mod is official, licensed, or otherwise
                                authorized by Innersloth.
                            </li>
                            <li>
                                Maps cannot be in a broken or unusable state at time of publish.
                            </li>
                            <li>
                                You cannot hack, flood, dos, or break the LevelImposter API in any way.
                            </li>
                            <li>
                                You cannot redistribute maps or copyrighted materials that is not explicitly owned or
                                licensed by you or InnerSloth.
                            </li>
                            <li>
                                Both LevelImposter and InnerSloth reserve the right to modify or delete your map or
                                account at any time for any reason.
                            </li>
                        </ol>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
