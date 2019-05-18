import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import PrivateRoute from './private_router';

import MainPageContainer from '../../Containers/MainPageContainer';
import ErrorPage from '../../Containers/ErrorPage';
import LoginForm from '../../Containers/LoginForm';
import RegistrationForm from '../../Containers/RegistrationForm';
import Geolocation from '../Geolocation';

export default function Routers() {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={LoginForm}/>
                <Route path="/registration" component={RegistrationForm}/>
                <Route path="/test_geo" component={Geolocation}/>
                <PrivateRoute exact path="/" component={MainPageContainer}/>
                <Route component={ErrorPage} />
            </Switch>
        </Router>
    )
}
