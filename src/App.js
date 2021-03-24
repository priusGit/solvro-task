import React, { Component } from 'react';
import { Switch, withRouter, Route } from 'react-router-dom';
import './App.css';
import MainPage from './components/MainPage/MainPage';
import ReservationsPage from './components/ResevationsPage/ReservationsPage';
import Auxi from './hoc/Auxi';
import Layout from './components/Layout/Layout'
class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/reservations" exact component={ReservationsPage} />
      </Switch>
    );
    return (
      <Auxi>
        <Layout>
          {routes}
        </Layout>
      </Auxi>
    )
  }
}
export default withRouter(App);
