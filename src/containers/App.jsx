import { connect } from "react-redux";
import Header from "../components/Header";
import Tab from "../components/Tab";
import Recommend from "../containers/Recommend";
import SingerList from "../containers/SingerList";
import PlayerContainer from "../containers/PlayerContainer";
// import { login } from '../actions/player.js';
import React, { Component, Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// import PropTypes from "prop-types";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Tab />
        <Switch>
          <Redirect exact from="/" to="/recommend" />
          <Route path="/recommend" component={Recommend} />
          <Route path="/singer" component={SingerList} />
        </Switch>
        <PlayerContainer />
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    // router: state.router,
    player: state.player
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // dispatch1: () => {
    //   dispatch(login);
    // },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
