import React, { Component } from "react";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";
import App from "../containers/App";
// import Recommend from "../containers/Recommend";
// import Singer from "../containers/Singer";

class RouterMap extends Component {
  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <Route path="/" component={App} />
      </ConnectedRouter>
    );
  }
}

export default RouterMap;
