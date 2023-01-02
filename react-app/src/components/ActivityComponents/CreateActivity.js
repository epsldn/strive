import MainNavBar from "../MainNavBar";
import styles from "../../stylesheets/CreateActivity.module.css";
import { useEffect, useRef, useState } from "react";

function CreateActivity() {
    const [distance, setDistance] = useState("");
    const [distanceType, setDistanceType] = useState("miles");
    const [showDistanceOptions, setShowDistanceOptions] = useState(false);

    const [hours, setHours] = useState("01");
    const [minutes, setMinutes] = useState("00");
    const [seconds, setSeconds] = useState("00");

    const [elevation, setElevation] = useState("");
    const [elevationType, setElevationType] = useState("feet");
    const [showElevationOptions, setShowElevationOptions] = useState(false);

    const [sportType, setSportType] = useState("Run");
    const [showSportOptions, setShowSportOptions] = useState(false);

    const today = new Date().toJSON().slice(0,10);
    const [selectedDate, setSelectedDate] = useState(today);
    const [time, setTime] = useState("");

    const distanceDropDownContainer = useRef(null);
    const elevationDropDownContainer = useRef(null);
    const sportDropDownContainer = useRef(null);

    function onSubmit(event) {
        event.preventDefault();
    }

    function updateDistanceType(event) {
        event.stopPropagation();
        setDistanceType(event.target.innerText);
        setShowDistanceOptions(false);
    }

    function updateElevationType(event) {
        event.stopPropagation();
        setElevationType(event.target.innerText);
        setShowElevationOptions(false);
    }


    function updateSportType(event) {
        event.stopPropagation();
        setSportType(event.target.innerText);
        setShowSportOptions(false);
    }

    useEffect(() => {
        if (!showDistanceOptions) return;

        function onClick(event) {
            if (distanceDropDownContainer && distanceDropDownContainer.current.contains(event.target) === false) {
                setShowDistanceOptions(false);
            }
        }

        document.addEventListener("click", onClick);

        return () => document.removeEventListener("click", onClick);
    }, [showDistanceOptions]);

    useEffect(() => {
        if (!showElevationOptions) return;

        function onClick(event) {
            if (elevationDropDownContainer && elevationDropDownContainer.current.contains(event.target) === false) {
                setShowElevationOptions(false);
            }
        }

        document.addEventListener("click", onClick);

        return () => document.removeEventListener("click", onClick);
    }, [showElevationOptions]);

    useEffect(() => {
        if (!showSportOptions) return;

        function onClick(event) {
            if (sportDropDownContainer && sportDropDownContainer.current.contains(event.target) === false) {
                setShowSportOptions(false);
            }
        }

        document.addEventListener("click", onClick);

        return () => document.removeEventListener("click", onClick);
    }, [showSportOptions]);

    return (
        <div className={styles.outerContainer}>
            <MainNavBar />
            <div className={styles.mainContainer}>
                <ul className={styles.activityTabs}>
                    <li>Manual</li>
                </ul>
                <div className={styles.activityFormContainer}>
                    <h1 id={styles.title}>
                        Manual Entry
                    </h1>

                    <form onSubmit={onSubmit}>
                        <div className={styles.section1}>
                            <div className={styles.contentSection}>
                                <label htmlFor={styles.distance}>
                                    Distance
                                </label>
                                <div className={styles.sectionInnerContent}>
                                    <input
                                        type="number"
                                        value={distance}
                                        id={styles.distance}
                                        onChange={(event) => setDistance(event.target.value)}
                                    />
                                    <div id={styles.dropDown} className={showDistanceOptions ? styles.dropDownActive : ""} onClick={() => setShowDistanceOptions(true)} ref={distanceDropDownContainer}>
                                        {distanceType}
                                        {showDistanceOptions &&
                                            <ul className={styles.dropDownOptions}>
                                                <li onClick={updateDistanceType}>kilometers</li>
                                                <li onClick={updateDistanceType}>meters</li>
                                                <li onClick={updateDistanceType}>miles</li>
                                                <li onClick={updateDistanceType}>yards</li>
                                            </ul>
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className={styles.contentSection}>
                                <label>
                                    Duration
                                </label>

                                <div className={styles.sectionInnerContent}>
                                    <div id={styles.hours}>
                                        <input
                                            type="number"
                                            value={hours}
                                            onChange={(event) => setHours(event.target.value)}
                                            max={99}
                                            min={0}
                                        />
                                    </div>
                                    <div id={styles.minutes}>
                                        <input
                                            type="number"
                                            value={minutes}
                                            id={styles.minutes}
                                            onChange={(event) => setMinutes(event.target.value)}
                                            max={59}
                                            min={0}
                                        />
                                    </div>
                                    <div id={styles.seconds}>
                                        <input
                                            type="number"
                                            value={seconds}
                                            id={styles.seconds}
                                            onChange={(event) => setSeconds(event.target.value)}
                                            max={59}
                                            min={0}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className={styles.contentSection}>
                                <label>
                                    Elevation
                                </label>

                                <div className={styles.sectionInnerContent}>
                                    <input
                                        type="number"
                                        value={elevation}
                                        max={29029}
                                        onChange={(event) => setElevation(event.target.value)}
                                    />
                                    <div id={styles.dropDown} className={showElevationOptions ? styles.dropDownActive : ""} onClick={() => setShowElevationOptions(true)} ref={elevationDropDownContainer}>
                                        {elevationType}
                                        {showElevationOptions &&
                                            <ul className={styles.dropDownOptions}>
                                                <li onClick={updateElevationType}>meters</li>
                                                <li onClick={updateElevationType}>feet</li>
                                            </ul>
                                        }
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className={styles.section2}>

                            <div className={styles.contentSection}>
                                <label>
                                    Sport
                                </label>
                                <div className={styles.sectionInnerContent}>
                                    <div id={styles.dropDown} className={showSportOptions ? styles.dropDownActive : ""} onClick={() => setShowSportOptions(true)} ref={sportDropDownContainer}>
                                        {sportType}
                                        {showSportOptions &&
                                            <ul className={styles.dropDownOptions} id={styles.sportsDropDown}>
                                                <li onClick={updateSportType}>Ride</li>
                                                <li onClick={updateSportType}>Swim</li>
                                                <li onClick={updateSportType}>Hike</li>
                                                <li onClick={updateSportType}>Walk</li>
                                                <li onClick={updateSportType}>Alpine Ski</li>
                                                <li onClick={updateSportType}>Backcountry Ski</li>
                                                <li onClick={updateSportType}>Canoe</li>
                                                <li onClick={updateSportType}>Crossfit</li>
                                                <li onClick={updateSportType}>E-Bike Ride</li>
                                                <li onClick={updateSportType}>Elliptical</li>
                                                <li onClick={updateSportType}>Golf</li>
                                                <li onClick={updateSportType}>Run</li>
                                                <li onClick={updateSportType}>Handcycle</li>
                                                <li onClick={updateSportType}>Ice Skate</li>
                                                <li onClick={updateSportType}>Inline Skate</li>
                                                <li onClick={updateSportType}>Kayaking</li>
                                                <li onClick={updateSportType}>Kitesurf</li>
                                                <li onClick={updateSportType}>Nordic Ski</li>
                                                <li onClick={updateSportType}>Rock Climb</li>
                                                <li onClick={updateSportType}>Roller Ski</li>
                                                <li onClick={updateSportType}>Rowing</li>
                                                <li onClick={updateSportType}>Sail</li>
                                                <li onClick={updateSportType}>Skateboard</li>
                                                <li onClick={updateSportType}>Snowboard</li>
                                                <li onClick={updateSportType}>Snowshoe</li>
                                                <li onClick={updateSportType}>Football (Soccer)</li>
                                                <li onClick={updateSportType}>Stair-Stepper</li>
                                                <li onClick={updateSportType}>Stand Up Paddling</li>
                                                <li onClick={updateSportType}>Surfing</li>
                                                <li onClick={updateSportType}>Velomobile</li>
                                                <li onClick={updateSportType}>Virtual Ride</li>
                                                <li onClick={updateSportType}>Virtual Run</li>
                                                <li onClick={updateSportType}>Weight Training</li>
                                                <li onClick={updateSportType}>Wheelchair</li>
                                                <li onClick={updateSportType}>Windsurf</li>
                                                <li onClick={updateSportType}>Workout</li>
                                                <li onClick={updateSportType}>Yoga</li>
                                            </ul>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className={styles.contentSection}>
                                <label>
                                    Date & Time
                                </label>

                                <div className={styles.sectionInnerContent}>
                                    <input
                                        id={styles.date}
                                        type="date"
                                        value={selectedDate}
                                        onChange={(event) => setSelectedDate(event.target.value)}
                                    />
                                    {console.log(selectedDate)}
                                    <input
                                        type="time"
                                        value={time}
                                        onChange={(event) => setTime(event.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default CreateActivity;