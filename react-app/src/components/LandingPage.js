import NavBar from "./NavBar";
import { useHistory } from "react-router-dom";
import banner from "../assets/landing-banner.png";
import heroBiking from "../assets/hero-biking.webp";
import heroRunning from "../assets/hero-running.webp";
import phone1 from "../assets/landing-page-phone1.webp";
import runningShoe from "../assets/running-shoe.svg";
import styles from "../stylesheets/LandingPage.module.css";
function LandingPage() {
    const history = useHistory();
    return (
        <div className={styles.landingPageContainer}>
            <NavBar />
            <div className={styles.landingPageContent}>
                <div className={styles.landingPageMain}>
                    <div className={styles.landingPageMainContent}>
                        <h2 id={styles.title1}>
                            <span style={{ color: "#fc5200" }}>Strive.</span> Share.
                            Celebrate
                        </h2>
                        <p style={{ fontSize: "1.7rem" }}>
                            People on Strava upload everything from weekend hikes to marathons. The only rule is to cheer each other on.
                        </p>
                        <div id={styles.landingPageButtons}>
                            <button onClick={_ => history.push("/join")}>
                                Join for free
                            </button>
                            <button onClick={_ => history.push("/login")}>
                                Log in
                            </button>
                        </div>
                    </div>
                    <div className={styles.landingPageMainImage}>
                        <img src={heroRunning} alt="Hero running" />
                        <div id={styles.runningPhone} >
                            <img src={phone1} alt="Phone with post" />
                        </div>
                    </div>
                </div>
                <div className={styles.landingPageMain}>
                    <img src={banner} alt="Banner" />
                </div>
                <div className={styles.landingPageMain}>
                    <div className={styles.landingPageMainImage}>
                        <img src={heroBiking} alt="Hero Biking" />
                    </div>
                    <div className={styles.landingPageMainContent}>
                        <h2>
                            The home of your active life.
                        </h2>
                        <ul>
                            <li className={styles.iconListItem}>
                                <div className={styles.svgIconContainer}>
                                    <img src={runningShoe} alt="shoe icon" />
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;