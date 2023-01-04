import styles from "../../stylesheets/HomePage.module.css";
import MainNavBar from "../MainNavBar";

function setBodyColor() {
    document.body.style = "background: #666666";
    return null;
}

function HomePage() {
    // document.body.style = "background: #666666";
    return (
        <div className={styles.outerContainer}>
            <MainNavBar />
            <div className={styles.mainContent} >
                <div className={styles.mainSides}>

                </div>
                <div className={styles.mainMiddle}>

                </div>
                <div className={styles.mainSides}>

                </div>
            </div>
        </div>
    );
}

export default HomePage;