import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MainNavBar from "../MainNavBar";
import styles from "../../stylesheets/EditActivity.module.css";
function EditActivity() {
    const { activityId } = useParams();
    const activity = useSelector(state => state.activities[activityId]);

    function onSubmit(event) {
        event.preventDefault();
        console.log("submitting...");
    }


    let date;

    if (activity) {
        date = new Date(activity.date + " " + activity.time);
    }

    return (
        <div className={styles.outerContainer}>
            <MainNavBar />
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <h1>Edit Activity</h1>
                    <button onClick={onSubmit}>Save</button>
                </div>
            </div>
            <div className={styles.mainContainer}>
                <form id={styles.editActivityForm} onSubmit={onSubmit}>
                    <input
                        style={{ backgroundColor: "red" }}
                        type="text"
                    />
                </form>
                <div id={styles.activityInfo}>
                    <div className={styles.activityInfoContent}>
                        <p className={styles.activityInfoContentLeft}>Date</p>
                        <p className={styles.activityInfoContentRight}>{date?.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })}</p>
                    </div>
                    <div className={styles.activityInfoContent}>
                        <p className={styles.activityInfoContentLeft}>Time</p>
                        <p className={styles.activityInfoContentRight}>{activity?.hours}h {activity?.minutes}m</p>
                    </div>
                    <div className={styles.activityInfoContent}>
                        <p className={styles.activityInfoContentLeft}>Elevation Gain</p>
                        <p className={styles.activityInfoContentRight}>{activity?.elevation}</p>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default EditActivity;