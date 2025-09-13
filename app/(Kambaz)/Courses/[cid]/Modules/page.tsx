export default function Modules() {
    return (
        <div>
        {/* Implement Collapse All button, View Progress button, etc. */}
        <ul id="wd-modules">
            <li className="wd-module">
            <div className="wd-title">Week 1</div>
            <ul className="wd-lessons">
                <li className="wd-lesson">
                <span className="wd-title">LEARNING OBJECTIVES</span>
                <ul className="wd-content">
                    <li className="wd-content-item">Introduction to the course</li>
                    <li className="wd-content-item">Learn what is Web Development</li>
                </ul>
                </li>
            </ul>
            </li>

            <li className="wd-module">
            <div className="wd-title">Week 2</div>
            <ul className="wd-lessons">
                <li className="wd-lesson">
                <span className="wd-title">LEARNING OBJECTIVES</span>
                <ul className="wd-content">
                    <li className="wd-content-item">Understand HTML basics</li>
                    <li className="wd-content-item">Build your first webpage</li>
                </ul>
                </li>
                <li className="wd-lesson">
                <span className="wd-title">READING</span>
                <ul className="wd-content">
                    <li className="wd-content-item">MDN: Introduction to HTML</li>
                    <li className="wd-content-item">W3Schools: HTML Basics</li>
                </ul>
                </li>
            </ul>
            </li>

            <li className="wd-module">
            <div className="wd-title">Week 3</div>
            <ul className="wd-lessons">
                <li className="wd-lesson">
                <span className="wd-title">LEARNING OBJECTIVES</span>
                <ul className="wd-content">
                    <li className="wd-content-item">Learn CSS fundamentals</li>
                    <li className="wd-content-item">Style your webpage</li>
                </ul>
                </li>
                <li className="wd-lesson">
                <span className="wd-title">ASSIGNMENT</span>
                <ul className="wd-content">
                    <li className="wd-content-item">Create a styled homepage with CSS</li>
                </ul>
                </li>
            </ul>
            </li>
        </ul>
        </div>
    );
}
