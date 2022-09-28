import React from 'react';
import {BrowserRouter,Route,Switch,Redirect}from "react-router-dom";
import Login from './pages/login'
import Form from './pages/guestsForm'
import Approve from './pages/approveGuests';
import Workers from './pages/workers';
import AllGuests from './pages/admin';
import AllWorkers from './pages/allWorkers';
import WorkersForm from './pages/workersForm';
import Edit from './pages/editWorkers';
import Config from './pages/emailConfig';
import Reset from './pages/resetPassword';
import NotFound from './pages/404';

 
function App() {
  return (
<BrowserRouter>
    <Switch>
    <Route exact path='/' component={Login}/>
    <Route exact path='/guestsForm'  component={Form}/>
    <Route exact path='/approveGuests' component={Approve}/>
    <Route exact path='/admin' component={AllGuests}/>
    <Route exact path='/workers' component={Workers}/>
    <Route exact path='/allWorkers' component={AllWorkers}/>
    <Route exact path='/WorkersForm' component={WorkersForm}/>
    <Route exact path='/editWorkers/:id' component={Edit}/>
    <Route exact path='/emailConfig' component={Config}/>
    <Route exact path='/resetPassword' component={Reset}/>
    <Route exact path='/404' component={NotFound}></Route>
    <Redirect from='*' to='/404' />
    </Switch>
</BrowserRouter>
  );
}

export default App;
