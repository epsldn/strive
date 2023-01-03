import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import MainNavBar from "../MainNavBar";
import styles from "../../stylesheets/EditActivity.module.css";
function EditActivity() {
    const { activityId } = useParams();
    const activity = useSelector(state => state.activities[activityId]);
    const user = useSelector(state => state.session.user);
    const history = useHistory();
    function onSubmit(event) {
        event.preventDefault();
        console.log("submitting...");
    }


    let date;

    if (activity) {
        if (activity.user_id !== user.id) {
            history.push(`/activities/${activityId}`);
            return null;
        }
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
                        <p className={styles.activityInfoContentRight}>{activity?.elevation} ft</p>
                    </div>
                    {activity?.distance && <div className={styles.activityInfoContent}>
                        <p className={styles.activityInfoContentLeft}>Distance</p>
                        <p className={styles.activityInfoContentRight}>{activity.distance} mi</p>
                    </div>}
                </div>
            </div>
        </div >
    );
}

export default EditActivity;