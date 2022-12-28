import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchClubs } from "../store/clubs";

function MainNavBar() {
    const path = useLocation().pathname;
    const dispatch = useDispatch();
    const [location, setLocation] = useState(null);

    useEffect(() => {
        dispatch(fetchClubs());
        navigator.geolocation.getCurrentPosition((position) => setLocation(position.coords.latitude + "," + position.coords.longitude), () => setLocation(null), { enableHighAccurary: true, timeout: 3000 });
    }, [path, dispatch]);

    document.body.style = "background: #ffffff";
    return (
        <div style={{ height: "55px", backgroundColor: "slategray", width: "100%" }}>
            {console.log(location)}
        </div>
    );
}

export default MainNavBar;