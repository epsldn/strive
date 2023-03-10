import MainNavBar from "../MainNavBar";
import styles from "../../stylesheets/CreateActivity.module.css";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createActivity } from "../../store/activities";

function CreateActivity() {
    let [distance, setDistance] = useState("");
    const [distanceType, setDistanceType] = useState("miles");
    const [showDistanceOptions, setShowDistanceOptions] = useState(false);

    const [hours, setHours] = useState("01");
    const [minutes, setMinutes] = useState("00");
    const [seconds, setSeconds] = useState("00");

    let [elevation, setElevation] = useState("");
    const [elevationType, setElevationType] = useState("feet");
    const [showElevationOptions, setShowElevationOptions] = useState(false);

    const [sportType, setSportType] = useState("Run");
    const [showSportOptions, setShowSportOptions] = useState(false);

    const today = new Date(new Date().toLocaleDateString()).toJSON().slice(0, 10);
    const [selectedDate, setSelectedDate] = useState(today);
    const [time, setTime] = useState("");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [privateNotes, setPrivateNotes] = useState("");
    const [extertionLevel, setExtertionLevel] = useState(1);

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const distanceDropDownContainer = useRef(null);
    const elevationDropDownContainer = useRef(null);
    const sportDropDownContainer = useRef(null);

    const dispatch = useDispatch();
    const history = useHistory();
    const defaultTime = new Date().toTimeString().substring(0, 5);
    const defaultDate = new Date().toLocaleDateString("en-uk").split("/").map(date => date.length < 2 ? "0" + date : date).reverse().join("-");
    const oneYearAgo = new Date(2022, new Date().getMonth(), new Date().getDate()).toLocaleDateString("en-uk").split("/").map(date => date.length < 2 ? "0" + date : date).reverse().join("-");
    document.title = "Create Activity | Strive";

    async function onSubmit(event) {
        event.preventDefault();
        setSubmitted(true);
        const errors = {};

        if (!title) errors.title = "Please enter a title for your activity";
        else if (title.length > 100) errors.title = "Please keep your title under 100 characters";
        if (description.length > 1000) errors.description = "Please keep the description under 1,000 characters";
        if (privateNotes.length > 1000) errors.privateNotes = "Please keep your private notes under 1,000 characters";
        setErrors(errors);
        if (Object.values(errors).length > 0) return;

        if (distanceType !== "miles") {
            if (distanceType === "kilometers") {
                distance = (distance * 0.621371).toFixed(2);
            }

            if (distanceType === "meters") {
                distance = (distance * 0.000621371).toFixed(2);
            }

            if (distanceType === "yards") {
                distance = (distance * 0.000568182).toFixed(2);
            }
        }

        if (elevationType !== "feet") {
            elevation = (elevation * 3.28084).toFixed(2);
        }

        const payload = {
            "distance": +distance,
            "hours": +hours,
            "minutes": +minutes,
            "seconds": +seconds,
            "elevation": +elevation,
            "sport": sportType,
            "date": selectedDate || defaultDate,
            "time": time || defaultTime,
            "title": title,
            "description": description,
            "private_notes": privateNotes,
            "extertion": +extertionLevel,
        };

        const activity = await dispatch(createActivity(payload));

        if (activity.error) {
            console.log(activity);
        } else {
            history.push(`/activities/${activity.id}`);
        }
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

    function handleCancel(event) {
        event.preventDefault();
        history.goBack();
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


    useEffect(() => {
        if (!submitted) return;
        const errors = {};
        if (!title) errors.title = "Please enter a title for your activity";
        else if (title.length > 100) errors.title = "Please keep your title under 100 characters";
        else {
            delete errors.title;
        }

        if (description.length > 1000) errors.description = "Please keep the description under 1,000 characters";
        else {
            delete errors.description;
        }

        if (privateNotes.length > 1000) errors.privateNotes = "Please keep your private notes under 1,000 characters";
        else {
            delete errors.privateNotes;
        }

        setErrors(errors);
    }, [title, description, privateNotes]);

    return (
        <div className={styles.outerContainer}>
            <MainNavBar />
            <div className={styles.mainContainer}>
                <ul className={styles.activityTabs}>
                    <li className={styles.active}> Manual</li>
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
                                        step={.01}
                                        value={distance}
                                        id={styles.distance}
                                        min={0}
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
                                            step={1}
                                            value={hours}
                                            onChange={(event) => setHours(event.target.value)}
                                            max={99}
                                            min={0}
                                        />
                                    </div>
                                    <div id={styles.minutes}>
                                        <input
                                            type="number"
                                            step={1}
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
                                            step={1}
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
                                        step={.01}
                                        value={elevation}
                                        max={29029}
                                        min={-29029}
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
                                                <li onClick={updateSportType}>Wheelchair</li>
                                                <li onClick={updateSportType}>Windsurf</li>
                                                <li onClick={updateSportType}>Workout</li>
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
                                        min={oneYearAgo}
                                        max={defaultDate}
                                        value={selectedDate}
                                        onChange={(event) => setSelectedDate(event.target.value)}
                                    />
                                    <input
                                        type="time"
                                        value={time}
                                        max={selectedDate < defaultDate ? undefined : defaultTime}
                                        onChange={(event) => setTime(event.target.value)}
                                    />
                                </div>
                            </div>

                            <div className={styles.fullWidthSection}>
                                <div className={styles.contentSection}>
                                    <label className={errors.title ? styles.errorsTitle : ""}>
                                        {errors.title ? errors.title : "Title"}
                                    </label>
                                    <div className={`${styles.sectionInnerContent} ${errors.title ? styles.inputError : ""}`}>
                                        <input
                                            type="text"
                                            value={title}
                                            onChange={(event) => setTitle(event.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className={styles.fullWidthSection}>
                                <div className={styles.contentSection}>
                                    <label className={errors.description ? styles.errorsTitle : ""}>
                                        {errors.description ? errors.description : "Description"}
                                    </label>
                                    <div className={`${styles.sectionInnerContent} ${errors.description ? styles.inputError : ""}`}>
                                        <textarea
                                            id={styles.description}
                                            value={description}
                                            onChange={(event) => setDescription(event.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.section3}>
                            <div className={styles.fullWidthSection}>
                                <div className={styles.contentSection}>
                                    <label className={errors.privateNotes ? styles.errorsTitle : ""}>
                                        {errors.privateNotes ? errors.privateNotes : "Private Notes"}
                                    </label>
                                    <div className={`${styles.sectionInnerContent} ${errors.privateNotes ? styles.inputError : ""}`}>
                                        <textarea
                                            id={styles.description}
                                            value={privateNotes}
                                            onChange={(event) => setPrivateNotes(event.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className={styles.contentSection}>
                                    <label>
                                        Extertion Rating
                                    </label>

                                    <div className={styles.extertionSection}>
                                        <div id={styles.extertionSlider}>
                                            <p>How did that activity feel?</p>
                                            <input
                                                type="range"
                                                min={1}
                                                max={10}
                                                value={extertionLevel || 1}
                                                onChange={(event) => setExtertionLevel(event.target.value)}
                                                className={`${styles.slider} ${styles[`sliderStep${extertionLevel}`]}`}
                                            />
                                            <div id={styles.extertionLabels}>
                                                <p>Easy</p>
                                                <p>Moderate</p>
                                                <p>Max Effort</p>
                                            </div>
                                        </div>
                                        <div id={styles.pExtertion}>
                                            {!extertionLevel &&
                                                <>
                                                    <p>What is Perceived Extertion</p>
                                                    <p>Perceived Exertion is how hard your workout felt overall. Add it to your activities to track how your body is responding to your training. Perceived Exertion can also be used in place of heart rate data with subscription features, so you can better understand how your fitness is trending over time.</p>
                                                </>
                                            }
                                            {extertionLevel && extertionLevel < 4 &&
                                                <>
                                                    <p>What's Easy?</p>
                                                    <div className={styles.extertionPoints}>
                                                        <p>Could talk normally.</p>
                                                        <p>Breathing naturally.</p>
                                                        <p>Felt very comfortable.</p>
                                                    </div>
                                                </>
                                            }

                                            {extertionLevel && extertionLevel > 3 && extertionLevel < 7 &&
                                                <>
                                                    <p>What's Moderate?</p>
                                                    <div className={styles.extertionPoints}>
                                                        <p>Could talk in short spurts.</p>
                                                        <p>Breathing more labored.</p>
                                                        <p>Within your comfort zone, but working.</p>
                                                    </div>
                                                </>
                                            }
                                            {extertionLevel && extertionLevel > 6 && extertionLevel < 10 &&
                                                <>
                                                    <p>What's Hard?</p>
                                                    <div className={styles.extertionPoints}>
                                                        <p>Could barely talk.</p>
                                                        <p>Breathing heavily.</p>
                                                        <p>Outside your comfort zone.</p>
                                                    </div>
                                                </>
                                            }
                                            {extertionLevel && extertionLevel == 10 &&
                                                <>
                                                    <p>What's Max Effort?</p>
                                                    <div className={styles.extertionPoints}>
                                                        <p>At your physical limit.</p>
                                                        <p>Gasping for breath.</p>
                                                        <p>Couldn't talk/could barely remember your name.</p>
                                                    </div>
                                                </>
                                            }
                                        </div>
                                        <div id="eSliderColor" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.buttonContainer}>
                            <button type="submit">Create</button>
                            <button onClick={handleCancel}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    );
};

export default CreateActivity;