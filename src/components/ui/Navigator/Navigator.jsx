import { Link } from "react-router-dom";

function Navigator() {
    return (
        <nav>
            <ul>
                <li> <Link to="/deposit">deposit</Link></li>
                <li> <Link to="/redux">redux</Link></li>
                <li> <Link to="/todoapp">TodoApp</Link></li>
            </ul>
        </nav>
    );
}

export default Navigator;