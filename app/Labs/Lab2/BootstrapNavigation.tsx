import './index.css';
import { Nav, NavItem, NavLink, Card, CardImg, CardBody, CardText, CardTitle, Button } from 'react-bootstrap';
export default function BootstrapNavigation() {
    return (
        <div>
            <div id="wd-css-navigating-with-tabs">
                <h2>Tabs</h2>
                <Nav variant="tabs">
                    <NavItem>
                        <NavLink href="/Labs/Lab1">Lab 1</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/Labs/Lab2">Lab 2</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/">Kambaz</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="https://github.com/Shellsss29/kambaz-next-js">Git Repository</NavLink>
                    </NavItem>
                </Nav>
            </div>
            <div id="wd-css-navigating-with-cards">
                <h2> Cards </h2>
                <Card style={{ width: "18rem" }}>
                    <CardImg variant="top" src="/images/stacked.jpg" />
                    <CardBody>
                        <CardTitle>Stacking Starship</CardTitle>
                        <CardText>
                            Stacking the most powerful rocket in history. Mars or bust!
                        </CardText>
                        <Button variant="primary">Boldly Go</Button>
                    </CardBody>
                </Card>
            </div>
        </div>


    );
}

