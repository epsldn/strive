import React, { useEffect, useRef, useState } from "react";
import { Redirect, useHistory, useLocation, useParams } from "react-router-dom";
import MainNavBar from "../MainNavBar";
import styles from "../../stylesheets/ClubForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import CLubPictures from "./ClubPictures";
import { deleteClub, updateClub } from "../../store/clubs";

function EditClub() {
    const [errors, setErrors] = useState({});
    const [clubName, setClubName] = useState("");
    const [location, setLocation] = useState("");
    const [website, setWebsite] = useState("");
    const [sport, setSport] = useState("cycling");
    const [clubType, setClubType] = useState("club");
    const [description, setDescription] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [coordinates, setCoordinates] = useState("");
    const [selected, setSelected] = useState(0);
    const [showCities, setShowCities] = useState(true);
    const [cities, setCities] = useState([]);

    const { clubId } = useParams();
    const clubs = useSelector(state => state.clubs);
    const [club, setClub] = useState(null);


    const path = useLocation().pathname;
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    const locationRef = useRef(null);
    const locationContainer = useRef(null);
    const cityRef = useRef(null);

    document.title = `${club?.clubName || "Edit Club"} | Strive Club`;

    useEffect(() => {
        let club;
        if (Object.keys(clubs).length > 0) {
            setLoaded(true);
            club = clubs[clubId];
            setClub(club);
            setShowCities(false);
        }

        if (club) {
            setClubName(club.clubName || "");
            setLocation(club.location || "");
            setWebsite(club.website || "");
            setSport(club.sport || "");
            setClubType(club.type || "");
            setDescription(club.description || "");
        }
    }, [clubs]);

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

        errors = await dispatch(updateClub(payload, clubId));
        if (errors) {
            setErrors(errors);
        }
    }

    function handleCancel(event) {
        event.preventDefault();
        history.goBack();
    }

    function handleDelete(event) {
        event.preventDefault();
        dispatch(deleteClub(clubId));
    }

    function handleKeyDown(event) {
        const key = event.code;

        if (key === "ArrowUp" && selected > 0) {
            event.preventDefault();
            setSelected(selected => selected - 1);
        }

        if (key === "ArrowDown" && selected < 4) {
            event.preventDefault();
            setSelected(selected => selected + 1);
        }

        if (key === "Enter" && cityRef.current) {
            event.preventDefault();
            setCities([cityRef.current.textContent]);
            setLocation(cityRef.current.textContent);
            setShowCities(false);
        }

        if (key === "Tab" && cityRef.current) {
            setShowCities(false);
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
            .then(data => {
                setCities(data);
            });

        if (locationContainer.current && cities.length > 1) {
            setShowCities(true);
        }

        function onClick(e) {
            if (locationContainer.current && locationContainer.current.contains(e.target) === false) {
                setShowCities(false);
            }
        }

        document.addEventListener("click", onClick);
        return () => document.removeEventListener("click", onClick);
    }, [location]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => setCoordinates(position.coords.latitude + "," + position.coords.longitude),
            () => setCoordinates(null),
            { enableHighAccurary: true, timeout: 3000 });
    }, [path]);

    if (loaded && clubId in user.owned_clubs === false) {
        return <Redirect to="/" />;
    }



    return (
        <div className={styles.mainWrapper}>
            <MainNavBar />
            <div className={styles.mainContent}>
                <CLubPictures club={club} />
                <div className={styles.formWrapper}>
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
                        <div ref={locationContainer} onKeyDown={handleKeyDown}>
                            <label>Location *</label>
                            <input
                                type="text"
                                onChange={(event) => setLocation(event.target.value)}
                                value={location}
                                id={styles.location}
                                ref={locationRef}
                                onFocus={() => setShowCities(true)}
                                autoComplete="off"
                                onBlur={() => {
                                    if (location !== cities[0]) {
                                        setLocation("");
                                    }
                                }}

                            />
                            {showCities && cities.length > 0 &&
                                <ul className={styles.cities}>
                                    {cities.map((city, index) => (
                                        <li key={city}
                                            style={
                                                selected === index ?
                                                    { backgroundColor: "lightgray" } :
                                                    {}
                                            }
                                            ref={
                                                selected === index ?
                                                    cityRef :
                                                    undefined
                                            }
                                            onClick={() => {
                                                setLocation(city);
                                                setShowCities(false);
                                            }}
                                        >{city}</li>
                                    )
                                    )}
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
                            <button type="submit">Save Changes</button>
                            <button onClick={handleCancel}>Cancel</button>
                        </div>
                    </form>
                </div>
                <div className={styles.deleteSection}>
                    <p>This action will remove your club and your club's history from Strive.</p>
                    <button onClick={handleDelete}>Delete Club</button>
                </div>
            </div >
        </div >
    );
}

export default EditClub;