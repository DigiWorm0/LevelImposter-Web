import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BetaHeader from '../components/home/BetaHeader';
import LIHelment from '../components/LIHelmet';
import MainHeader from '../components/MainHeader';

export default function Policy() {
    return (
        <>
            <LIHelment
                title="LevelImposter - API Policy"
                description='The LevelImposter API is a free service provided by LevelImposter. It is intended to be used by the community to create tools and services for the game Among Us. The API is provided "as is" and without warranty of any kind. LevelImposter reserves the right to change the API at any time without notice.'
                URL='https://LevelImposter.net/#/Policy'
            />
            <MainHeader />
            <BetaHeader />
            <Container className="Maps">
                <Row>
                    <Col style={{ padding: 30 }}>
                        <h1>Map Policy</h1>
                        <p>
                            In order to abide by local laws and regulations as well as  InnerSloth's <a href="https://www.innersloth.com/among-us-mod-policy/" target={"_blank"} rel="noreferrer">Among Us Mod Policy</a>,
                            you must agree upon a few rules before uploading a map to the LevelImposter API...
                        </p>

                        <ol>
                            <li style={{ margin: 5 }}>
                                Maps cannot display anything that is offensive, grotesque, racist, sexist, vulgar, disparaging, or defamatory in any way.
                            </li>
                            <li style={{ margin: 5 }}>
                                Maps cannot add additional advertisements or monetization features.
                            </li>
                            <li style={{ margin: 5 }}>
                                Maps cannot state or suggest that your mod is official, licensed, or otherwise authorized by Innersloth.
                            </li>
                            <li style={{ margin: 5 }}>
                                Maps cannot be in a broken or unusable state at time of publish.
                            </li>
                            <li style={{ margin: 5 }}>
                                You cannot hack, flood, dos, or break the LevelImposter API in any way.
                            </li>
                            <li style={{ margin: 5 }}>
                                You cannot redistribute maps or copyrighted materials that is not explicitly owned or licensed by you or InnerSloth.
                            </li>
                        </ol>

                        <p>
                            Both LevelImposter and InnerSloth reserve the right to modify or delete your map or account at any time for any reason.
                            <br /><br />
                            By utilizing the LevelImposter API, you are agreeing to abide by these rules and to be bound by the terms of the Among Us Mod Policy.
                            <br /><br />
                            A copy of these rules can be found at <Link to="/policy" target={'_blank'} rel="noreferrer">LevelImposter.net/#/Policy</Link>
                        </p>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
