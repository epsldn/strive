import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { fetchClubs } from "../store/clubs";
import styles from "../stylesheets/MainNavBar.module.css";

function MainNavBar() {
    const user = useSelector(state => state.session.user);
    const path = useLocation().pathname;

    const [showProfileAction, setShowProfileActions] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchClubs());
    }, [path, dispatch]);

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
                        <i class="fa-solid fa-chevron-down" />
                        <ul id={styles.profileList}>
                            <li>My Account</li>
                            <li>Log out</li>
                        </ul>
                    </div>
                    <div>
                        ACTIONS
                    </div>
                </div>
            </div>
        </div >
    );
}

export default MainNavBar;