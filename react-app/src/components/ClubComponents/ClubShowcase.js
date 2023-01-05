import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ActivityCard from "../HomePage/ActivityCard";
import CLubPictures from "./ClubPictures";
import MainNavBar from "../MainNavBar";
import defaultProfile from "../../assets/defaultProfile.png";
import styles from "../../stylesheets/ClubShowcase.module.css";


function ClubShowcase() {
    const { clubId } = useParams();
    const user = useSelector(state => state.session.user);
    const club = useSelector(state => state.clubs[clubId]);
    const [activities, setActivities] = useState();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetch(`/api/clubs/${clubId}/activities`)
            .then(response => response.json())
            .then(activities => setActivities(activities));
    }, [clubId]);

    return (
        <div className={styles.outerContainer}>
            <MainNavBar setIsloaded={setIsLoaded} />
            {isLoaded &&
                <div className={styles.mainContainer}>
                    <CLubPictures club={club} user={user} />
                    <div className={styles.titleAndEdit}>
                        <h1>{club.clubName}</h1>
                        {
                            club.owner_id === user.id ?
                                <button id={styles.edit}>Edit Club</button> :
                                club.id in user.joined_clubs ?
                                    <button id={styles.leave}>Leave Club</button> :
                                    <button id={styles.join}>Join Club</button>
                        }
                    </div>
                    <p>{club.location}</p>
                    <p id={styles.description}>{club.description}</p>
                    <div className={styles.mainInfoContainer}>
                        <div className={styles.mainInfoContainerLeft}>
                            <ul id={styles.tabs}>
                                <li id={styles.activeTab}>Recent Activity</li>
                            </ul>
                            <div className={styles.clubActivities}>
                                {activities &&
                                    activities.map(activity => {
                                        return (
                                            <li key={activity.id} className={styles.activityCard}><ActivityCard activity={activity} /></li>
                                        );
                                    })
                                }
                            </div>
                        </div>
                        <div className={styles.mainInfoContainerRight}>
                            <div className={styles.mainInfoContainerRightContent}>
                                <p className={styles.mainInfoContainerRightTitle}>{club.totalMembers} members</p>
                                <ul className={styles.memberLinks}>
                                    {Object.values(club.members).map(member => {
                                        return (
                                            <Link key={member.id} to={`/athletes/${member.id}`}>
                                                <li className={styles.profileImageContainer} title={`${member.firstName} ${member.lastName}`}>
                                                    <img src={member.profilePicture || defaultProfile} alt="Member avatar" />
                                                </li>
                                            </Link>
                                        );
                                    })}
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default ClubShowcase;