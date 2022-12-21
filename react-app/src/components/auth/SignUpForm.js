import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import AuthNavBar from './AuthNavBar';
import imagePicker from "./util";
import styles from "../../stylesheets/Auth.module.css";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [backgroundImage] = useState(imagePicker());
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div>
      <AuthNavBar />
      <div className={styles.mainContent}>
        <img id={styles.backgroundImage} src={backgroundImage} />
        <form className={styles.formContainer} onSubmit={onSignUp}>
          <h2>Join Strive today, it's Free.</h2>
          <div className={styles.formContent}>
            <div>
              <input
                type='text'
                name='email'
                placeholder='Email'
                onChange={updateEmail}
                value={email}
              ></input>
            </div>
            <div>
              <input
                type='password'
                name='password'
                placeholder='Password'
                onChange={updatePassword}
                value={password}
              ></input>
            </div>
            <button id={styles.submitButton} type='submit'>Sign Up</button>
            <p>By signing up for Strive, you <span>don't</span> agree to <span>anything</span>, Strive is <span>not</span> a real company.</p>
            <p>Already a member? <Link to="/login"><span>Log in</span></Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
