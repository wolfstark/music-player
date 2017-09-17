import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";
import App from "../containers/App"

class RouterMap extends Component {
  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <Switch>
          <Route exact path="/" component={App} />
        </Switch>
      </ConnectedRouter>
    );
  }
}

export default RouterMap;
