import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';

export default function HomeHeader() {
    return (
        <Row style={{
            backgroundColor: "rgb(245, 245, 245)",
            height: 400,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            display: "flex",
            flexDirection: "column",
        }}>

            <Col className="text-center" xs={12}>
                <img
                    src="/title-transparent.png"
                    alt="LevelImposter"
                    style={{
                        width: 500,
                        maxWidth: '80%'
                    }} />

                <div style={{ margin: 5 }}>
                    <Button
                        variant="primary"
                        href="https://docs.levelimposter.net/"
                        className={"btn-home"}>
                        Docs
                    </Button>
                    <Button
                        variant="primary"
                        href="https://editor.levelimposter.net/"
                        className={"btn-home"}>
                        Editor
                    </Button>
                    <Button
                        variant="danger"
                        href="https://github.com/DigiWorm0/LevelImposter/releases"
                        className={"btn-home"}>
                        Download
                    </Button>
                    <Button
                        variant="danger"
                        href="/maps/"
                        className={"btn-home"}>
                        Maps
                    </Button>
                </div>
            </Col>
        </Row>
    );
}
