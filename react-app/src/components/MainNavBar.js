import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { fetchActivities } from "../store/activities";
import { fetchClubs } from "../store/clubs";
import { authenticate, logout } from "../store/session";
import defaultProfile from "../assets/defaultProfile.png";
import styles from "../stylesheets/MainNavBar.module.css";

function MainNavBar(props) {
    const user = useSelector(state => state.session.user);
    const path = useLocation().pathname;

    const [showProfileAction, setShowProfileActions] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const setIsLoaded = props.setIsloaded;

    useEffect(() => {
        (async function () {
            await dispatch(authenticate());
            await dispatch(fetchClubs());
            await dispatch(fetchActivities());
            if (setIsLoaded) setIsLoaded(true);
        })();
    }, [path, dispatch]);

    async function onLogout() {
        await dispatch(logout());
    }

    if (history.location.pathname === "/") {
        document.body.style = "background: #f7f7fa";
    } else {
        document.body.style = "background: #ffffff";
    }
    return (
        <div className={styles.navbarContainer}>
            <div className={styles.navBar}>
                <p><Link to="/" id={styles.logo}>
                    STRIVE
                </Link></p>
                <ul className={styles.navlinks}>
                    <Link to="/">
                        <li>
                            Home
                        </li>
                    </Link>
                    <Link to="/clubs/search">
                        <li>
                            Clubs
                        </li>
                    </Link>
                </ul>
                <div className={styles.actions}>
                    <div id={styles.profileAction} >
                        <div id={styles.profileImageContainer}>
                            <img alt="Profile Image" src={user?.profilePicture || defaultProfile} />
                        </div>
                        <i className="fa-solid fa-chevron-down" />
                        <ul id={styles.profileList}>
                            <li><Link to={`/athletes/${user?.id}`}>My Account</Link></li>
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