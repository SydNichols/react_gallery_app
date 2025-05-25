import { NavLink, useNavigate } from "react-router-dom";

//use main-nav div in HTML to create Nav component

const Nav = ({fetchData}) => {
    const navigate = useNavigate();

    const handleNavClick = (topic, path) => {
        fetchData(topic);
        navigate(path);
    };

    return (
        <nav className="main-nav">
            <ul>
                <li><NavLink to="/cats" onClick={() => handleNavClick('cats', '/cats')}>Cats</NavLink></li>
                <li><NavLink to="/dogs" onClick={() => handleNavClick('dogs', '/dogs')}>Dogs</NavLink></li>
                <li><NavLink to="/birds" onClick={() => handleNavClick('birds', '/birds')}>Birds</NavLink></li>
            </ul>
        </nav>
    );
};

export default Nav;