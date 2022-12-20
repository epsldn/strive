import styles from "../stylesheets/LandingPage.module.css";
import NavBar from "./NavBar";

function LandingPage() {
    return (
        <div className={styles.landingPageContainer}>
            <NavBar />
            <div className={styles.landingPageContent}>
                <div className={styles.landingPageMain}>
                    <div className={styles.landingPageMainContent}>
                        <h2>
                            <span style={{ color: "#fc5200" }}>Strive.</span> Share.
                            Celebrate
                        </h2>
                        <p>
                            People on Strava upload everything from weekend hikes to marathons. The only rule is to cheer each other on.
                        </p>
                        <div id={styles.landingPageButtons}>
                            <button>
                                Join for free
                            </button>
                            <button>
                                Log in
                            </button>
                        </div>
                    </div>
                    <div className={styles.landingPageMainContent}>

                    </div>
                </div>
                <div className={styles.landingPageMain}>
                    <div className={styles.landingPageMainContent}>

                    </div>
                    <div className={styles.landingPageMainContent}>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;