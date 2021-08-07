import { PersonCheck, PersonPlus } from "react-bootstrap-icons";

const MenuSign = () => {
    return (
        <nav>
            <div className="signIconText">
                <PersonCheck></PersonCheck><p> SIGN-IN</p>
            </div>
            <div className="signIconText">
                <PersonPlus></PersonPlus><p> SIGN-UP</p>
            </div>
        </nav >
    )
};

export default MenuSign;