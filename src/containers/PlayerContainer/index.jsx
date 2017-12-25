import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { playerHOC } from "../../common/js/HOCs";

class PlayerContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div />;
  }
}

PlayerContainer.propTypes = {};

export default connect()(playerHOC(PlayerContainer));
