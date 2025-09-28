// app/(Kambaz)/Dashboard/page.tsx
"use client";

import Link from "next/link";
import {
    Row,
    Col,
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardText,
    Button,
} from "react-bootstrap";

export default function Dashboard() {
    return (
        <div id="wd-dashboard" className="p-3">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr />
            <h2 id="wd-dashboard-published">Published Courses (10)</h2>
            <hr />

            <div id="wd-dashboard-courses">
                {/* Responsive grid: 1 card on xs, 2 on sm, 3 on md, 4 on lg+ */}
                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                    <Col>
                        <Card>
                            <Link href="/Courses/1234" className="text-decoration-none text-dark">
                                <CardImg
                                    variant="top"
                                    src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                                    height={160}
                                />
                                <CardBody>
                                    <CardTitle>CS1234 React JS</CardTitle>
                                    <CardText>Full Stack Software Developer</CardText>
                                    <Button variant="primary">Go</Button>
                                </CardBody>
                            </Link>
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                            <Link href="/Courses/2345" className="text-decoration-none text-dark">
                                <CardImg
                                    variant="top"
                                    src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg"
                                    height={160}
                                />
                                <CardBody>
                                    <CardTitle>CS2345 Node.js</CardTitle>
                                    <CardText>Backend Development with Node</CardText>
                                    <Button variant="primary">Go</Button>
                                </CardBody>
                            </Link>
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                            <Link href="/Courses/3456" className="text-decoration-none text-dark">
                                <CardImg
                                    variant="top"
                                    src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg"
                                    height={160}
                                />
                                <CardBody>
                                    <CardTitle>CS3456 Python</CardTitle>
                                    <CardText>Programming with Python</CardText>
                                    <Button variant="primary">Go</Button>
                                </CardBody>
                            </Link>
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                            <Link href="/Courses/4567" className="text-decoration-none text-dark">
                                <CardImg
                                    variant="top"
                                    src="https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg"
                                    height={160}
                                />
                                <CardBody>
                                    <CardTitle>CS4567 Java</CardTitle>
                                    <CardText>Object-Oriented Programming</CardText>
                                    <Button variant="primary">Go</Button>
                                </CardBody>
                            </Link>
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                            <Link href="/Courses/5678" className="text-decoration-none text-dark">
                                <CardImg
                                    variant="top"
                                    src="https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg"
                                    height={160}
                                />
                                <CardBody>
                                    <CardTitle>CS5678 C++</CardTitle>
                                    <CardText>Data Structures & Algorithms</CardText>
                                    <Button variant="primary">Go</Button>
                                </CardBody>
                            </Link>
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                            <Link href="/Courses/6789" className="text-decoration-none text-dark">
                                <CardImg
                                    variant="top"
                                    src="https://upload.wikimedia.org/wikipedia/commons/8/86/Database-icon.svg"
                                    height={160}
                                />
                                <CardBody>
                                    <CardTitle>CS6789 Databases</CardTitle>
                                    <CardText>SQL & Database Management</CardText>
                                    <Button variant="primary">Go</Button>
                                </CardBody>
                            </Link>
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                            <Link href="/Courses/7890" className="text-decoration-none text-dark">
                                <CardImg
                                    variant="top"
                                    src="https://upload.wikimedia.org/wikipedia/commons/1/1b/AI_hierarchy.svg"
                                    height={160}
                                />
                                <CardBody>
                                    <CardTitle>CS7890 Machine Learning</CardTitle>
                                    <CardText>Intro to AI & ML</CardText>
                                    <Button variant="primary">Go</Button>
                                </CardBody>
                            </Link>
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                            <Link href="/Courses/8901" className="text-decoration-none text-dark">
                                <CardImg variant="top" src="/images/lock.png" height={160} />
                                <CardBody>
                                    <CardTitle>CS8901 Cybersecurity</CardTitle>
                                    <CardText>Security Fundamentals</CardText>
                                    <Button variant="primary">Go</Button>
                                </CardBody>
                            </Link>
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                            <Link href="/Courses/9012" className="text-decoration-none text-dark">
                                <CardImg
                                    variant="top"
                                    src="https://upload.wikimedia.org/wikipedia/commons/b/b5/Cloud_computing.svg"
                                    height={160}
                                />
                                <CardBody>
                                    <CardTitle>CS9012 Cloud Computing</CardTitle>
                                    <CardText>AWS, Azure & GCP</CardText>
                                    <Button variant="primary">Go</Button>
                                </CardBody>
                            </Link>
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                            <Link href="/Courses/0123" className="text-decoration-none text-dark">
                                <CardImg
                                    variant="top"
                                    src="https://upload.wikimedia.org/wikipedia/commons/0/05/Devops-toolchain.svg"
                                    height={160}
                                />
                                <CardBody>
                                    <CardTitle>CS0123 DevOps</CardTitle>
                                    <CardText>CI/CD & Automation</CardText>
                                    <Button variant="primary">Go</Button>
                                </CardBody>
                            </Link>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}
