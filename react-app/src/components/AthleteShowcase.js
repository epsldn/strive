import styles from "../stylesheets/AthleteShowcase.module.css";
import MainNavBar from "./MainNavBar";

function AthleteShowcase() {
    return (
        <div className={styles.outerContainer}>
            <MainNavBar />
            <div className={styles.mainContent}>
                
            </div>
        </div>
    );
}

export default AthleteShowcase;