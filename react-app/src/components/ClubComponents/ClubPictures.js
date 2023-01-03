import { useDispatch } from "react-redux";
import { updateClub } from "../../store/clubs";
import styles from "../../stylesheets/ClubPictures.module.css";
function CLubPictures(props) {
    const { user, club, setClub } = props;
    const dispatch = useDispatch();

    async function handleImageChange(event) {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append("image", image);

        const res = await fetch('/api/images/club-images/', {
            method: "POST",
            body: formData,
        });

        if (res.ok) {
            const imageUrl = await res.json();
            let club_banner;
            let club_image;
            if (event.target.id === "club-banner-upload") club_banner = imageUrl.url;
            else if (event.target.id === "club-image-upload") club_image = imageUrl.url;
            const payload = {
                club_banner,
                club_image
            };

            const data = await dispatch(updateClub(payload, club.id));

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
                {club?.owner_id === user?.id &&
                    <div id={club?.clubBanner ? styles.cameraBackground : ""}>
                        <label id={!club?.clubBanner ? styles.cameraIcon : styles.cameraIconCorner}>
                            <input
                                style={{ display: "none" }}
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                multiple={false}
                                id="club-banner-upload"
                            />
                            <i className="fa-solid fa-camera-retro" >
                                <i id={styles.cameraPlus} className="fa-solid fa-plus"></i>
                            </i>
                        </label>
                    </div>
                }
            </div>

            <div id={styles.clubImage}>
                <div style={{ border: "2px solid white", borderRadius: ".4rem" }}>
                    <img style={{ borderRadius: ".4rem", height: "124px", width: "124px" }} src={club?.clubImage || "https://striveonrender.s3.us-west-2.amazonaws.com/clubDefault.png"} />
                    {club?.owner_id === user?.id && <label >
                        <input
                            style={{ display: "none" }}
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            id="club-image-upload"
                        />
                        <div className="fa-stack">
                            <i style={{ color: "white" }} className="fa-solid fa-circle fa-stack-1x" />
                            <i style={{ color: "lightgray" }} className="fa-solid fa-circle-plus fa-stack-2x" />
                        </div>
                    </label>}
                </div>
                {
                    club?.owner_id === user?.id && !club?.clubImage ?
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