import { useEffect, useRef, useState } from "react";
import MainNavBar from "../MainNavBar";
import styles from "../../stylesheets/ClubSearch.module.css";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ClubImages from "../HomePage/ClubImages";

function ClubSearch() {
    const user = useSelector(state => state.session.user);
    const [isLoaded, setIsLoaded] = useState(false);
    const [results, setResults] = useState([]);


    const [clubName, setClubName] = useState("");


    const [location, setLocation] = useState("");
    const [coordinates, setCoordinates] = useState("");
    const [showCities, setShowCities] = useState(true);
    const [cities, setCities] = useState([]);
    const [selected, setSelected] = useState(-1);
    const locationRef = useRef(null);
    const locationContainer = useRef(null);
    const cityRef = useRef(null);



    const [sport, setSport] = useState("All");
    const [type, setType] = useState("All");

    const history = useHistory();

    function onSubmit(event) {
        event.preventDefault();

        const payload = {
            "club_name": clubName,
            "location": location,
            "sport": sport,
            "type": type
        };

        console.log("submitting...");
        console.log(payload);
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
            setSelected(0);
            setShowCities(false);
        }

        if (key === "Tab" && cityRef.current) {
            setShowCities(false);
        }
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
    }, [history.location.pathname]);


    return (
        <div className={styles.outerContainer}>
            <MainNavBar setIsloaded={setIsLoaded} />
            <div className={styles.mainContainer}>
                <div id={styles.titleAndButton}>
                    <h1>Clubs</h1>
                    <button onClick={() => history.push("/clubs/create")}>Create a Club</button>
                </div>
                {isLoaded && <ul id={styles.clubContainer}>
                    {Object.values(user.joined_clubs).length > 0 ?
                        Object.values(user.joined_clubs).map(club => {
                            return (
                                <Link key={club.id} to={`/clubs/${club.id}`}><ClubImages club={club} styles={styles} /></Link>
                            );
                        }) : <li style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>No clubs yet!</li>}
                </ul>}
                <form id={styles.searchContainer} onSubmit={onSubmit}>
                    <div className={styles.inputContainer}>
                        <input
                            type="text"
                            placeholder="Club Name"
                            value={clubName}
                            onChange={event => setClubName(event.target.value)}
                        />
                    </div>
                    <div id={styles.location} className={styles.inputContainer} ref={locationContainer} onKeyDown={handleKeyDown}>
                        <input
                            type="text"
                            placeholder="Location"
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
                                        onMouseOver={() => setSelected(-1)}
                                        style={
                                            selected === index ?
                                                { backgroundColor: "#e9e9ed" } :
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
                                            setCities([city]);
                                        }}
                                    >{city}</li>
                                )
                                )}
                            </ul>
                        }
                    </div>
                    <div className={styles.inputContainer}>
                        <p>Sport Type</p>
                        <select
                            value={sport}
                            onChange={event => setSport(event.target.value)}
                        >
                            <option value="all">All</option>
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
                    </div>
                    <div className={styles.inputContainer}>
                        <label>Club Type</label>
                        <select
                            value={type}
                            onChange={event => setType(event.target.value)}
                        >
                            <option value="all">All</option>
                            <option value="club">Club</option>
                            <option value="racing_team">Racing Team</option>
                            <option value="shop">Shop</option>
                            <option value="company">Company / Workplace</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className={styles.inputContainer}>
                        <button id={styles.search}>Search</button>
                    </div>
                </form>

                <div id={styles.searchResults}>

                </div>
            </div>
        </div>
    );
}

export default ClubSearch;