import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import ActivityCard from "../HomePage/ActivityCard";
import CLubPictures from "./ClubPictures";
import MainNavBar from "../MainNavBar";
import defaultProfile from "../../assets/defaultProfile.png";
import styles from "../../stylesheets/ClubShowcase.module.css";
import { authenticate } from "../../store/session";
import { fetchClubs } from "../../store/clubs";
import { fetchActivities } from "../../store/activities";


function ClubShowcase() {
    const { clubId } = useParams();
    const user = useSelector(state => state.session.user);
    const club = useSelector(state => state.clubs[clubId]);
    const [activities, setActivities] = useState();
    const [isLoaded, setIsLoaded] = useState(false);

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        fetch(`/api/clubs/${clubId}/activities`)
            .then(response => response.json())
            .then(activities => setActivities(activities));
    }, [clubId]);

    if (isLoaded && !club) {
        return <Redirect to="/" />;
    }

    async function joinClub() {
        const response = await fetch(`/api/clubs/${clubId}/join`);

        if (response.ok) {
            fetch(`/api/clubs/${clubId}/activities`)
                .then(response => response.json())
                .then(activities => setActivities(activities));
            await dispatch(authenticate());
            await dispatch(fetchClubs());
        }

    }

    async function leaveClub() {
        const response = await fetch(`/api/clubs/${clubId}/leave`);

        if (response.ok) {
            fetch(`/api/clubs/${clubId}/activities`)
                .then(response => response.json())
                .then(activities => setActivities(activities));
            await dispatch(authenticate());
            await dispatch(fetchClubs());
            await dispatch(fetchActivities());
        }
    }

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
                                <button id={styles.edit} onClick={() => history.push(`/clubs/${clubId}/edit`)}>Edit Club</button> :
                                club.id in user.joined_clubs ?
                                    <button id={styles.leave} onClick={leaveClub}>Leave Club</button> :
                                    <button id={styles.join} onClick={joinClub}>Join Club</button>
                        }
                    </div>
                    <p> <i className="fa-solid fa-location-dot" id={styles.locationIcon} /> {club.location}</p>
                    <p id={styles.description}>{club.description}</p>
                    <div className={styles.mainInfoContainer}>
                        <div className={styles.mainInfoContainerLeft}>
                            <ul id={styles.tabs}>
                                <li id={styles.activeTab}>Club Activity</li>
                            </ul>
                            <ul className={styles.clubActivities}>
                                {activities && activities.length > 0 ?
                                    activities.map(activity => {
                                        return (
                                            <li key={activity.id} className={styles.activityCard}><ActivityCard activity={activity} /></li>
                                        );
                                    }) : ["No Activities"].map(activity => {
                                        return (
                                            <li key={activity.id} className={styles.activityCard}><ActivityCard activity={activity} /></li>
                                        );
                                    })
                                }
                            </ul>
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