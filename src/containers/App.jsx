import { connect } from "react-redux";
import Header from "../components/Header";
import { login } from "../actions/player.js";
import PureRenderMixin from "react-addons-pure-render-mixin";
import React, { Component } from "react";
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
