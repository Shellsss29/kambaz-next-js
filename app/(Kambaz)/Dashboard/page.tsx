import Link from "next/link";
import Image from "next/image";

export default function Dashboard() {
    return (
        <div id="wd-dashboard">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        <hr />
        <h2 id="wd-dashboard-published">Published Courses (10)</h2>
        <hr />
        <div id="wd-dashboard-courses">
            <div className="wd-dashboard-course">
            <Link href="/Courses/1234" className="wd-dashboard-course-link">
                <Image
                src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                width={200}
                height={150}
                alt="React logo"
                />
                <div>
                <h5>CS1234 React JS</h5>
                <p className="wd-dashboard-course-title">Full Stack Software Developer</p>
                <button>Go</button>
                </div>
            </Link>
            </div>

            <div className="wd-dashboard-course">
            <Link href="/Courses/2345" className="wd-dashboard-course-link">
                <Image
                src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg"
                width={200}
                height={150}
                alt="Node.js logo"
                />
                <div>
                <h5>CS2345 Node.js</h5>
                <p className="wd-dashboard-course-title">Backend Development with Node</p>
                <button>Go</button>
                </div>
            </Link>
            </div>

            <div className="wd-dashboard-course">
            <Link href="/Courses/3456" className="wd-dashboard-course-link">
                <Image
                src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg"
                width={200}
                height={150}
                alt="Python logo"
                />
                <div>
                <h5>CS3456 Python</h5>
                <p className="wd-dashboard-course-title">Programming with Python</p>
                <button>Go</button>
                </div>
            </Link>
            </div>

            <div className="wd-dashboard-course">
            <Link href="/Courses/4567" className="wd-dashboard-course-link">
                <Image
                src="https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg"
                width={200}
                height={150}
                alt="Java (Duke mascot)"
                />
                <div>
                <h5>CS4567 Java</h5>
                <p className="wd-dashboard-course-title">Object-Oriented Programming</p>
                <button>Go</button>
                </div>
            </Link>
            </div>

            <div className="wd-dashboard-course">
            <Link href="/Courses/5678" className="wd-dashboard-course-link">
                <Image
                src="https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg"
                width={200}
                height={150}
                alt="C++ logo"
                />
                <div>
                <h5>CS5678 C++</h5>
                <p className="wd-dashboard-course-title">Data Structures & Algorithms</p>
                <button>Go</button>
                </div>
            </Link>
            </div>

            <div className="wd-dashboard-course">
            <Link href="/Courses/6789" className="wd-dashboard-course-link">
                <Image
                src="https://upload.wikimedia.org/wikipedia/commons/8/86/Database-icon.svg"
                width={200}
                height={150}
                alt="Database icon"
                />
                <div>
                <h5>CS6789 Databases</h5>
                <p className="wd-dashboard-course-title">SQL & Database Management</p>
                <button>Go</button>
                </div>
            </Link>
            </div>

            <div className="wd-dashboard-course">
            <Link href="/Courses/7890" className="wd-dashboard-course-link">
                <Image
                src="https://upload.wikimedia.org/wikipedia/commons/1/1b/AI_hierarchy.svg"
                width={200}
                height={150}
                alt="AI / ML diagram"
                />
                <div>
                <h5>CS7890 Machine Learning</h5>
                <p className="wd-dashboard-course-title">Intro to AI & ML</p>
                <button>Go</button>
                </div>
            </Link>
            </div>

            <div className="wd-dashboard-course">
            <Link href="/Courses/8901" className="wd-dashboard-course-link">
                <Image
                src="/images/lock.png"
                width={200}
                height={150}
                alt="Padlock security icon"
                />
                <div>
                <h5>CS8901 Cybersecurity</h5>
                <p className="wd-dashboard-course-title">Security Fundamentals</p>
                <button>Go</button>
                </div>
            </Link>
            </div>

            <div className="wd-dashboard-course">
            <Link href="/Courses/9012" className="wd-dashboard-course-link">
                <Image
                src="https://upload.wikimedia.org/wikipedia/commons/b/b5/Cloud_computing.svg"
                width={200}
                height={150}
                alt="Cloud computing icon"
                />
                <div>
                <h5>CS9012 Cloud Computing</h5>
                <p className="wd-dashboard-course-title">AWS, Azure & GCP</p>
                <button>Go</button>
                </div>
            </Link>
            </div>

            <div className="wd-dashboard-course">
            <Link href="/Courses/0123" className="wd-dashboard-course-link">
                <Image
                src="https://upload.wikimedia.org/wikipedia/commons/0/05/Devops-toolchain.svg"
                width={200}
                height={150}
                alt="DevOps toolchain"
                />
                <div>
                <h5>CS0123 DevOps</h5>
                <p className="wd-dashboard-course-title">CI/CD & Automation</p>
                <button>Go</button>
                </div>
            </Link>
            </div>
        </div>
        </div>
    );
}
