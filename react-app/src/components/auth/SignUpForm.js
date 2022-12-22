import React, { useState } from 'react';
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
  const [showModal, setShowModal] = useState(false);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const phase1Check = async (event) => {
    event.preventDefault();
    let errors = {};
    if (!email) errors.email = "Please enter your email.";
    else if (emailRegex.test(email) === false) errors.email = "Please enter a valid email.";
    if (!password) errors.password = "Please enter a password";
    else if (password.length < 8) errors.password = "Password must be at least 8 characters long";
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
  const onSignUp = async (e) => {
    e.preventDefault();
    const data = await dispatch(signUp(email, password));
    if (data) {
      setErrors(data);
    }
  };
  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div>
      <AuthNavBar />
      <div className={styles.mainContent}>
        <img id={styles.backgroundImage} src={backgroundImage} alt="Background athletes" />
        <form className={styles.formContainer}>
          {<div>
          </div>}
          <h2>Join Strive today, it's Free.</h2>
          <div className={styles.formContent}>
            <div style={{ marginBottom: "2rem" }}>
              <input
                class={styles.signupInput}
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
                class={styles.signupInput}
                type='password'
                name='password'
                placeholder='Password'
                onChange={updatePassword}
                value={password}
              />
              {<label>{errors.password}</label>}
            </div>
            <button id={styles.submitButton} onClick={phase1Check}>Sign Up</button>
            <p>By signing up for Strive, you <span>don't</span> agree to <span>anything</span>, Strive is <span>not</span> a real company.</p>
            <p>Already a member? <Link to="/login"><span style={{ marginLeft: ".5rem" }} >Log in</span></Link></p>
          </div>
        </form>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Birthday setShowModal={setShowModal} />
        </Modal>
      )}
    </div>
  );
};

export default SignUpForm;
