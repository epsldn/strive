import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import "./stylesheets/reset.css";
import LandingPage from './components/LandingPage/LandingPage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/welcome' exact >
          <LandingPage />
        </Route>
        <Route path='/login' exact>
          <LoginForm />
        </Route>
        <Route path='/join' exact>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/" exact>
          "HELLO"
        </ProtectedRoute>
        <ProtectedRoute path='/users' exact >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact >
          <User />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
