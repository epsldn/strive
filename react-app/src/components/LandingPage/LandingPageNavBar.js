import styles from "../../stylesheets/LandingPageNavBar.module.css";

function LandingPageNavBar() {
    return (
        <div className={styles.mainContainer}>
            <nav className={styles.navBarContent}>
                <p>STRIVE</p>
                <div id={styles.buttonContainer}>
                    <button>Log In</button>
                    <button>Joing for Free</button>
                </div>
            </nav>
        </div>
    );
}

export default LandingPageNavBar;