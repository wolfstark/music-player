import { connect } from "react-redux";
import Header from "../components/Header";
import Tab from "../components/Tab";
import Recommend from "../containers/Recommend";
import Singer from "../containers/Singer";
import { login } from "../actions/player.js";
import PureRenderMixin from "react-addons-pure-render-mixin";
import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// import PropTypes from "prop-types";

class App extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    );
  }

  render() {
    return (
      <div>
        <Header />
        <Tab />
        <Switch>
          <Redirect exact from="/" to="/recommend" />
          <Route path="/recommend" component={Recommend} />
          <Route path="/singer" component={Singer} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {};

const mapStateToProps = (state, ownProps) => {
  return {
    prop: state
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch1: () => {
      dispatch(login);
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
