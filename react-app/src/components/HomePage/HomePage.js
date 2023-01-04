import MainNavBar from "../MainNavBar";
import defaultProfile from "../../assets/defaultProfile.png";
import styles from "../../stylesheets/HomePage.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";

import en from "javascript-time-ago/locale/en.json";
TimeAgo.addDefaultLocale(en);

function HomePage() {
    const user = useSelector(state => state.session.user);

    return (
        <div className={styles.outerContainer}>
            <MainNavBar />
            <div className={styles.mainContent} >
                <div className={styles.mainSides} id={styles.leftSide}>
                    <div id={styles.profileImage}>
                        <img src={"" || defaultProfile} />
                    </div>
                    <div id={styles.profileInformation}>
                        <p id={styles.userName}>{"First"}{" "}{"Last"}</p>
                        <div id={styles.profileInformationStats}>
                            <div className={styles.statContainer}>
                                <p>Activities</p>
                                <p>{user?.total_activitites}</p>
                            </div>
                        </div>
                    </div>
                    <div id={styles.latestActivity}>
                        <p>Latest Activity</p>
                        <Link to={`/activities/${user?.last_activity.id}`}>
                            <p>{user?.last_activity.title}</p>
                            <div id={styles.timeAgo}>
                                <p>
                                    •
                                </p>
                                <ReactTimeAgo date={new Date(user?.last_activity.date + " " + user?.last_activity.time)} locale="en-US" />
                            </div>
                        </Link>
                    </div>
                </div>
                <div className={styles.mainMiddle}>

                </div>
                <div className={styles.mainSides} id={styles.rightSide}>
                    <div id={styles.clubSection}>
                        <p className={styles.homePageTitle}>Your Clubs</p>
                        {user && <ul id={styles.clubContainer}>
                            {Object.values(user.joined_clubs).map(club => {
                                return (
                                    <li key={club.clubImage} className={styles.clubImage}>
                                        <img src={club.clubImage} alt="Club Avatar" />
                                    </li>
                                );
                            })}
                        </ul>}
                        <button className={styles.rightSideButton}>View All Clubs </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;