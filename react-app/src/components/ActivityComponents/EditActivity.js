import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import MainNavBar from "../MainNavBar";
import styles from "../../stylesheets/EditActivity.module.css";
import slider from "../../stylesheets/CreateActivity.module.css";
import { useEffect, useState } from "react";
import { updateActivity } from "../../store/activities";
function EditActivity() {
    const { activityId } = useParams();
    const activity = useSelector(state => state.activities[activityId]);
    const [isLoaded, setIsloaded] = useState(false);
    const user = useSelector(state => state.session.user);
    const history = useHistory();
    const dispatch = useDispatch();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [extertionLevel, setExtertionLevel] = useState(1);
    const [privateNotes, setPrivateNotes] = useState("");
    const [sport, setSport] = useState("Run");

    function onSubmit(event) {
        event.preventDefault();
        console.log("submitting...");

        const payload = {
            "sport": sport,
            "title": title,
            "description": description,
            "private_notes": privateNotes,
            "extertion": +extertionLevel,
        };

        const data = dispatch(updateActivity(payload, activityId));

        if (data.errors) {
            console.log(data);
        } else {
            history.push("/activities/" + activityId);
        }
    }

    useEffect(() => {
        if (!activity) return;

        setTitle(activity.title);
        setDescription(activity.description);
        setExtertionLevel(activity.extertion);
        setPrivateNotes(activity.private_notes);
        setSport(activity.sport);

    }, [activity]);


    let date;

    if (activity) {
        if (activity.user_id !== user.id) {
            history.push(`/activities/${activityId}`);
            return null;
        }

        date = new Date(activity.date + " " + activity.time);
    }

    if (isLoaded && !activity) {
        return <Redirect to="/" />;
    }

    return (
        <div className={styles.outerContainer}>
            <MainNavBar setIsloaded={setIsloaded} />
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <h1>Edit Activity</h1>
                    <button onClick={onSubmit}>Save</button>
                </div>
            </div>
            <div className={styles.mainContainer}>
                <form id={styles.editActivityForm} onSubmit={onSubmit}>
                    <div className={styles.editActivityFormLeft}>
                        <div className={styles.inputContainer}>
                            <label>
                                Title
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <label>
                                Description
                            </label>
                            <textarea
                                value={description}
                                onChange={event => setDescription(event.target.value)}
                                className={styles.styledTextArea}
                            />
                        </div>
                        <div className={slider.contentSection}>
                            <label
                                id={styles.extertionLabel}
                            >
                                Extertion Rating
                            </label>

                            <div className={slider.extertionSection}>
                                <div id={slider.extertionSlider}>
                                    <p>How did that activity feel?</p>
                                    <input
                                        type="range"
                                        min="1"
                                        max="10"
                                        value={extertionLevel || 1}
                                        onChange={(event) => setExtertionLevel(event.target.value)}
                                        className={`${slider.slider} ${slider[`sliderStep${extertionLevel}`]}`}
                                    />
                                    <div id={slider.extertionLabels}>
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
                                            <div className={slider.extertionPoints}>
                                                <p>Could talk normally.</p>
                                                <p>Breathing naturally.</p>
                                                <p>Felt very comfortable.</p>
                                            </div>
                                        </>
                                    }

                                    {extertionLevel && extertionLevel > 3 && extertionLevel < 7 &&
                                        <>
                                            <p>What's Moderate?</p>
                                            <div className={slider.extertionPoints}>
                                                <p>Could talk in short spurts.</p>
                                                <p>Breathing more labored.</p>
                                                <p>Within your comfort zone, but working.</p>
                                            </div>
                                        </>
                                    }
                                    {extertionLevel && extertionLevel > 6 && extertionLevel < 10 &&
                                        <>
                                            <p>What's Hard?</p>
                                            <div className={slider.extertionPoints}>
                                                <p>Could barely talk.</p>
                                                <p>Breathing heavily.</p>
                                                <p>Outside your comfort zone.</p>
                                            </div>
                                        </>
                                    }
                                    {extertionLevel && extertionLevel == 10 &&
                                        <>
                                            <p>What's Max Effort?</p>
                                            <div className={slider.extertionPoints}>
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
                        <div className={styles.inputContainer}>
                            <label>
                                Private Notes
                            </label>
                            <textarea
                                value={privateNotes}
                                onChange={event => setPrivateNotes(event.target.value)}
                                className={styles.styledTextArea}
                            />
                        </div>
                    </div>
                    <div className={styles.editActivityFormRight}>
                        <div className={styles.inputContainer}>
                            <label>
                                Sport
                            </label>
                            <select
                                value={sport}
                                onChange={event => setSport(event.target.value)}
                            >
                                <option value="Ride">Ride</option>
                                <option value="Swim">Swim</option>
                                <option value="Hike">Hike</option>
                                <option value="Walk">Walk</option>
                                <option value="Alpine Ski">Alpine Ski</option>
                                <option value="Backcountry Ski<">Backcountry Ski</option>
                                <option value="Canoe">Canoe</option>
                                <option value="Crossfit">Crossfit</option>
                                <option value="E-Bike Ride">E-Bike Ride</option>
                                <option value="Elliptical">Elliptical</option>
                                <option value="Golf">Golf</option>
                                <option value="Run">Run</option>
                                <option value="Handcycle">Handcycle</option>
                                <option value="Ice Skate">Ice Skate</option>
                                <option value="Inline Skate">Inline Skate</option>
                                <option value="Kayaking">Kayaking</option>
                                <option value="Kitesurf">Kitesurf</option>
                                <option value="Nordic Ski">Nordic Ski</option>
                                <option value="Rock Climb">Rock Climb</option>
                                <option value="Roller Ski">Roller Ski</option>
                                <option value="Rowing">Rowing</option>
                                <option value="Sail">Sail</option>
                                <option value="Skateboard">Skateboard</option>
                                <option value="Snowboard">Snowboard</option>
                                <option value="Snowshoe">Snowshoe</option>
                                <option value="Football (Soccer)">Football (Soccer)</option>
                                <option value="Stair-Stepper<">Stair-Stepper</option>
                                <option value="Stand Up Paddling<">Stand Up Paddling</option>
                                <option value="Surfing">Surfing</option>
                                <option value="Velomobile">Velomobile</option>
                                <option value="Virtual Ride">Virtual Ride</option>
                                <option value="Virtual Run">Virtual Run</option>
                                <option value="Weight Training">Weight Training</option>
                                <option value="Wheelchair">Wheelchair</option>
                                <option value="Windsurf">Windsurf</option>
                                <option value="Workout">Workout</option>
                                <option value="Yoga">Yoga</option>
                            </select>
                        </div>
                    </div>
                </form>
                <div id={styles.activityInfo}>
                    <div className={styles.activityInfoContent}>
                        <p className={styles.activityInfoContentLeft}>Date</p>
                        <p className={styles.activityInfoContentRight}>{date?.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })}</p>
                    </div>
                    <div className={styles.activityInfoContent}>
                        <p className={styles.activityInfoContentLeft}>Time</p>
                        <p className={styles.activityInfoContentRight}>{activity?.hours}h {activity?.minutes}m</p>
                    </div>
                    <div className={styles.activityInfoContent}>
                        <p className={styles.activityInfoContentLeft}>Elevation Gain</p>
                        <p className={styles.activityInfoContentRight}>{activity?.elevation} ft</p>
                    </div>
                    {Boolean(activity?.distance) && <div className={styles.activityInfoContent}>
                        <p className={styles.activityInfoContentLeft}>Distance</p>
                        <p className={styles.activityInfoContentRight}>{activity.distance} mi</p>
                    </div>}
                </div>
            </div>
        </div >
    );
}

export default EditActivity;