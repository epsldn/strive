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
function ActivityCard({ activity }) {
    const date = new Date(activity.date + " " + activity.time);

    return (
        <div id={styles.activityContainer}>
            <div id={styles.activityInformation}>
                <div className={styles.activityInformationLeft}>
                </div>
                <div className={styles.activityInformationRight}>
                    <p>{activity.user.firstName} {activity.user.lastName}</p>
                    <p>{formatDate(date)} at {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
            </div>
            <div id={styles.activityInformation}>
                <div className={styles.activityInformationLeft}>

                </div>
                <div className={styles.activityInformationRight}>
                    {activity.title}
                </div>
            </div>
        </div>
    );
}

export default ActivityCard;