import React from 'react';
import { BrowserRouter,Switch,Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import CreateImmobile from './pages/CreateImmobiles'
import Historic from './pages/Historic'
export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/createAccount" component={Register}/>
                <Route path="/dashboard"  component={Dashboard}/>
                <Route path="/createImmobiles"  component={CreateImmobile}/>
                <Route path="/Historic"  component={Historic}/>
            </Switch>
        </BrowserRouter>
    );
}