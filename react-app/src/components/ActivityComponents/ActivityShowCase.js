import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "../../stylesheets/ActivityShowCase.module.css";
import MainNavBar from "../MainNavBar";

function ActivityShowCase() {
    const { activityId } = useParams();
    const activity = useSelector(state => state.activites[activityId]);

    return (
        <div className={styles.pageOuterContainer}>
            <MainNavBar />
            <div className={styles.activitiesContainer}>
                "HELLO"
            </div>
        </div>
    );
}

export default ActivityShowCase;