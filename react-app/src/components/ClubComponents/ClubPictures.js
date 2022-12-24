import styles from "../../stylesheets/ClubPictures.module.css";

function CLubPictures({ club }) {
    return (
        <div className={styles.picturesContainer}>
            <div id={styles.banner}>
                <img src={club?.clubBanner || "https://striveonrender.s3.us-west-2.amazonaws.com/defaultBanner.png"} />
            </div>
            <div id={styles.clubImage}>
                <div style={{ border: "2px solid white", borderRadius: ".4rem" }}>
                    <img style={{ borderRadius: ".4rem" }} src={club?.clubImage || "https://striveonrender.s3.us-west-2.amazonaws.com/clubDefault.png"} />
                </div>
                <p>Recommended size</p>
                <p>248ᕁ248 px</p>
            </div>
        </div>
    );
}

export default CLubPictures;