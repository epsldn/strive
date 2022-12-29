import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import MainNavBar from "../MainNavBar";
import styles from "../../stylesheets/ClubForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createClub } from "../../store/clubs";

const test = [1, 2, 3, 4, 5];

function CreateClub() {
    const [errors, setErrors] = useState({});
    const [clubName, setClubName] = useState("");
    const [location, setLocation] = useState("");
    const [website, setWebsite] = useState("");
    const [sport, setSport] = useState("cycling");
    const [clubType, setClubType] = useState("club");
    const [description, setDescription] = useState("");
    const [coordinates, setCoordinates] = useState("");
    const [showCities, setShowCities] = useState(true);
    const [cities, setCities] = useState([]);
    const path = useLocation().pathname;
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    document.title = "Create Club | Strive Club";

    async function handleSubmission(event) {
        event.preventDefault();
        let errors = {};
        if (!clubName) errors.clubName = "Please enter a name for your club.";
        if (!location) errors.location = "Please enter your city and state.";
        if (!description) errors.description = "Please enter a description for your club.";
        setErrors(errors);
        if (Object.keys(errors).length > 0) return;

        const payload = {
            "club_name": clubName,
            "description": description,
            "location": location,
            "owner_id": user.id,
            "sport": sport,
            "type": clubType,
            "website": website,
        };

        errors = await dispatch(createClub(payload));
        if (errors) {
            setErrors(errors);
        }
    }

    function handleCancel(event) {
        event.preventDefault();
        history.goBack();
    }

    useEffect(() => {
        fetch("/api/maps/city-search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ coordinates, search: location })
        })
            .then(response => response.json())
            .then(data => setCities(data));
    }, [location]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => setCoordinates(position.coords.latitude + "," + position.coords.longitude), () => setCoordinates(null), { enableHighAccurary: true, timeout: 3000 });
    }, [path]);

    return (
        <div className={styles.mainWrapper}>
            <MainNavBar />
            <div className={styles.mainContent}>
                <div className={styles.formWrapper}>
                    <h1>
                        Create Club
                    </h1>
                    <p>Fields marked with * are required</p>
                    <form onSubmit={handleSubmission}>
                        <div>
                            <label>Club Name *</label>
                            <input
                                type="text"
                                onChange={(event) => setClubName(event.target.value)}
                                value={clubName}
                            />
                            <label className={styles.errors}>{errors.clubName}</label>
                        </div>
                        <div>
                            <label>Location *</label>
                            <input
                                type="text"
                                onChange={(event) => setLocation(event.target.value)}
                                value={location}
                                id={styles.location}
                            />
                            {showCities && cities.length > 0 &&
                                <ul className={styles.cities}>
                                    {cities.map(k => <li>{k}</li>)}
                                </ul>
                            }
                            <label className={styles.errors}>{errors.location}</label>
                        </div>
                        <div>
                            <label>Website</label>
                            <input
                                type="text"
                                onChange={(event) => setWebsite(event.target.value)}
                                value={website}
                            />
                            <label className={styles.errors}>{errors.website}</label>
                        </div>
                        <div>
                            <label>Sport</label>
                            <select
                                onChange={(event) => setSport(event.target.value)}
                                value={sport}
                            >
                                <option value="cycling">Cycling</option>
                                <option value="running">Running</option>
                                <option value="triathlon">Triathlon</option>
                                <option value="alpine_skiing">Alpine Skiing</option>
                                <option value="backcountry_skiing">Backcountry Skiing</option>
                                <option value="canoeing">Canoeing</option>
                                <option value="crossfit">Crossfit</option>
                                <option value="ebiking">E-Biking</option>
                                <option value="elliptical">Elliptical</option>
                                <option value="handcycling">Handcycling</option>
                                <option value="hiking">Hiking</option>
                                <option value="ice_skating">Ice Skating</option>
                                <option value="inline_skating">Inline Skating</option>
                                <option value="kayaking">Kayaking</option>
                                <option value="kitesurfing">Kitesurfing</option>
                                <option value="nordic_skiing">Nordic Skiing</option>
                                <option value="rock_climbing">Rock Climbing</option>
                                <option value="roller_skiing">Roller Skiing</option>
                                <option value="rowing">Rowing</option>
                                <option value="footsports">Run/Walk/Hike</option>
                                <option value="sailing">Sailing</option>
                                <option value="ski_snowboard">Ski/Snowboard</option>
                                <option value="snowboarding">Snowboarding</option>
                                <option value="snowshoeing">Snowshoeing</option>
                                <option value="stair_stepper">Stair Stepper</option>
                                <option value="stand_up_paddling">Stand-up Paddling</option>
                                <option value="surfing">Surfing</option>
                                <option value="swimming">Swimming</option>
                                <option value="velomobile">Velomobile</option>
                                <option value="virtual_ride">Virtual Riding</option>
                                <option value="virtual_run">Virtual Running</option>
                                <option value="walking">Walking</option>
                                <option value="weight_training">Weight Training</option>
                                <option value="wheelchair">Wheelchair</option>
                                <option value="windsurfing">Windsurfing</option>
                                <option value="winter_sports">Winter Sports</option>
                                <option value="workout">Workout</option>
                                <option value="yoga">Yoga</option>
                                <option value="other">Multisport</option>
                            </select>
                            <label className={styles.errors}>{errors.sport}</label>
                        </div>
                        <div>
                            <label>Club Type</label>
                            <select
                                onChange={(event) => setClubType(event.target.value)}
                                value={clubType}
                            >
                                <option value="club">Club</option>
                                <option value="racing_team">Racing Team</option>
                                <option value="shop">Shop</option>
                                <option value="company">Company / Workplace</option>
                                <option value="other">Other</option>
                            </select>
                            <label className={styles.errors}>{errors.clubType}</label>
                        </div>
                        <div>
                            <label>Description *</label>
                            <textarea
                                onChange={(event) => setDescription(event.target.value)}
                                value={description}
                            />
                            <label className={styles.errors}>{errors.description}</label>
                        </div>
                        <div className={styles.buttonContainer}>
                            <button type="submit">Create Club</button>
                            <button onClick={handleCancel}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    );
}

export default CreateClub;