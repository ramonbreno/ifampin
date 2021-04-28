import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from '../Dashboard';
import Login from '../modules/login/Index';

const Routers = () => {
    return (
        <Router>
            <Switch>
                <Route exact path={'/'} component={Login} />
                <Route exact path={'/login'} component={Login} />
                <Route exact path={'/dashboard'} component={Dashboard} />
            </Switch>
        </Router>
    )
}

export default Routers;