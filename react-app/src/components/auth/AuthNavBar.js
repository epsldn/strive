import { useHistory, useLocation } from "react-router-dom";

function AuthNavBar() {
    const history = useHistory();
    const location = useLocation();
    return (
        <div>
            <p>
                STRIVE
            </p>
            {<button onClick={_ => history.push("/join")}>
                Sign Up
            </button>}
            {
                <button onClick={_ => history.push("/login")}>
                    Log in
                </button>
            }
        </div>
    );
}

export default AuthNavBar;