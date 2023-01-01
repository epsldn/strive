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

    const distanceDropDownContainer = useRef(null);
    const elevationDropDownContainer = useRef(null);

    function onSubmit(event) {
        event.preventDefault();
    }

    function updateDistanceType(event) {
        event.stopPropagation();
        setDistanceType(event.target.innerText);
        setShowDistanceOptions(false);
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

    return (
        <div className={styles.outerContainer}>
            <MainNavBar />
            <div className={styles.mainContainer}>
                <div className={styles.activityTabs}>
                    Manual
                </div>
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