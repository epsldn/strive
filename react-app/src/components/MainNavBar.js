import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchClubs } from "../store/clubs";

function MainNavBar() {
    const path = useLocation().pathname;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchClubs());
    }, [path]);

    document.body.style = "background: #ffffff";
    return (
        <div style={{ height: "55px", backgroundColor: "slategray", width: "100%" }}>
        </div>
    );
}

export default MainNavBar;