import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { deleteActivity } from "../../store/activities";
import MainNavBar from "../MainNavBar";
import defaultProfile from "../../assets/defaultProfile.png";
import styles from "../../stylesheets/ActivityShowCase.module.css";

function ActivityShowCase() {
    const { activityId } = useParams();
    const user = useSelector(state => state.session.user);
    let activities = useSelector(state => state.activities);
    const [isLoaded, setIsloaded] = useState(false);
    const activity = activities[activityId];
    const dispatch = useDispatch();
    const history = useHistory();
    document.title = `${activity? activity.title: "Activity"} | Strive`;

    function handleDeleteActivity(event) {
        event.stopPropagation();
        event.preventDefault();
        const deleted = dispatch(deleteActivity(activityId));

        if (deleted.error) {
            console.log(deleted);
        } else {
            history.push("/");
        }
    }

    function formatTime(time) {
        if (!time) return "00";

        time = time.toString();

        if (time.length === 1) {
            return "0" + time;
        }

        return time;
    }

    function handleEdit(event) {
        history.push(`/activities/${activityId}/edit`);
    }

    if (isLoaded && !activity) {
        history.push("/");
        return null;
    }

    let date;
    let pace;

    if (activity) {
        date = new Date(activity.date + " " + activity.time);

        const totalSeconds = (Number(activity.hours) * 3600) + Number(activity.minutes * 60) + Number(activity.seconds);
        const dividedSeconds = totalSeconds / Number(activity.distance);
        let hours = Math.floor(dividedSeconds / 3600);
        let minutes = Math.floor((dividedSeconds % 3600) / 60);
        let seconds = Math.floor(dividedSeconds) % 60;
        if (hours < 10) hours = "0" + hours;
        if (minutes < 10) minutes = "0" + minutes;
        if (seconds < 10) seconds = "0" + seconds;

        pace = Number(hours) !== 0 ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
    }

    return (
        <div className={styles.pageOuterContainer}>
            <MainNavBar setIsloaded={setIsloaded} />
            <div className={styles.activitiesContainer}>
                {
                    user?.id === activity?.user_id &&
                    <div className={styles.iconsContainer} onClick={handleEdit}>
                        <div className={styles.iconContainer}>
                            <i className="fa-solid fa-pencil" />
                        </div>
                        <div className={styles.iconContainer} onClick={handleDeleteActivity}>
                            <i className="fa-regular fa-trash-can" />
                        </div>
                    </div>
                }

                <div className={styles.activityInfo}>
                    <div className={styles.activityHeader}>
                        <h1><span id={styles.userName}><Link to={`/athletes/${activity?.user_id}`}>{`${activity?.user.firstName.slice(0, 1).toUpperCase() + activity?.user.firstName.slice(1).toLocaleLowerCase()} ${activity?.user.lastName.slice(0, 1).toUpperCase() + activity?.user.lastName.slice(1).toLocaleLowerCase()}`}</Link></span> - {activity?.sport}</h1>
                    </div>
                    <div className={styles.activityBody}>
                        <div className={styles.activityBodyLeft}>
                            <div id={styles.activityMainContent}>
                                <div id={styles.activityProfilePicture}>
                                    <img src={activity?.user.profilePicture || defaultProfile} alt="Profile" />
                                </div>
                                <div id={styles.activityMainContentInfo}>
                                    <p id={styles.time}>{date?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} on {date?.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</p>
                                    <p id={styles.title}>{activity?.title}</p>
                                    {activity?.description ?
                                        <p>{activity.description} </p> :
                                        <button onClick={handleEdit} className={styles.missingAttribute}>Add a description</button>}
                                </div>
                            </div>
                            {activity?.user_id === user?.id &&
                                <div id={styles.privateNotes}>
                                    {activity?.private_notes ?
                                        <>
                                            <p id={styles.privateNotesTitle}>Private Notes</p>
                                            <p>{activity.private_notes} </p>
                                        </> :
                                        <button onClick={handleEdit} className={styles.missingAttribute}>Add private notes</button>}
                                </div>}
                        </div>
                        <div className={styles.activityBodyRight}>
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
        </div >
    );
}

export default ActivityShowCase;