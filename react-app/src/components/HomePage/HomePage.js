import MainNavBar from "../MainNavBar";
import defaultProfile from "../../assets/defaultProfile.png";
import styles from "../../stylesheets/HomePage.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";
import { useState } from "react";
import en from "javascript-time-ago/locale/en.json";
import ActivityCard from "./ActivityCard";
import ClubImages from "./ClubImages";
TimeAgo.addDefaultLocale(en);

function HomePage() {
    const user = useSelector(state => state.session.user);
    const activities = useSelector(state => state.activities);

    const [isLoaded, setIsLoaded] = useState(false);
    return (
        <div className={styles.outerContainer}>
            <div id={styles.navBarContainer}>
                <MainNavBar setIsloaded={setIsLoaded} />
            </div>
            <div className={styles.mainContent} >
                <div className={styles.mainSides} id={styles.leftSide}>
                    <div id={styles.profileImage}>
                        <img src={"" || defaultProfile} />
                    </div>
                    <div id={styles.profileInformation}>
                        <Link to={`/athletes/${user.id}`} id={styles.userName}>{user?.firstName}{" "}{user?.lastName}</Link>
                        <div id={styles.profileInformationStats}>
                            <div className={styles.statContainer}>
                                <p>Activities</p>
                                <p>{user?.total_activitites}</p>
                            </div>
                        </div>
                    </div>
                    {user?.last_activity && <div id={styles.latestActivity}>
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
                    </div>}
                </div>
                <div className={styles.mainMiddle}>
                    {isLoaded &&
                        <ul id={styles.activityCards}>
                            {activities.array.length > 0 ? activities.array.map(activity => {
                                return (
                                    <li key={activity.id} className={styles.activityCard}><ActivityCard activity={activity} /></li>
                                );
                            }) :
                                ["No Activities"].map(activity => {
                                    return (
                                        <li key={activity.id} className={styles.activityCard}><ActivityCard activity={activity} /></li>
                                    );
                                })
                            }
                        </ul>
                    }
                </div>
                <div className={styles.mainSides} id={styles.rightSide}>
                    <div id={styles.clubSection}>
                        <p className={styles.homePageTitle}>Your Clubs</p>
                        {isLoaded && <ul id={styles.clubContainer}>
                            {Object.values(user.joined_clubs).length > 0 ?
                            Object.values(user.joined_clubs).map(club => {
                                return (
                                    <Link key={club.id} to={`/clubs/${club.id}`}><ClubImages club={club} styles={styles} /></Link>
                                );
                            }) : <li style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>No clubs yet!</li>}
                        </ul>}
                        <button className={styles.rightSideButton}>View All Clubs </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;