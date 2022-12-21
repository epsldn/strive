import { Link, useHistory } from "react-router-dom";
import styles from "../../stylesheets/LandingPageNavBar.module.css";

function LandingPageNavBar() {
    const history = useHistory();
    return (
        <div className={styles.mainContainer}>
            <nav className={styles.navBarContent}>
                <p style={{ userSelect: "none" }}>
                    STRIVE
                </p>
                <div id={styles.buttonContainer}>
                    <button onClick={_ => history.push("/login")}>Log In</button>
                    <button onClick={_ => history.push("/join")}>Join for Free</button>
                </div>
            </nav >
        </div >
    );
}

export default LandingPageNavBar;