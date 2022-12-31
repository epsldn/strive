import { useSelector } from "react-redux";
import styles from "../../stylesheets/ClubPictures.module.css";
function CLubPictures({ club, user }) {
    return (
        <div className={styles.picturesContainer}>

            <div id={styles.banner}>
                <img src={club?.clubBanner || "https://striveonrender.s3.us-west-2.amazonaws.com/defaultBanner.png"} />
                {club?.id in user?.owned_clubs &&
                    <label id={styles.cameraIcon}>
                        <input
                            style={{ display: "none" }}
                            type="file"
                            accept="image/*"
                        />
                        <i className="fa-solid fa-camera-retro" >
                            <i id={styles.cameraPlus} className="fa-solid fa-plus"></i>
                        </i>
                    </label>}
            </div>

            <div id={styles.clubImage}>
                <div style={{ border: "2px solid white", borderRadius: ".4rem" }}>
                    <img style={{ borderRadius: ".4rem" }} src={club?.clubImage || "https://striveonrender.s3.us-west-2.amazonaws.com/clubDefault.png"} />
                    {club?.id in user?.owned_clubs && <label >
                        <input
                            style={{ display: "none" }}
                            type="file"
                            accept="image/*"
                        />
                        <div className="fa-stack">
                            <i style={{ color: "white" }} className="fa-solid fa-circle fa-stack-1x" />
                            <i style={{ color: "lightgray" }} className="fa-solid fa-circle-plus fa-stack-2x" />
                        </div>
                    </label>}
                </div>
                <p>Recommended size</p>
                <p>248ᕁ248 px</p>
            </div>

        </div>
    );
}

export default CLubPictures;