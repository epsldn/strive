import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import AuthNavBar from './AuthNavBar';
import imagePicker from "./util";
import styles from "../../stylesheets/Auth.module.css";

const emailRegex = RegExp(
  /([\w.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/
);

function fieldValidator(email, password, setErrors) {
  const errors = {};
  if (!email && !password) {
    errors.fields = "Both fields are required";
    setErrors(errors);
    return errors;
  }

  if (email.length < 1 || email.length > 255) errors.email = "Plase enter your email";
  else if (!emailRegex.test(email)) errors.email = "Please enter a valid email";
  if (password.length < 1 || password.length > 255) errors.password = "Please enter your password";
  return errors;
}

function errorFieldAnimation() {
  const errorField = document.querySelector(".Auth_errorField__2GHOZ");
  errorField.animate([
    { padding: "16px", color: "white", height: "fit-content" },
    { color: "transparent" },
    { padding: 0, height: 0, color: "transparent" }
  ],
    {
      delay: 1500,
      fill: "forwards",
      easing: "ease-out",
      duration: 300
    }
  );
}

const LoginForm = () => {
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [backgroundImage] = useState(imagePicker());
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const errors = fieldValidator(email, password, setErrors);
    setErrors(errors);
    if (Object.keys(errors).length > 0) return;
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
      setSubmitted(false);
      errorFieldAnimation();
      setTimeout(() => setErrors({}), 1800);
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("demo@aa.io", "password"));
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

  useEffect(() => {
    if (!submitted) return;
    const errors = {};

    if (!email && !password) {
      errors.fields = "Both fields are required";
      setErrors(errors);
      return errors;
    }

    if (email.length < 1 || email.length > 255) errors.email = "Plase enter your email";
    if (password.length < 1 || password.length > 255) errors.password = "Please enter your password";
    setErrors(errors);
    return errors;

  }, [email, password]);

  if (user) {
    return <Redirect to='/' />;
  }


  return (
    <div>
      <AuthNavBar />
      <div className={styles.mainContent}>
        <img id={styles.backgroundImage} src={backgroundImage} alt="Background athletes" />
        <form className={styles.formContainer} onSubmit={onLogin}>
          <h2>Log In</h2>
          {Object.keys(errors).length > 0 &&
            <ul className={styles.errorField}>
              <li>{errors.fields}</li>
              <li>{errors.email}</li>
              <li>{errors.password}</li>
              <li>{errors.serverError}</li>
            </ul>
          }
          <div className={styles.formContent}>
            <div>
              <input
                name='email'
                type='text'
                placeholder='Email'
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div>
              <input
                name='password'
                type='password'
                placeholder='Password'
                value={password}
                onChange={updatePassword}
              />
              <button id={styles.submitButton} type='submit'>Login</button>
              <p>Want try try out a demo? <span onClick={demoLogin} style={{ cursor: "pointer", marginLeft: ".5rem" }}>Log in as Demo User</span> </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
