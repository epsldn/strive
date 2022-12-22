import { useRef, useState } from "react";
import styles from "../../stylesheets/Birthday.module.css";
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
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
    const months = [];
    for (const month in months) {
        if (month.startsWith(letters)) month.push(month);
    }

    return months;
}

function updateMonth(e, setMonth) {

}

function Birthday(props) {
    const [month, setMonth] = useState("");
    const [showMonths, setShowMonths] = useState(false);
    const [day, setDay] = useState("");
    const [showDays, setShowDays] = useState(false);
    const [year, setYear] = useState("");
    const [showYear, setShowYear] = useState(false);
    const { setShowModal } = props;
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    return (
        <div className={styles.container}>
            <i id={styles.x} className="fa-solid fa-x" onClick={() => setShowModal(false)} />
            <h2>Before you sign up</h2>
            <div className={styles.formContainer}>
                <form>
                    <h3>Birthday</h3>
                    <div className={styles.formContent}>
                        <div className={styles.inputContainer} onClick={() => {
                            setShowMonths(true);
                            ref1.current.focus();
                        }
                        }>
                            <input
                                type="text"
                                ref={ref1}
                                placeholder={"MONTH"}
                                value={month}
                                onChange={(event) => setMonth(event.target.value)}
                                onBlur={() => setShowMonths(false)}
                            />
                            <i className="fa-solid fa-caret-down" />
                            {showMonths &&
                                <div className={styles.dropdown}>
                                    "HELLO"<br />
                                    "HELLO"<br />
                                    "HELLO" "HELLO"<br />
                                    "HELLO" "HELLO"<br />
                                    "HELLO" "HELLO"<br />
                                    "HELLO" "HELLO"<br />
                                    "HELLO"
                                </div>
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
                                <div className={styles.dropdown}>
                                    "HELLO"<br />
                                    "HELLO"<br />
                                    "HELLO" "HELLO"<br />
                                    "HELLO" "HELLO"<br />
                                    "HELLO" "HELLO"<br />
                                    "HELLO" "HELLO"<br />
                                    "HELLO"
                                </div>}
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
                                <div className={styles.dropdown}>
                                    "HELLO"<br />
                                    "HELLO"<br />
                                    "HELLO" "HELLO"<br />
                                    "HELLO" "HELLO"<br />
                                    "HELLO" "HELLO"<br />
                                    "HELLO" "HELLO"<br />
                                    "HELLO"
                                </div>}
                        </div>
                    </div>
                </form>
                <p>By signing up for Strive, you don't have to agree to anything. Strive is not a real company</p>
            </div>
            <div className={styles.agreeButtonContainer}>
                <button>Agree and Sign Up</button>
            </div>
        </div>
    );
}

export default Birthday;