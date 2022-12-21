import { Link, useHistory, useLocation } from "react-router-dom";
import styles from "../../stylesheets/AuthNavBar.module.css";
function AuthNavBar() {
    const history = useHistory();
    const location = useLocation();
    const atLogin = location.pathname === "/login";
    return (
        <div className={styles.navBarContainer}>
            <div className={styles.navBarContent}>
                <Link to="/welcome" style={{ userSelect: "none" }}>
                    <p>
                        STRIVE
                    </p>
                </Link>
                <div className={styles.navBarButtonContainer}>
                    {atLogin ?
                        <button id={styles.signUp} className={styles.navBarButton} onClick={_ => history.push("/join")}>
                            Sign Up
                        </button>
                        :
                        <button id={styles.login} className={styles.navBarButton} onClick={_ => history.push("/login")}>
                            Log in
                        </button>
                    }
                </div>
            </div>
        </div>
    );
}

export default AuthNavBar;