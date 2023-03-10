import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import AuthNavBar from './AuthNavBar';
import imagePicker from "./util";
import styles from "../../stylesheets/Auth.module.css";
import Birthday from './Birthday';
import { Modal } from '../Modals/Modal';

const emailRegex = RegExp(
  /([\w.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/
);

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [backgroundImage] = useState(imagePicker());
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  document.title= "Join | Strive"

  const phase1Check = async (event) => {
    event.preventDefault();
    let errors = {};
    if (!email) errors.email = "Please enter your email.";
    else if (emailRegex.test(email) === false) errors.email = "Please enter a valid email.";
    if (!password) errors.password = "Please enter a password";
    else if (password.length < 8) errors.password = "Password must be at least 8 characters long";
    if (!confirmPassword) errors.confirmPassword = "Please confirm your password";
    else if (confirmPassword !== password) errors.confirmPassword = "Passwords must match!";
    setErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const response = await fetch(`/api/auth/check-email/${email}`);

    if (response.ok) {
      setShowModal(true);
    } else {
      errors = await response.json();
      setErrors(errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(p => p = e.target.value);
  };


  useEffect(() => {
    if (password.length < 8) {

      const confirmPasswordField = document.querySelector("#Auth_confirmPassword__3nVSk");

      confirmPasswordField?.animate(
        [
          { maxHeight: "100px" },
          { maxHeight: "0px" }
        ],
        {
          fill: "forwards",
          easing: "ease-out",
          duration: 75
        }
      );

      setTimeout(() => setShowConfirmPassword(false), 50);

      return;
    }

    setShowConfirmPassword(true);
  }, [password]);

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div>
      <AuthNavBar />
      <div className={styles.mainContent}>
        <img id={styles.backgroundImage} src={backgroundImage} alt="Background athletes" />
        <form className={styles.formContainer}>
          <h2>Join Strive today, it's Free.</h2>
          <div className={styles.formContent}>
            <div style={{ marginBottom: "2rem" }}>
              <input
                className={styles.signupInput}
                type='text'
                name='email'
                placeholder='Email'
                onChange={updateEmail}
                value={email}
              />
              {<label>{errors.email}</label>}
            </div>
            <div style={{ marginBottom: "2rem" }}>
              <input
                className={styles.signupInput}
                type='password'
                name='password'
                placeholder='Password'
                onChange={updatePassword}
                value={password}
              />
              {<label>{errors.password}</label>}
            </div>
            {showConfirmPassword &&
              <div style={{ marginBottom: "2rem" }} id={styles.confirmPassword}>
                <input
                  className={styles.signupInput}
                  type='password'
                  name='confirm-password'
                  placeholder='Confirm Password'
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  value={confirmPassword}
                />
                <label>{errors.confirmPassword}</label>
              </div>
            }
            <button id={styles.submitButton} onClick={phase1Check}>Sign Up</button>
            <p>By signing up for Strive, you <span>don't</span> agree to <span>anything</span>, Strive is <span>not</span> a real company.</p>
            <p>Already a member? <Link to="/login"><span style={{ marginLeft: ".5rem" }} >Log in</span></Link></p>
          </div>
        </form>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Birthday setShowModal={setShowModal} email={email} password={password} />
        </Modal>
      )}
    </div>
  );
};

export default SignUpForm;
