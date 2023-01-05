import { useRef, useState } from "react";

function ClubImages({ club, styles }) {
    const [showTitle, setShowTitle] = useState(false);
    const titleRef = useRef(null);

    function titleLeave() {
        if (titleRef && titleRef.current) {
            titleRef.current.animate(
                [{ opacity: .8 }, { opacity: 0 }],
                { duration: 300 }
            );

            setTimeout(() => setShowTitle(false), 300);
        }
    }
    return (
        <>
            <li key={club.id} className={styles.clubWrapper} onMouseOver={() => setShowTitle(true)} onMouseLeave={titleLeave}>
                {
                    showTitle &&
                    <div className={styles.clubTitle} ref={titleRef}>
                        {club.clubName}
                        <div id={styles.titleTriangle} />
                    </div>
                }
                <div className={styles.clubImage}>
                    <img src={club.clubImage} alt="Club Avatar" />
                </div>
            </li>
        </>
    );
}

export default ClubImages;