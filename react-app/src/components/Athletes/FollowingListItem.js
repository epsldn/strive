import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../stylesheets/AthleteShowcase.module.css";

function FollowingListItem({ user, athlete, unfollowUser, cancelRequest, sendRequest }) {
    const [isMouseOverFollowButton, setIsMouseOverFollowButton] = useState(false);
    { console.log(athlete); }
    return (
        <li className={styles.followListChild}>
            <div className={styles.followListChildLeft}>
                <div className={styles.followListChildLeftImg}>
                    <img src={athlete.profilePicture} />
                </div>
                <div className={styles.followListChildName}>
                    <Link to={`/athletes/${athlete.id}`}><p>{athlete.firstName} {athlete.lastName}</p></Link>
                </div>
            </div>

            <div className={styles.followListChildRight}>
                {athlete.id !== user.id && athlete.id in user.requests &&
                    <button id={styles.acceptRequest}>Accept</button>
                }
                {athlete.id !== user.id ?
                    athlete.id in user.follows ?
                        <button id={styles.requestToFollow}
                            onClick={event => unfollowUser(event, athlete.id)}
                            onMouseOver={_ => setIsMouseOverFollowButton(true)}
                            onMouseLeave={_ => setIsMouseOverFollowButton(false)}>
                            {isMouseOverFollowButton ? "Unfollow" : "Following"}
                        </button> :
                        (athlete.id in user.requests_sent ?
                            <button id={styles.requestToFollow}
                                onClick={event => cancelRequest(event, athlete.id)}
                                onMouseOver={_ => setIsMouseOverFollowButton(true)}
                                onMouseLeave={_ => setIsMouseOverFollowButton(false)}>
                                {isMouseOverFollowButton ? "Cancel request" : "Request Sent"}
                            </button>
                            :
                            <button id={styles.requestToFollow}
                                onClick={event => sendRequest(event, athlete.id)}>
                                Request to follow
                            </button>) : null
                }
            </div>
        </li>);
}

export default FollowingListItem;