import defaultProfile from "../../assets/defaultProfile.png";
import styles from "../../stylesheets/ActivityCard.module.css";

function formatDate(date) {
    const today = new Date();
    const todayString = today.toDateString();
    const yesterdayString = new Date(today.setDate(today.getDate() - 1)).toDateString();
    const dateString = date.toDateString();

    if (todayString === dateString) return "Today";
    if (yesterdayString === dateString) return "Yesterday";

    return date.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

function formatTime(time) {
    if (!time) return "00";

    time = time.toString();

    if (time.length === 1) {
        return "0" + time;
    }

    return time;
}


function ActivityCard({ activity }) {
    const date = new Date(activity.date + " " + activity.time);
    let pace;
    const totalSeconds = (Number(activity.hours) * 3600) + Number(activity.minutes * 60) + Number(activity.seconds);
    const dividedSeconds = totalSeconds / Number(activity.distance);
    let hours = Math.floor(dividedSeconds / 3600);
    let minutes = Math.floor((dividedSeconds % 3600) / 60);
    let seconds = Math.floor(dividedSeconds) % 60;
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;

    pace = Number(hours) !== 0 ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;

    return (
        <div id={styles.activityContainer}>
            <div id={styles.activityInformation}>
                <div className={styles.activityInformationLeft}>
                    <img src={activity.user.profilePicture || defaultProfile} alt="User Avatar" />
                </div>
                <div className={styles.activityInformationRight}>
                    <p>{activity.user.firstName} {activity.user.lastName}</p>
                    <p>{formatDate(date)} at {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
            </div>
            <div id={styles.activityStatsContainer}>
                <div className={styles.activityInformationLeft}>

                </div>
                <div className={styles.activityInformationRight}>
                    {activity.title}
                    <div className={styles.activityStats}>
                        {Boolean(activity?.distance) && <div className={styles.activityBodyRightContent}>
                            <p>{Number(activity.distance).toFixed(2)} mi</p>
                            <p>Distance</p>
                        </div>}
                        <div className={styles.activityBodyRightContent}>
                            <p>{`${activity?.hours}:${formatTime(activity?.minutes)}:${formatTime(activity?.seconds)}`}</p>
                            <p>Duration</p>
                        </div>
                        {Boolean(activity?.distance) && <div className={styles.activityBodyRightContent}>
                            <p>{pace}/mi</p>
                            <p>Pace</p>
                        </div>}
                        <div className={styles.activityBodyRightContent}>
                            <p>{activity?.elevation} ft</p>
                            <p>Elevation</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ActivityCard;