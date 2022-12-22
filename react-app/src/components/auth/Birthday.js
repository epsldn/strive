import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/session";
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

function yearsCreator() {
    let year = new Date().getFullYear();
    const years = [];
    for (let index = 0; index <= 150; index++) {
        years.push(year);
        year -= 1;
    }
    return years;
}

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

    const [errors, setErrors] = useState({});
    const { email, password, setShowModal } = props;
    const dispatch = useDispatch();

    const container1 = useRef(null);
    const container2 = useRef(null);
    const container3 = useRef(null);

    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);

    const onSignUp = async (e) => {
        e.preventDefault();
        const errors = {};
        if (!month || !day || !year) errors.birthdate = "Please enter your full birthdate.";
        setErrors(errors);
        if (Object.keys(errors).length > 0) return;

        const monthNumber = {
            "January": 1,
            "February": 2,
            "March": 3,
            "April": 4,
            "May": 5,
            "June": 6,
            "July": 7,
            "August": 8,
            "September": 9,
            "October": 10,
            "November": 11,
            "December": 12
        };

        const birthdate = `${year}-${monthNumber[month]}-${day}`;

        const data = await dispatch(signUp(email, password, birthdate));
        if (data) {
            setErrors(data);
        }
    };

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
            days = days.map(number => number.toString()).filter(number => {
                return number.startsWith(day);
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

    useEffect(() => {
        let years = yearsCreator();
        if (years.length > 0) {
            years = years.map(v => v.toString()).filter(v => {
                return v.startsWith(year);
            });
            if (years.length === 0) years = ["No results."];
        }
        setYears(years);

        if (years.includes(year)) setYearPlaceholder(year);
    }, [year]);

    useEffect(() => {
        if (!showYear) return;
        function onClick(e) {
            if (container3.current && container3.current.contains(e.target) === false) {
                setShowYear(false);
                setYear(year || yearPlaceholder);
            }
        }
        document.addEventListener("click", onClick);
        return () => document.removeEventListener("click", onClick);
    }, [showYear]);

    return (
        <div className={styles.container}>
            <i id={styles.x} className="fa-solid fa-x" onClick={() => setShowModal(false)} />
            <h2>Before you sign up</h2>
            <div className={styles.formContainer}>
                <form>
                    <h3>Birthday</h3>
                    <h3 id={styles.birthdayErrors}>{errors.birthdate}</h3>
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
                                        if (!month) {
                                            return <li className={styles.dropdownItem} style={{ backgroundColor: "white" }} key={"Choose a month"}>Choose a Month</li>;;
                                        }
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
                                placeholder={yearPlaceholder || "YYYY"}
                                value={year}
                                onChange={(event) => setYear(event.target.value)}
                                onFocus={() => setYear("")}
                            />
                            <i className="fa-solid fa-caret-down" />
                            {showYear &&
                                <ul className={styles.dropdown}>
                                    {years.map(year => {
                                        if (year === "No results.") {
                                            return <li className={styles.dropdownItem} style={{ backgroundColor: "white" }} key={year}>{year}</li>;
                                        }
                                        return (
                                            <li className={styles.dropdownItem} key={year} style={{ cursor: "pointer" }} onClick={(event) => {
                                                event.preventDefault();
                                                event.stopPropagation();
                                                setYear(year);
                                                setShowYear(false);
                                            }}>{year}</li>
                                        );
                                    })}
                                </ul>}
                        </div>
                    </div>
                </form>
                <p>By signing up for Strive, you don't have to agree to anything. Strive is not a real company</p>
            </div >
            <div className={styles.agreeButtonContainer}>
                <button onClick={onSignUp}>Agree and Sign Up</button>
            </div>
        </div >
    );
}

export default Birthday;