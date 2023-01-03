import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { fetchActivities } from "../store/activities";
import { fetchClubs } from "../store/clubs";
import { logout } from "../store/session";
import styles from "../stylesheets/MainNavBar.module.css";

function MainNavBar() {
    const user = useSelector(state => state.session.user);
    const path = useLocation().pathname;

    const [showProfileAction, setShowProfileActions] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(fetchClubs());
        dispatch(fetchActivities());
    }, [path, dispatch]);

    async function onLogout() {
        await dispatch(logout());
    }

    document.body.style = "background: #ffffff";
    return (
        <div className={styles.navbarContainer}>
            <div className={styles.navBar}>
                <Link to="/" id={styles.logo}>
                    STRIVE
                </Link>
                <ul className={styles.navlinks}>
                    <Link to="/">
                        <li>
                            Home
                        </li>
                    </Link>
                    <li>
                        Clubs
                    </li>
                </ul>
                <div className={styles.actions}>
                    <div id={styles.profileAction} >
                        <div id={styles.profileImageContainer}>
                            <img alt="Profile Image" src={user?.profileImage || "https://striveonrender.s3.us-west-2.amazonaws.com/29215abf55974d0084dcb1b46a1f3c8c.png"} />
                        </div>
                        <i className="fa-solid fa-chevron-down" />
                        <ul id={styles.profileList}>
                            <li>My Account</li>
                            <li onClick={onLogout}>Log out</li>
                        </ul>
                    </div>
                    <div className={styles.createActionsContainer}>
                        <div className={styles.circlePlus}>
                            <i className="fa-solid fa-circle-plus" />
                        </div>
                        <ul className={styles.createActionsList}>
                            <li onClick={() => history.push("/activities/create")}>
                                <i className="fa-solid fa-pen-to-square" />
                                Log Activity
                            </li>
                            <li onClick={() => history.push("/clubs/create")}>
                                <i className="fa-solid fa-people-group" />
                                Create a Club
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default MainNavBar;