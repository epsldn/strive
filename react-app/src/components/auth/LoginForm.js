import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import AuthNavBar from './AuthNavBar';
import imagePicker from "./util";
import styles from "../../stylesheets/Auth.module.css";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [backgroundImage] = useState(imagePicker());
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
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
        <img id={styles.backgroundImage} src={backgroundImage} />
        <form className={styles.formContainer} onSubmit={onLogin}>
          <h2>Log In</h2>
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
              <p>Want try try out a demo? <span style={{ cursor: "pointer", marginLeft: "1rem" }}>Log in as Demo User</span> </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
