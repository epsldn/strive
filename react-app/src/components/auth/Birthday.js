import { useEffect, useRef, useState } from "react";
import styles from "../../stylesheets/Birthday.module.css";
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const monthsWith31Days = new Set([1, 3, 5, 7, 8, 10, 12]);
const monthsWith30Days = new Set([4, 6, 9, 11]);

const daysLengthCalculator = (month) => {
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

    for (let index = 1; index < 29; index++) {
        days.push(index);
    }
    return days;
};

function monthFinder(letters) {
    if (!letters) return MONTHS;
    letters = letters.slice(0, 1).toUpperCase() + letters.slice(1).toLowerCase();
    const months = [];
    for (const month of MONTHS) {
        console.log(month, letters);
        if (month.startsWith(letters)) months.push(month);
    }

    if (months.length > 0) {
        return months;
    }

    return ["No results."];
}

function Birthday(props) {
    const [month, setMonth] = useState("");
    const [months, setMonths] = useState([]);
    const [showMonths, setShowMonths] = useState(false);
    const [day, setDay] = useState("");
    const [showDays, setShowDays] = useState(false);
    const [year, setYear] = useState("");
    const [showYear, setShowYear] = useState(false);
    const { setShowModal } = props;
    const container1 = useRef(null);
    const container2 = useRef(null);
    const container3 = useRef(null);
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);

    useEffect(() => {
        const months = monthFinder(month);
        setMonths(monthFinder(month));
    }, [month]);

    useEffect(() => {
        if (!showMonths) return;
        console.log("HELLO");
        function onClick(e) {
            if (container1.current && container1.current.contains(e.target) === false) {
                setShowMonths(false);
            }
        }
        document.addEventListener("click", onClick);
        return () => document.removeEventListener("click", onClick);
    }, [showMonths]);

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
                            }} ref={container1}>
                            <input
                                type="text"
                                ref={ref1}
                                placeholder={"MONTH"}
                                value={month}
                                onChange={(event) => setMonth(event.target.value)}
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
                        <div className={styles.inputContainer} onClick={() => {
                            setShowDays(true);
                            ref2.current.focus();
                        }
                        }>
                            <input
                                type="text"
                                ref={ref2}
                                placeholder="DD"
                                value={day}
                                onChange={(event) => setDay(event.target.value)}
                                onBlur={() => setShowDays(false)}
                            />
                            <i className="fa-solid fa-caret-down" />
                            {showDays &&
                                <ul className={styles.dropdown}>

                                </ul>}
                        </div>
                        <div className={styles.inputContainer} onClick={() => {
                            setShowYear(true);
                            ref3.current.focus();
                        }
                        }>

                            <input
                                type="text"
                                ref={ref3}
                                placeholder="YYYY"
                                value={year}
                                onChange={(event) => setYear(event.target.value)}
                                onBlur={() => setShowYear(false)}
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