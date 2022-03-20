import { Link } from "react-router-dom";

export default function Notfoundpage() {
    return (
        <div>
            <p>This page not found :(</p>
            <p>You can find something usefull <Link to='/'>here</Link></p>
        </div>
    );
}