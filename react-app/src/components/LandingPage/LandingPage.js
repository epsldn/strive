import NavBar from "../NavBar";
import { useHistory } from "react-router-dom";
import banner from "../../assets/landing-banner.png";
import heroBiking from "../../assets/hero-biking.webp";
import heroRunning from "../../assets/hero-running.webp";
import phone1 from "../../assets/landing-page-phone1.webp";
import watch from "../../assets/landing-page-watch.webp";
import phone2 from "../../assets/landing-page-phone2.webp";
import runningShoe from "../../assets/running-shoe.svg";
import recordIcon from "../../assets/record-icon.svg";
import watchIcon from "../../assets/watch-icon.svg";
import styles from "../../stylesheets/LandingPage.module.css";
import LandingPageNavBar from "./LandingPageNavBar";

function LandingPage() {
    const history = useHistory();
    return (
        <div className={styles.landingPageContainer}>
            <LandingPageNavBar/>
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
                    <div className={styles.landingPageBanner}>
                        <img src={banner} alt="Banner" />
                    </div>
                    <div style={{ marginBottom: "14rem" }} className={styles.landingPageMain}>
                        <div className={styles.landingPageMainImage} id={styles.image2}>
                            <img id={styles.bikingImage} src={heroBiking} alt="Hero Biking" />
                            <div id={styles.watch}>
                                <img src={watch} alt="Apple watch" />
                            </div>
                            <div id={styles.phone2}>
                                <img src={phone2} alt="Phone with map" />
                            </div>
                        </div>
                        <div className={styles.landingPageMainContent} id={styles.activeLife}>
                            <h2 style={{ fontSize: "4.8rem", lineHeight: "5.5rem;", marginBottom: "2rem" }}>
                                The home of your active life.
                            </h2>
                            <ul className={styles.iconList}>
                                <li className={styles.iconListItem}>
                                    <div className={styles.iconOuterContainer}>
                                        <div className={styles.svgIconContainer}>
                                            <img src={runningShoe} alt="shoe icon" />
                                        </div>
                                    </div>
                                    <div className={styles.listText}>
                                        <p>
                                            2+ sport types and counting
                                        </p>
                                        <p>
                                            From bike rides to golf swings – you can log every adventure and all your training on Strive.
                                        </p>
                                    </div>
                                </li>
                                <li className={styles.iconListItem}>
                                    <div className={styles.iconOuterContainer}>
                                        <div className={styles.svgIconContainer}>
                                            <img src={recordIcon} alt="record icon" />
                                        </div>
                                    </div>
                                    <div className={styles.listText}>
                                        <p>
                                            All you need is a desktop
                                        </p>
                                        <p>
                                            Strava turns your desktop into an activity tracker. Just sit down to type everything and go.
                                        </p>
                                    </div>
                                </li>
                                <li className={styles.iconListItem}>
                                    <div className={styles.iconOuterContainer}>
                                        <div className={styles.svgIconContainer}>
                                            <img src={watchIcon} alt="Watch icon" />
                                        </div>
                                    </div>
                                    <div className={styles.listText}>
                                        <p>
                                            Got a device? Connect it to Strive
                                        </p>
                                        <p>
                                            You can also connect anything with a browser – Strava is compatible with most browsers!.
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
        </div >
    );
};

export default LandingPage;