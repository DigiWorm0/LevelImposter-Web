import { Container } from "react-bootstrap";
import { Book, Github, Pencil } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import HomeFeatureListItem from "./HomeFeatureListItem";

export default function HomeFeatureList() {
    return (
        <Container
            fluid
            className={"pt-5 pb-5"}
            style={{
                backgroundColor: "rgb(15, 17, 19)"
            }}
        >
            <HomeFeatureListItem
                icon={<Book size={128} />}
                title={"Workshop"}
                description={
                    "Our library of maps is growing every day. " +
                    "You can download maps directly from the game, or browse the library on our website. " +
                    "You can also create your own maps using our editor and share them with the community."
                }
                button={
                    <Link to="/maps" className="btn btn-primary">
                        Browse Maps
                    </Link>
                }
            />
            <HomeFeatureListItem
                icon={<Pencil size={128} />}
                title={"Online Editor"}
                description={
                    "All tasks, sabotages, and utilities can be configured directly in the editor. " +
                    "Maps are exported as a single file that can be launched directly from the mod. "
                }
                button={
                    <a href="https://editor.levelimposter.net/" className="btn btn-danger">
                        Launch Editor
                    </a>
                }
            />
            <HomeFeatureListItem
                icon={<Github size={128} />}
                title={"Open Source"}
                description={
                    "Everything you see is open source under GNU GPL v3. " +
                    "You can contribute to any of our projects on GitHub to create your own custom features."
                }
                button={
                    <a href="https://github.com/DigiWorm0/LevelImposter" className="btn btn-primary">
                        View on GitHub
                    </a>
                }
            />
        </Container>
    )
}