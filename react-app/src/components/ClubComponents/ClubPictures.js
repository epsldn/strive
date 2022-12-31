import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../stylesheets/ClubPictures.module.css";
function CLubPictures(props) {
    const { user, club, setClub } = props;
    const [tempProfile, setTempProfile] = useState("");
    const [tempBanner, setTempBanner] = useState("");
    const [newProfile, setNewProfile] = useState("");
    const [newBanner, setnewBanner] = useState("");

    async function handleSubmitProfile(event) {
        const image = event.target.files[0];
        setTempBanner(image);
        const formData = new FormData();
        formData.append("image", image);

        const res = await fetch('/api/images/user-profile', {
            method: "POST",
            body: formData,
        });

        if (res.ok) {
            console.log("PROFILE");
            const imageUrl = await res.json();
            const newClub = { ...club };
            newClub.clubImage = imageUrl.url;
            setClub(newClub);
        }
        else {
            const errors = await res.json();
            console.log(errors);
        }
    }

    async function handleSubmitBanner(event) {
        const image = event.target.files[0];
        setTempProfile(image);
        const formData = new FormData();
        formData.append("image", image);

        const res = await fetch('/api/images/user-profile', {
            method: "POST",
            body: formData,
        });

        if (res.ok) {
            console.log("BANNER");
            const imageUrl = await res.json();
            const newClub = { ...club };
            newClub.clubBanner = imageUrl.url;
            setClub(newClub);
        }
        else {
            const errors = await res.json();
            console.log(errors);
        }
    }

    return (
        <div className={styles.picturesContainer} style={club?.clubImage ? { marginBottom: "-1rem" } : undefined}>
            <div id={styles.banner}>
                <img src={club?.clubBanner || "https://striveonrender.s3.us-west-2.amazonaws.com/defaultBanner.png"} />
                {club?.id in user?.owned_clubs &&
                    <label id={styles.cameraIcon}>
                        <input
                            style={{ display: "none" }}
                            type="file"
                            accept="image/*"
                            onChange={handleSubmitBanner}
                            multiple={false}
                        />
                        <i className="fa-solid fa-camera-retro" >
                            <i id={styles.cameraPlus} className="fa-solid fa-plus"></i>
                        </i>
                    </label>}
            </div>

            <div id={styles.clubImage}>
                <div style={{ border: "2px solid white", borderRadius: ".4rem" }}>
                    <img style={{ borderRadius: ".4rem", height: "124px", width: "124px" }} src={club?.clubImage || "https://striveonrender.s3.us-west-2.amazonaws.com/clubDefault.png"} />
                    {club?.id in user?.owned_clubs && <label >
                        <input
                            style={{ display: "none" }}
                            type="file"
                            accept="image/*"
                            onChange={handleSubmitProfile}
                        />
                        <div className="fa-stack">
                            <i style={{ color: "white" }} className="fa-solid fa-circle fa-stack-1x" />
                            <i style={{ color: "lightgray" }} className="fa-solid fa-circle-plus fa-stack-2x" />
                        </div>
                    </label>}
                </div>
                {
                    club?.id in user?.owned_clubs && !club?.clubImage ?
                        <>
                            <p>Recommended size</p>
                            <p>248ᕁ248 px</p>
                        </> :
                        <div style={{ margin: " -2rem" }} />
                }
            </div>

        </div >
    );
}

export default CLubPictures;