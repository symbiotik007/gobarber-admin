import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import Bookings from '../pages/Bookings';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/bookings" component={Bookings} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/settings" component={Settings} isPrivate />
    </Switch>
  );
}
