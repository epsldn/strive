import { useEffect, useRef, useState } from "react";
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MainNavBar from "../MainNavBar";
import defaultProfile from "../../assets/defaultProfile.png";
import styles from "../../stylesheets/AthleteShowcase.module.css";
import ClubImages from "../HomePage/ClubImages";
import ActivityCard from "../HomePage/ActivityCard";
import { authenticate, updateUser } from "../../store/session";
import FollowingListItem from "./FollowingListItem";

function AthleteShowcase() {
    const { athleteId } = useParams();
    const user = useSelector(state => state.session.user);
    const [athlete, setAthlete] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isMouseOverFollowButton, setIsMouseOverFollowButton] = useState(false);
    const [currentTab, setCurrentTab] = useState("recentActivity");
    const [followingTab, setFollowingTab] = useState("followedBy");
    const [showFollowingTabs, setShowFollowingTabs] = useState(false);
    const followingTabContainer = useRef(null);
    const activities = athlete?.activities || [];

    const profilePictureInput = useRef(null);
    const dispatch = useDispatch();
    document.title = `${athlete ? `${athlete?.firstName} ${athlete?.lastName}` : "Athlete"} | Strive`;

    function changeFollowingTab(event, tabName) {
        event.stopPropagation();
        setFollowingTab(tabName);
        setShowFollowingTabs(false);
        followingTabContainer.current.blur();
    }

    let content;

    switch (currentTab) {
        case "recentActivity": {
            content =
                <ul className={styles.clubActivities}>
                    {activities.length > 0 ?
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
                </ul>;

            break;
        }

        case "following": {
            let tabName;
            let followList;
            switch (followingTab) {
                case "followedBy": {
                    tabName = athlete.id === user.id ? "Following Me" : `Following ${athlete.firstName}`;
                    followList = athleteId == user.id ? Object.values(athlete.requests).concat(Object.values(athlete.followers)) : Object.values(athlete.followers);
                    break;
                }

                case "following": {
                    tabName = athlete.id === user.id ? "I'm Following" : `${athlete.firstName} Is Following`;
                    followList = athlete.follows;
                    break;
                }

            }

            content =
                <div>
                    <button id={styles.tabName} onClick={_ => setShowFollowingTabs(true)} ref={followingTabContainer}>
                        <p>{tabName} <i style={{ color: "#666", marginLeft: "7px" }} className="fa-solid fa-caret-down" /></p>
                        {showFollowingTabs &&
                            <ul id={styles.followingTabsContainer}>
                                <li onClick={event => changeFollowingTab(event, "followedBy")}>{athlete.id === user.id ? "Following Me" : `Following ${athlete.firstName}`}</li>
                                <li onClick={event => changeFollowingTab(event, "following")}>{athlete.id === user.id ? "I'm Following" : `${athlete.firstName} Is Following`}</li>
                            </ul>
                        }
                    </button >

                    <ul id={styles.followList}>
                        {console.log(Object.values(followList))}
                        {Object.values(followList).map((athlete, idx) => {
                            return (
                                <FollowingListItem user={user} athlete={athlete} unfollowUser={unfollowUser} cancelRequest={cancelRequest} sendRequest={sendRequest} styles={styles} acceptRequest={acceptRequest} />
                            );
                        })}
                    </ul>
                </div>;

            break;
        }
    }

    useEffect(() => {
        fetch(`/api/users/${athleteId}`)
            .then(response => response.json())
            .then(athlete => setAthlete(athlete));
    }, [athleteId]);

    useEffect(() => {
        if (!showFollowingTabs) return;


        function onClick(e) {
            if (followingTabContainer.current && followingTabContainer.current.contains(e.target) === false) {
                setShowFollowingTabs(false);
            }
        }

        document.addEventListener("click", onClick);
        return () => document.removeEventListener("click", onClick);
    }, [showFollowingTabs]);


    if (isLoaded && !athlete) {
        return <Redirect to="/" />;
    }

    async function handleImageChange(event) {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append("image", image);

        const res = await fetch('/api/images/user-profile/', {
            method: "POST",
            body: formData,
        });

        if (res.ok) {
            const data = await res.json();
            setIsLoaded(false);
            dispatch(updateUser(data.user));
            setAthlete(data.user);
            setIsLoaded(true);
        }
        else {
            const errors = await res.json();
            console.log(errors);
        }
    }

    async function sendRequest(event, id = athlete.id) {
        event.stopPropagation();
        event.preventDefault();

        const response = await fetch(`/api/users/${id}/request-follow`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(updateUser(data.user));
        }
    }

    async function cancelRequest(event, id = athlete.id) {
        event.stopPropagation();
        event.preventDefault();


        const response = await fetch(`/api/users/${id}/request-follow`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(updateUser(data.user));
        }

    }

    async function unfollowUser(event, id = athlete.id) {
        event.stopPropagation();
        event.preventDefault();

        const response = await fetch(`/api/users/${id}/unfollow`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(updateUser(data.user));
        }

    }

    async function acceptRequest(event, id = athlete.id) {
        event.stopPropagation();
        event.preventDefault();

        const response = await fetch(`/api/users/${id}/accept-follow`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {}
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(updateUser(data.user));
        }
    };


    return (
        <div className={styles.outerContainer}>
            <MainNavBar setIsloaded={setIsLoaded} />
            {isLoaded && <div className={styles.mainContent}>
                <div className={styles.profilePictureContainer}>
                    <div id={styles.profilePicture}>
                        <img src={athlete.profilePicture || defaultProfile} alt="Athlete Avatar" />
                        {user.id === athlete.id &&
                            <label>
                                <input
                                    style={{ display: "none" }}
                                    type="file"
                                    accept="image/png, image/jpg, image/jpeg"
                                    onChange={handleImageChange}
                                    id="profile-image-upload"
                                    ref={profilePictureInput}
                                />
                            </label>}
                    </div>
                    {user.id === athlete.id &&
                        <div id={`${styles.faStack}`} className={`fa-stack`} onClick={() => profilePictureInput.current.click()}>
                            <i style={{ color: "white" }} className="fa-solid fa-circle fa-stack-1x" />
                            <i style={{ color: "lightgray" }} className="fa-solid fa-circle-plus fa-stack-2x" />
                        </div>
                    }
                </div>
                <p id={styles.name}>{athlete.firstName} {athlete.lastName}</p>
                {athlete.id !== user.id ?
                    athlete.id in user.follows ?
                        <button id={styles.requestToFollow}
                            onClick={unfollowUser}
                            onMouseOver={_ => setIsMouseOverFollowButton(true)}
                            onMouseLeave={_ => setIsMouseOverFollowButton(false)}>
                            {isMouseOverFollowButton ? "Unfollow" : "Following"}
                        </button> :
                        (athlete.id in user.requests_sent ?
                            <button id={styles.requestToFollow}
                                onClick={cancelRequest}
                                onMouseOver={_ => setIsMouseOverFollowButton(true)}
                                onMouseLeave={_ => setIsMouseOverFollowButton(false)}>
                                {isMouseOverFollowButton ? "Cancel request" : "Request Sent"}
                            </button>
                            :
                            <button id={styles.requestToFollow}
                                onClick={sendRequest}>
                                Request to follow
                            </button>) : null
                }

                <div className={styles.mainInfoContainer}>
                    <div className={styles.mainInfoContainerLeft}>
                        <ul id={styles.tabs}>
                            <li className={styles.tab} id={currentTab === "recentActivity" ? styles.activeTab : ""} onClick={_ => setCurrentTab("recentActivity")}>Recent Activity</li>
                            <li className={styles.tab} id={currentTab === "following" ? styles.activeTab : ""} onClick={_ => setCurrentTab("following")}>Following</li>
                        </ul>

                        {content}

                    </div>
                    <div className={styles.mainInfoContainerRight}>
                        <div id={styles.clubSection}>
                            <p id={styles.clubs}>Clubs</p>
                            <ul id={styles.clubContainer}>
                                {Object.values(athlete.joined_clubs).length > 0 ?
                                    Object.values(athlete.joined_clubs).map(club => {
                                        return (
                                            <Link key={club.id} to={`/clubs/${club.id}`}><ClubImages club={club} /></Link>
                                        );
                                    }) : <li style={{ fontSize: "1.4rem" }}>No clubs yet!</li>}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>}
        </div >
    );
}

export default AthleteShowcase;