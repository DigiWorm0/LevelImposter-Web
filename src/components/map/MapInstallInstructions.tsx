import { Card } from "react-bootstrap";
import React from "react";

export interface MapInstallInstructionsProps {
    mapName: string;
}

export default function MapInstallInstructions(props: MapInstallInstructionsProps) {
    return (
        <>
            <Card className={"bg-dark text-white mt-2"}>
                <Card.Header>
                    How to Install
                </Card.Header>
                <Card.Body>
                    <ol>
                        <li>
                            Download and install the <a
                            href="https://github.com/DigiWorm0/LevelImposter/releases">LevelImposter
                            Mod</a> <i>(If you haven't already)</i>
                        </li>
                        <li>
                            Download the map file above
                        </li>
                        <li>
                            Open Among Us
                        </li>
                        <li>
                            Go to <code>Maps {'>>>'} Folder Icon</code>
                        </li>
                        <li>
                            Save the map file in the folder. <i>(Don't rename it)</i>
                        </li>
                        <li>
                            Go back to Among Us and re-open the Maps menu
                        </li>
                    </ol>
                </Card.Body>
            </Card>
            <Card className={"bg-dark text-white mt-2"}>
                <Card.Header>
                    How to Play
                </Card.Header>
                <Card.Body>
                    <p>Freeplay</p>
                    <ol>
                        <li>
                            Open Among Us
                        </li>
                        <li>
                            Go to <code>Maps {'>>>'} {props.mapName}</code>
                        </li>
                        <li>
                            Select the map's play button
                        </li>
                    </ol>
                    <p>Multiplayer</p>
                    <ol>
                        <li>
                            Start an Among Us lobby under any map
                        </li>
                        <li>
                            Open the blue box below the computer
                        </li>
                        <li>
                            Select the map from the maps menu
                        </li>
                    </ol>
                    <p>
                        All players must have the LevelImposter mod installed to play the map.
                        The map will automatically download & sync to all lobby members.
                    </p>
                </Card.Body>
            </Card>
        </>
    )
}