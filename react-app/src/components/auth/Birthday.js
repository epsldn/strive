import { useEffect, useRef, useState } from "react";
import styles from "../../stylesheets/Birthday.module.css";
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const monthsWith31Days = new Set(["January", "March", "May", "July", "August", "October", "December"]);
const monthsWith30Days = new Set(["April", "June", "September", "November"]);

const daysCreator = (month) => {
    const days = [];
    if (monthsWith31Days.has(month)) {
        for (let index = 1; index < 32; index++) {
            days.push(index);
        }
        return days;
    }

    if (monthsWith30Days.has(month)) {
        for (let index = 1; index < 31; index++) {
            days.push(index);
        }
        return days;
    }

    if (month.toLowerCase() === "february") {
        for (let index = 1; index < 29; index++) {
            days.push(index);
        }
        return days;
    }

    return ["No results."];
};

function monthFinder(letters) {
    if (!letters) return MONTHS;
    letters = letters.slice(0, 1).toUpperCase() + letters.slice(1).toLowerCase();
    const months = [];
    for (const month of MONTHS) {
        if (month.startsWith(letters)) months.push(month);
    }

    if (months.length > 0) {
        return months;
    }

    return ["No results."];
}

// function dayFidner(date) {
//     const months = [];
//     for (const month of MONTHS) {
//         if (month.startsWith(letters)) months.push(month);
//     }

//     if (months.length > 0) {
//         return months;
//     }

//     return ["No results."];
// }

function Birthday(props) {
    const [month, setMonth] = useState("");
    const [months, setMonths] = useState([]);
    const [showMonths, setShowMonths] = useState(false);
    const [day, setDay] = useState("");
    const [days, setDays] = useState([]);
    const [showDays, setShowDays] = useState(false);
    const [year, setYear] = useState("");
    const [years, setYears] = useState([]);
    const [showYear, setShowYear] = useState(false);
    const [monthPlaceholder, setMonthPlaceholder] = useState("");
    const [dayPlaceholder, setDayPlaceholder] = useState("");
    const [yearPlaceholder, setYearPlaceholder] = useState("");
    const { setShowModal } = props;
    const container1 = useRef(null);
    const container2 = useRef(null);
    const container3 = useRef(null);
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);

    useEffect(() => {
        const formattedMonth = month.slice(0, 1).toUpperCase() + month.slice(1).toLowerCase();
        setMonths(monthFinder(month));
        if (MONTHS.includes(formattedMonth)) setMonthPlaceholder(formattedMonth);
    }, [month]);

    useEffect(() => {
        if (!showMonths) return;
        function onClick(e) {
            if (container1.current && container1.current.contains(e.target) === false) {
                setShowMonths(false);
                setMonth(month || monthPlaceholder);
            }
        }
        document.addEventListener("click", onClick);
        return () => document.removeEventListener("click", onClick);
    }, [showMonths]);

    useEffect(() => {
        setDay("");
        setDayPlaceholder("");
    }, [monthPlaceholder]);

    useEffect(() => {
        let days = daysCreator(monthPlaceholder);
        if (days.length > 0) {
            days = days.map(v => v.toString()).filter(v => {
                return v.startsWith(day);
            });
            if (days.length === 0) days = ["No results."];
        }
        setDays(days);
        if (days.includes(day)) setDayPlaceholder(day);
    }, [day, monthPlaceholder]);

    useEffect(() => {
        if (!showDays) return;
        function onClick(e) {
            if (container2.current && container2.current.contains(e.target) === false) {
                setShowDays(false);
                setDay(day || dayPlaceholder);
            }
        }
        document.addEventListener("click", onClick);
        return () => document.removeEventListener("click", onClick);
    }, [showDays]);

    return (
        <div className={styles.container}>
            <i id={styles.x} className="fa-solid fa-x" onClick={() => setShowModal(false)} />
            <h2>Before you sign up</h2>
            <div className={styles.formContainer}>
                <form>
                    <h3>Birthday</h3>
                    <div className={styles.formContent}>
                        <div className={styles.inputContainer}
                            onClick={() => {
                                setShowMonths(true);
                                ref1.current.focus();
                            }}
                            ref={container1}
                        >
                            <input
                                type="text"
                                ref={ref1}
                                placeholder={monthPlaceholder || "MONTH"}
                                value={month}
                                onChange={(event) => setMonth(event.target.value)}
                                onFocus={() => setMonth("")}
                            />
                            <i className="fa-solid fa-caret-down" />
                            {showMonths &&
                                <ul className={styles.dropdown}>
                                    {
                                        months.map(month => {
                                            if (month === "No results.") {
                                                return <li className={styles.dropdownItem} style={{ backgroundColor: "white" }} key={month}>{month}</li>;
                                            }
                                            return (
                                                <li className={styles.dropdownItem} key={month} style={{ cursor: "pointer" }} onClick={(event) => {
                                                    event.preventDefault();
                                                    event.stopPropagation();
                                                    setMonth(month);
                                                    setShowMonths(false);
                                                }}>{month}</li>
                                            );
                                        })
                                    }
                                </ul>
                            }
                        </div>
                        <div
                            className={styles.inputContainer}
                            onClick={() => {
                                setShowDays(true);
                                ref2.current.focus();
                            }}
                            ref={container2}>
                            <input
                                type="text"
                                ref={ref2}
                                placeholder={dayPlaceholder || "DD"}
                                value={day}
                                onChange={(event) => setDay(event.target.value)}
                                onFocus={() => setDay("")}
                            />
                            <i className="fa-solid fa-caret-down" />
                            {showDays &&
                                <ul className={styles.dropdown}>
                                    {days.map(day => {
                                        if (day === "No results.") {
                                            return <li className={styles.dropdownItem} style={{ backgroundColor: "white" }} key={day}>{day}</li>;
                                        }
                                        return (
                                            <li className={styles.dropdownItem} key={day} style={{ cursor: "pointer" }} onClick={(event) => {
                                                event.preventDefault();
                                                event.stopPropagation();
                                                setDay(day);
                                                setShowDays(false);
                                            }}>{day}</li>
                                        );
                                    })}
                                </ul>}
                        </div>
                        <div
                            className={styles.inputContainer}
                            onClick={() => {
                                setShowYear(true);
                                ref3.current.focus();
                            }
                            }
                            ref={container3}
                        >

                            <input
                                type="text"
                                ref={ref3}
                                placeholder="YYYY"
                                value={year}
                                onChange={(event) => setYear(event.target.value)}
                                onFocus={() => setYear("")}
                            />
                            <i className="fa-solid fa-caret-down" />
                            {showYear &&
                                <ul className={styles.dropdown}>

                                </ul>}
                        </div>
                    </div>
                </form>
                <p>By signing up for Strive, you don't have to agree to anything. Strive is not a real company</p>
            </div >
            <div className={styles.agreeButtonContainer}>
                <button>Agree and Sign Up</button>
            </div>
        </div >
    );
}

export default Birthday;